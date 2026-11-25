# 04 — Flujos de pantalla

Principios de UX para POS/KDS [Recomendación]: objetivos táctiles ≥ 48 px; máximo 3 toques para agregar un ítem frecuente; acciones destructivas con confirmación y motivo; indicador permanente de estado de conexión (en línea / offline / pendientes de sincronizar) y de cola fiscal; modo alto contraste para cocina; idioma y formato numérico por sucursal.

---

## Flujo 1 — Pedido en salón

```mermaid
flowchart TD
  A["Login con PIN<br/>(terminal registrado)"] --> B{"¿Caja abierta?<br/>(sólo si el rol cobra)"}
  B -- No --> B1["Apertura de caja<br/>(fondo inicial)"] --> C
  B -- Sí --> C["Mapa de mesas<br/>(áreas, estados por color)"]
  C --> D["Seleccionar mesa libre<br/>→ N.º comensales"]
  D --> E["Pantalla de pedido<br/>Categorías | Productos | Cuenta"]
  E --> F{"¿Producto con<br/>modificadores?"}
  F -- Sí --> F1["Modal modificadores<br/>(obligatorios / opcionales,<br/>notas, alergias)"] --> G
  F -- No --> G["Línea agregada<br/>(asignar a comensal/curso)"]
  G --> H{"¿Más ítems?"}
  H -- Sí --> E
  H -- No --> I["Enviar a cocina<br/>(todo o por curso)"]
  I --> J["KDS/impresoras por estación<br/>+ estado en mesa: 'En preparación'"]
  J --> K{"Acciones durante el servicio"}
  K -->|Agregar| E
  K -->|Transferir ítems/mesa| K1["Seleccionar destino<br/>(registro en auditoría)"]
  K -->|Unir mesas| K2["Seleccionar mesas<br/>→ cuenta consolidada"]
  K -->|Anular ítem enviado| K3["Motivo + PIN supervisor<br/>→ aviso a KDS"]
  K -->|Pre-cuenta| L
  L["Pre-cuenta impresa<br/>(no fiscal)"] --> M{"¿Dividir cuenta?"}
  M -- Sí --> M1["Dividir por ítem / comensal /<br/>partes iguales / monto"] --> N
  M -- No --> N["Ir a cobro → Flujo 4"]
  N --> O["Mesa pasa a 'Por limpiar'<br/>→ 'Libre'"]
```

**Pantallas clave**

| Pantalla | Elementos | Reglas |
|---|---|---|
| Mapa de mesas | Áreas en pestañas, mesas con color por estado, tiempo de ocupación, mesero, monto acumulado | Arrastrar mesa sobre otra = unir; mantener presionado = menú de acciones |
| Pedido | Barra de búsqueda, categorías, grilla de productos con foto opcional, panel de cuenta con comensales y cursos | Productos agotados ("86") se muestran deshabilitados; precio según canal/franja vigente |
| Modificadores | Grupos con mín./máx. visibles, precio adicional, campo de nota | No permite confirmar si falta un obligatorio |
| División de cuenta | Columnas por subcuenta, arrastrar ítems; ítem compartido dividible en fracciones | La suma de subcuentas debe igualar el total; cada subcuenta genera su propio comprobante |

---

## Flujo 2 — Pedido delivery propio (call center / WhatsApp / mostrador)

```mermaid
flowchart TD
  A["Nuevo pedido → Canal: Delivery propio"] --> B["Buscar cliente por teléfono"]
  B --> C{"¿Existe?"}
  C -- No --> C1["Alta rápida: nombre, teléfono,<br/>consentimiento de datos"] --> D
  C -- Sí --> D["Seleccionar dirección guardada<br/>o ingresar nueva (autocompletado + pin en mapa)"]
  D --> E{"¿Dentro de zona de cobertura<br/>y horario de la zona?"}
  E -- No --> E1["Ofrecer pickup u otra sucursal<br/>que cubra la dirección"]
  E -- Sí --> F["Asignar sucursal/marca + tarifa de envío<br/>+ pedido mínimo + ETA"]
  F --> G["Carga de productos (menú del canal delivery)<br/>+ sugerencias del historial"]
  G --> H{"¿Cumple pedido mínimo?"}
  H -- No --> G
  H -- Sí --> I["¿Ahora o programado?<br/>(fecha/hora)"]
  I --> J["Método de pago:<br/>online (link/QR) · contra entrega (efectivo con vuelto / POS móvil)"]
  J --> K["Datos fiscales: boleta/factura<br/>(validación de documento)"]
  K --> L["Confirmar → SMS/WhatsApp con<br/>resumen + enlace de seguimiento"]
  L --> M["Liberación a cocina<br/>(inmediata o en hora calculada si es programado)"]
  M --> N["KDS → Listo → Expedición"]
  N --> O["Asignar repartidor<br/>(manual o sugerido; agrupar por ruta)"]
  O --> P["App repartidor: recoger → en camino → entregado<br/>(foto/firma opcional, cobro contra entrega)"]
  P --> Q["Cierre del pedido + comprobante<br/>(emitido al cobrar o al confirmar pago online)"]
  Q --> R["Liquidación del repartidor al fin de turno"]
```

---

## Flujo 3 — Integración con agregador (recepción automática)

