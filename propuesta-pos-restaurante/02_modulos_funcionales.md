# 02 — Módulos funcionales y reglas de negocio

Mapa de módulos (bounded contexts) del monolito modular. Cada módulo publica eventos y expone una API interna; ningún módulo lee tablas de otro.

| # | Módulo | Alcance (resumen) | Eventos principales que publica |
|---|---|---|---|
| M1 | Configuración organizacional | Grupo, marcas, formatos, sucursales, terminales, almacenes, horarios | `BranchConfigured`, `ConfigVersionPublished` |
| M2 | Catálogo, recetas e inventario | Productos, variantes, modificadores, combos, recetas, insumos, stock, mermas, producción, transferencias, costeo | `StockMoved`, `StockBelowMinimum`, `RecipeCostChanged` |
| M3 | Precios, impuestos y motor de reglas | Listas de precio, franjas horarias, impuestos, promociones, recargos, comisiones | `PriceListPublished`, `PromotionActivated` |
| M4 | Pedidos omnicanal | POS, mesas, cuentas, pedidos externos, programados, estados | `OrderCreated`, `OrderItemAdded`, `OrderSentToKitchen`, `OrderClosed`, `OrderCancelled` |
| M5 | Cocina, barra y producción (KDS) | Ruteo por estación, priorización, tiempos, alertas, cocina central | `TicketStarted`, `TicketReady`, `TicketDelayed` |
| M6 | Delivery y agregadores | Zonas, tarifas, repartidores, tracking, conciliación | `DeliveryAssigned`, `DeliveryCompleted`, `SettlementImported` |
| M7 | Caja y pagos | Sesiones de caja, pagos, propinas, arqueo, retiros | `CashSessionOpened`, `PaymentCaptured`, `CashSessionClosed` |
| M8 | Facturación electrónica (núcleo fiscal) | Comprobantes, series, notas, contingencia, envío | `FiscalDocumentIssued`, `FiscalDocumentAccepted`, `FiscalDocumentRejected` |
| M9 | Clientes, fidelización y CRM | Perfil, direcciones, historial, puntos, cupones, segmentos | `CustomerRegistered`, `PointsEarned`, `CouponRedeemed` |
| M10 | Reportes y analítica | Reportes operativos, fiscales, de delivery y márgenes | — (consume) |
| M11 | Administración y seguridad | Usuarios, roles, permisos, auditoría, respaldos | `PermissionChanged`, `SensitiveActionPerformed` |

---

## M1. Configuración multi-formato, multi-marca y multi-sucursal

**Jerarquía:** `Grupo (tenant) → Marca → Formato (casual, cafetería, bar, fast food, dark kitchen, food court) → Sucursal → Área (salón, barra, terraza, mostrador) → Terminal`. Una sucursal puede alojar varias marcas/formatos (caso dark kitchen o food court).

**Reglas clave**
- Toda configuración hereda de arriba hacia abajo y puede sobrescribirse en un nivel inferior (p. ej. precio de marca → excepción por sucursal → excepción por canal).
- Cada sucursal tiene uno o varios almacenes (principal, barra, cocina, cámara) y una zona horaria.
- El *Formato* define comportamientos por defecto: servicio en mesa vs. mostrador, pago antes/después, propina sugerida, flujo KDS.

## M2. Productos, recetas e inventario

| Capacidad | Detalle funcional |
|---|---|
| Catálogo central | Producto maestro (SKU) con **variantes** por marca/formato/sucursal/canal: nombre comercial, foto, descripción, disponibilidad, estación de preparación. |
| Modificadores | Grupos con mín./máx. de selección (p. ej. "Término de cocción: 1 obligatorio", "Extras: 0–3"), con precio y receta propios. |
| Combos | Combos fijos y "arma tu combo" con slots; precio de combo y prorrateo para reportes y para la base imponible por línea. |
| Recetas | Receta por producto/variante/modificador con insumos, cantidad, unidad, % de merma estándar; sub-recetas (preparaciones intermedias como salsas o masas). |
| Descuento automático | Al **enviar a cocina** (configurable: al enviar o al cobrar) se generan movimientos de consumo teórico; la anulación posterior genera reverso o merma según el estado de preparación. |
| Stock | Por almacén; unidades de compra/almacenaje/consumo con factores de conversión. |
| Movimientos | Ingreso por compra, consumo por venta, producción, transferencia (envío/recepción en 2 pasos), merma (con motivo), ajuste por inventario físico. |
| Alertas | Stock mínimo/punto de reorden, merma anómala (> umbral), transferencias pendientes de recepción > X h. |
| Costeo | Costo promedio ponderado por almacén [Recomendación para MVP]; costo teórico de receta; margen bruto por producto y por canal (descontando comisión del agregador). |
| Consumo teórico vs. real | Comparativo por periodo con inventario físico; variación por insumo. |

## M3. Precios, impuestos y motor de reglas

**Resolución de precio** (prioridad de mayor a menor especificidad, con vigencia):

```
precio(producto, contexto) =
  primera coincidencia en listas ordenadas por especificidad:
  [sucursal+canal+franja] > [sucursal+canal] > [formato+canal+franja] > [marca+canal] > [marca] > precio base
```

Contexto = `{marca, formato, sucursal, canal, franja horaria, fecha, tipo de cliente}`.

**Motor de reglas (promociones, combos, recargos, comisiones)** — reglas declarativas con estructura *condición → acción*, evaluadas en orden de prioridad y con política de acumulación:

| Tipo de regla | Ejemplo | Acción |
|---|---|---|
| Descuento por franja | Happy hour 18–20 h en barra, cerveza 2x1 | % / monto / NxM |
| Combo dinámico | Hamburguesa + bebida + papas = precio fijo | Precio de paquete |
| Recargo por canal | Delivery propio +S/ 2 por pedido; precios agregador +15% | Recargo línea o pedido |
| Recargo por zona | Zona B: tarifa de envío S/ 6; pedido mínimo S/ 40 | Tarifa de envío / bloqueo |
| Comisión de canal | Agregador A: 22% sobre subtotal + IGV de la comisión | Cálculo para margen y conciliación (no afecta al cliente) |
| Cupón | `BIENVENIDO10` 10% primer pedido, uso único por cliente | Descuento con validación |
| Servicio | Cargo por servicio salón 10% (si aplica legalmente) | Cargo pedido |

Los montos y porcentajes son **ejemplos ilustrativos**, no datos del negocio.

**Política de acumulación:** cada regla define `stackable` (sí/no), `exclusive_group` y tope máximo de descuento por pedido. El resultado se explica en el ticket ("Promo happy hour −S/ 12,00").

**Impuestos:** `tax_rule(país, régimen del emisor, categoría tributaria del producto, tipo de operación, vigencia) → {tributo, tasa, base, código de afectación}`. Permite modelar tasas reducidas o especiales (p. ej. regímenes para restaurantes MYPE en Perú, impuesto a bolsas plásticas, exoneraciones) sin tocar código. [Requiere validación] de tasas vigentes al momento de configurar.

## M4. Toma de pedidos omnicanal

| Canal / modo | Capacidades |
|---|---|
| Salón | Mapa de mesas por área (arrastrar/soltar), estados (libre, ocupada, por cobrar, reservada, sucia), comensales, mesero asignado, **unir mesas, transferir mesa/ítems entre mesas, dividir cuenta** (por ítem, por comensal, en partes iguales, por monto), cursos/tiempos ("enviar segundos"). |
| Barra | Cuentas abiertas por nombre/tarjeta, rondas rápidas, pre-autorización de tarjeta (si el medio lo permite). |
| Mostrador / fast food | Flujo de pago anticipado, número de turno/llamador, pantalla de cliente. |
| Pickup / para llevar | Hora prometida, cliente, notas de empaque. |
| Delivery propio | Búsqueda de cliente por teléfono, dirección geocodificada, validación de zona/cobertura/pedido mínimo, tarifa de envío, método de pago (incluye contra entrega con vuelto). |
| Agregadores | Ingreso automático (ver M6); aceptación manual o automática según configuración. |
| Programados | Fecha/hora objetivo; el sistema libera la comanda a cocina en `hora objetivo − tiempo de preparación − tiempo de traslado`. |