```mermaid
sequenceDiagram
  autonumber
  participant AG as Agregador
  participant IH as Integration Hub
  participant OR as Core Pedidos
  participant EH as Edge Hub sucursal
  participant UI as POS (bandeja) / KDS

  AG->>IH: Webhook "nuevo pedido" (firma HMAC)
  IH->>IH: Verificar firma, deduplicar por external_id, guardar crudo
  IH->>IH: Mapear a Pedido Canónico (SKU externos → variantes internas)
  alt Mapeo incompleto (SKU desconocido)
    IH->>UI: Alerta "pedido requiere revisión" (no se pierde)
  end
  IH->>OR: CreateOrder(canal=AGREGADOR_X, precios del agregador)
  OR->>EH: Push pedido (WebSocket)
  EH->>UI: Bandeja unificada + sonido
  alt Aceptación automática habilitada y capacidad OK
    EH->>OR: Aceptar(tiempo prep estimado)
  else Manual
    UI->>EH: Cajero acepta / rechaza (motivo)
  end
  OR->>IH: Accept/Reject
  IH->>AG: API accept (prepTime) / reject
  EH->>UI: Comandas a KDS
  UI->>EH: Listo para recoger
  EH->>OR: Status READY
  OR->>IH: Status update
  IH->>AG: "Pedido listo"
  AG-->>IH: Webhook "repartidor llegó" / "entregado" / "cancelado"
  IH->>OR: Actualizar estado (cancelación tardía → alerta KDS + merma)
```

**Pantalla "Bandeja unificada"**: columnas por estado (Nuevos · En preparación · Listos · En reparto · Entregados), tarjeta con logo del canal, número externo corto, hora prometida, cuenta regresiva, botón aceptar/rechazar, indicador de pago (prepagado / cobrar). Filtros por canal y marca. Interruptor para **pausar canal** o **marcar ítem agotado** que se sincroniza con el agregador.

---

## Flujo 4 — Emisión de comprobante electrónico (cobro)

```mermaid
flowchart TD
  A["Cuenta / subcuenta lista para cobrar"] --> B["Pantalla de cobro:<br/>total, propina sugerida, descuentos autorizados"]
  B --> C["Tipo de comprobante<br/>(sugerido por regla del país)"]
  C --> D{"¿Requiere identificar al cliente?<br/>(factura, o monto sobre umbral legal)"}
  D -- Sí --> D1["Ingresar tipo y n.º de documento"] --> D2{"Validación<br/>(dígito verificador local;<br/>padrón en línea si hay conexión)"}
  D2 -- Inválido --> D1
  D2 -- Válido --> E
  D -- No --> E["Consumidor final"]
  E --> F["Seleccionar medios de pago<br/>(mixto: efectivo + tarjeta + QR...)"]
  F --> F1{"¿Tarjeta/QR?"}
  F1 -- Sí --> F2["Terminal integrado / QR dinámico<br/>→ autorización"] --> G
  F1 -- No --> G["Efectivo: monto recibido → vuelto"]
  G --> H{"¿Pagos = total?"}
  H -- No --> F
  H -- Sí --> I["Edge Hub: asigna serie + correlativo<br/>(rango local reservado)"]
  I --> J["Genera documento canónico<br/>→ representación impresa con QR"]
  J --> K["Imprimir ticket / enviar email-WhatsApp<br/>+ abrir cajón si hubo efectivo"]
  K --> L{"¿Conexión con proveedor fiscal?"}
  L -- Sí --> L1["Envío inmediato (asíncrono)<br/>→ ACEPTADO / OBSERVADO / RECHAZADO"]
  L -- No --> L2["Cola de contingencia<br/>PENDIENTE_ENVIO + monitor de plazo"]
  L1 --> M{"¿Rechazado?"}
  M -- Sí --> M1["Alerta a supervisor/contador:<br/>corregir datos → reemisión según regla del país"]
  M -- No --> N["Fin"]
  L2 --> N
```

**Flujo relacionado — Nota de crédito**: Buscar comprobante (n.º, fecha, cliente, QR) → seleccionar motivo del catálogo del país → total o parcial (selección de líneas) → aprobación por rol → reembolso (mismo medio de pago o vale) → emisión de nota con referencia al documento original → reverso de inventario si el producto no se preparó.

---

## Flujo 5 — Cierre de caja

```mermaid
flowchart TD
  A["Cajero: 'Cerrar caja'"] --> B{"¿Cuentas abiertas o pagos<br/>pendientes en esta caja?"}
  B -- Sí --> B1["Listar pendientes:<br/>cobrar, transferir a otra caja o<br/>escalar a supervisor"] --> B
  B -- No --> C["Arqueo ciego:<br/>conteo por denominación<br/>(el esperado NO se muestra)"]
  C --> D["Declarar otros medios:<br/>vouchers de tarjeta, QR, transferencias,<br/>vales, cobros contra entrega"]
  D --> E["Sistema calcula esperado vs. declarado<br/>por medio de pago"]
  E --> F{"¿Diferencia dentro<br/>de tolerancia?"}
  F -- No --> F1["Recontar (1 vez) o<br/>justificar con motivo"] --> G
  F -- Sí --> G["Supervisor revisa y aprueba (PIN)"]
  G --> H["Reporte de cierre:<br/>ventas por medio, propinas, descuentos,<br/>anulaciones, retiros, diferencia"]
  H --> I["Depósito/retiro a bóveda<br/>(registro de movimiento)"]
  I --> J{"¿Último cierre del día<br/>en la sucursal?"}
  J -- Sí --> K["Cierre de día:<br/>- consolidación de cajas<br/>- cuadre con lotes de tarjeta<br/>- resumen fiscal si el país lo exige<br/>- verificación de cola fiscal vacía<br/>- liquidación de repartidores"]
  J -- No --> L["Fin"]
  K --> L
```

**Pantalla de arqueo**: teclado numérico por denominación (billetes y monedas) con subtotal automático, campos por medio de pago, campo de observaciones, botón "Recontar". Tras aprobar se muestra la diferencia y el reporte se imprime y queda en el backoffice.