**Reglas transversales**
- La línea de pedido "congela" precio, impuestos, promoción aplicada y versión de configuración.
- Anular ítem enviado a cocina requiere motivo y, según rol, aprobación de supervisor (PIN); queda en auditoría.
- Estados del pedido: `BORRADOR → CONFIRMADO → EN_PREPARACION → LISTO → (EN_REPARTO) → ENTREGADO → CERRADO`, con `CANCELADO` y `DEVUELTO` como terminales controlados.

## M5. Cocina, barra y logística (KDS)

- **Ruteo** de cada línea a la estación configurada (parrilla, fríos, bebidas, postres, barra) y por sucursal/cocina central.
- **Priorización** por puntaje: `prioridad = f(tiempo transcurrido / SLA del canal, canal, tipo de servicio, VIP, hora prometida)`. Ej.: delivery con repartidor en camino sube de prioridad.
- **Tiempos**: inicio, listo, despachado, entregado; SLA por producto y canal; semáforo (verde/ámbar/rojo).
- **Alertas**: pedido retrasado, cancelación de pedido ya en preparación (aviso visual + sonoro), ítem agotado ("86") que se propaga a POS y agregadores.
- **Coordinación cocina central ↔ sucursales/dark kitchens**: órdenes de producción, pedidos internos de abastecimiento (genera transferencia), consolidación de comandas multi-marca en una misma cocina con identificación visual por marca.
- **Expedición**: pantalla de pase que agrupa todas las estaciones de un pedido y marca "completo para entregar".

## M6. Delivery propio y agregadores

| Capacidad | Detalle |
|---|---|
| Recepción unificada | Bandeja única de pedidos de todos los canales con origen, hora prometida y estado; mismo flujo hacia KDS. |
| Zonas y tarifas | Polígonos por sucursal, tarifa, pedido mínimo, tiempo estimado base, horario por zona. |
| Asignación de repartidores | Manual o sugerida (cercanía, carga, orden de salida); agrupación de pedidos por ruta. |
| Tracking | Estados del reparto y ubicación por app del repartidor; enlace de seguimiento al cliente. |
| Tiempos estimados | ETA = cola de cocina + preparación + traslado estimado por zona; recalculado en cada cambio de estado. |
| Contra entrega | Liquidación del repartidor al final del turno (efectivo recibido vs. pedidos entregados). |
| Conciliación agregadores | Importación de liquidaciones (API o archivo), cruce pedido a pedido: monto, comisión, promociones financiadas por el agregador vs. por el restaurante, cancelaciones y reembolsos, diferencias. |

## M7. Caja y cobros

- **Sesión de caja** por terminal/cajero: apertura con fondo, movimientos (ingresos/retiros con motivo), cierre con arqueo ciego (el cajero declara antes de ver el esperado), diferencia y aprobación.
- **Métodos de pago**: efectivo (con vuelto y multi-moneda de cobro), tarjeta (terminal integrado), transferencia, QR, billeteras, pago contra entrega, crédito corporativo (cuenta por cobrar), vale/cupón, pago mixto.
- **Propinas**: por medio de pago, distribución configurable (por mesero, pozo común), reporte para planilla. [Requiere validación] tratamiento tributario/laboral.
- **Descuentos y anulaciones controladas**: límites por rol, motivo obligatorio, aprobación por PIN de supervisor por encima del límite.
- **Cierre de turno/día**: consolida cajas, cuadra con pagos electrónicos (lotes de tarjeta), genera reporte Z interno y dispara resúmenes fiscales si el país lo exige.

## M8. Facturación electrónica (núcleo fiscal)

| Capacidad | Detalle |
|---|---|
| Tipos de documento | Catálogo por país: p. ej. Perú → factura, boleta, nota de crédito, nota de débito; otros países → equivalentes (DTE, CFDI, documento equivalente POS, etc.). [Requiere validación] |
| Determinación del documento | Regla por país: tipo de documento según identificación del cliente (p. ej. RUC → factura; DNI/consumidor final → boleta) y montos límite para identificar al consumidor. [Requiere validación] |
| Series y numeración | Serie por sucursal × formato × canal × terminal (configurable); correlativo sin huecos; rangos reservados para offline. |
| Datos fiscales del cliente | Captura y validación de documento (dígito verificador local + consulta en línea al padrón vía proveedor cuando hay conexión); caché de clientes frecuentes. |
| Emisión | Generación del Documento Fiscal Canónico → adaptador del país (formato XML/JSON, firma o envío al proveedor) → respuesta → almacenamiento del XML y la constancia. |
| Representación impresa | Ticket con QR y datos obligatorios según país; plantilla por país/marca. |
| Notas y anulaciones | Nota de crédito total/parcial ligada al documento origen (devolución, descuento posterior, error); comunicación de baja o anulación según reglas del país. |
| Contingencia | Emisión offline con envío diferido dentro del plazo legal; monitor de vencimientos; procedimiento de contingencia del país cuando corresponda. [Requiere validación] |
| Envío al cliente | Email con PDF/XML, enlace/QR de consulta, reimpresión. |
| Consulta de estado | Panel por documento: pendiente, enviado, aceptado, aceptado con observaciones, rechazado, anulado; reproceso. |

## M9. Clientes, fidelización y CRM básico

- Perfil único por cliente (teléfono como llave principal en delivery), direcciones múltiples, preferencias y alergias, consentimientos de marketing.
- Historial de pedidos omnicanal (los de agregadores sólo con los datos que el agregador comparta; usualmente limitados).
- Puntos por monto gastado con reglas por marca, canjes por productos/descuentos, vencimiento; cupones con condiciones.
- Segmentación básica RFM (recencia, frecuencia, monto) y por canal preferido; exportación para campañas.

## M10. Reportes y analítica

| Familia | Reportes / KPIs |
|---|---|
| Ventas | Ventas netas e impuestos por sucursal, marca, formato, canal, turno, franja, producto, categoría, empleado; ticket promedio; ítems por ticket; horas pico (mapa de calor); comparativos período contra período. |
| Margen | Costo teórico, margen bruto por producto/categoría/canal (neto de comisiones); ingeniería de menú (popularidad vs. margen). |
| Delivery | Tiempo de preparación, de espera de repartidor, de entrega; % a tiempo; cancelaciones por motivo/canal; comisiones; rentabilidad por canal. |
| Caja | Arqueos, diferencias por cajero, descuentos y anulaciones por usuario (control de fraude). |
| Inventario | Consumo teórico vs. real, mermas por motivo, valorización de stock, rotación. |
| Fiscal | Comprobantes emitidos/anulados/notas por serie y estado de envío; pendientes por vencer; conciliación ventas vs. comprobantes. |

## M11. Administración y seguridad

- **RBAC + alcance**: permiso = `rol × acción × ámbito (grupo/marca/formato/sucursal)`. Roles base: dueño, gerente de marca, administrador de sucursal, cajero, mesero, cocinero, jefe de cocina, repartidor, contador, auditor, soporte.
- **Acciones sensibles** (anulación, descuento sobre límite, reapertura de cuenta, apertura de cajón sin venta, cambio de precio en línea) requieren permiso explícito y quedan registradas con usuario, aprobador, terminal, hora, antes/después.
- **Bitácora inmutable** con hash encadenado; exportable para auditoría fiscal.
- **Autenticación**: OIDC + MFA para backoffice; PIN/tarjeta para POS con bloqueo por intentos; sesión ligada al terminal registrado.
- **Respaldos**: PITR en nube; respaldo continuo del Edge; prueba de restauración trimestral.
