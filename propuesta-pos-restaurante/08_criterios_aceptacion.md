# 08 — Criterios de aceptación por módulo

Formato: escenarios *Dado / Cuando / Entonces* para comportamiento funcional y umbrales medibles para requisitos no funcionales. Todos los criterios se automatizan como pruebas E2E o de contrato salvo indicación. Los montos son ilustrativos.

## M1. Configuración multi-formato, multi-marca y multi-sucursal

| ID | Criterio |
|---|---|
| CA-M1-01 | **Dado** un grupo con 2 marcas y 3 sucursales, **cuando** se crea una sucursal que aloja ambas marcas, **entonces** cada terminal de esa sucursal puede vender ambas marcas y cada venta queda asociada a la marca correcta. |
| CA-M1-02 | **Dado** un precio de marca y una excepción para la sucursal B, **cuando** se vende en B, **entonces** se aplica la excepción; en las demás sucursales, el precio de marca. |
| CA-M1-03 | **Dado** un cambio de configuración publicado con vigencia futura, **cuando** llega la fecha/hora de vigencia, **entonces** todos los Edge Hubs conectados lo aplican en ≤ 5 min y los pedidos abiertos conservan su precio original. |

## M2. Productos, recetas e inventario

| ID | Criterio |
|---|---|
| CA-M2-01 | **Dado** un producto con receta (200 g de carne, 1 pan) y modificador "extra carne" (+100 g), **cuando** se envía a cocina 1 unidad con el modificador, **entonces** se descuentan 300 g de carne y 1 pan del almacén configurado, aplicando la merma estándar. |
| CA-M2-02 | **Dado** un ítem anulado antes de prepararse, **cuando** se confirma la anulación, **entonces** se revierte el consumo; si ya estaba en preparación, se registra merma con motivo. |
| CA-M2-03 | **Dado** un insumo con stock mínimo 5 kg, **cuando** el saldo cae por debajo, **entonces** se genera alerta visible en backoffice y notificación al responsable en ≤ 1 min (con conexión). |
| CA-M2-04 | **Dado** una transferencia enviada de 10 kg y recibida 9,5 kg, **cuando** se registra la recepción, **entonces** el estado es `DISCREPANCY` y la diferencia queda pendiente de justificación. |
| CA-M2-05 | El costo teórico de un producto se recalcula al cambiar el costo promedio de cualquiera de sus insumos, y el margen por canal descuenta la comisión configurada del agregador. |

## M3. Precios, impuestos y motor de reglas

| ID | Criterio |
|---|---|
| CA-M3-01 | **Dado** un happy hour 18:00–20:00 en barra, **cuando** se agrega el producto a las 19:59 y se cobra a las 20:05, **entonces** se respeta el precio con el que se agregó la línea. |
| CA-M3-02 | **Dado** dos promociones no acumulables del mismo grupo exclusivo, **cuando** ambas aplican, **entonces** se aplica sólo la de mayor beneficio para el cliente (o la de mayor prioridad, según configuración) y el ticket muestra cuál. |
| CA-M3-03 | **Dado** un cambio de tasa de impuesto con vigencia a partir de una fecha, **cuando** se emiten documentos antes y después, **entonces** cada uno usa la tasa vigente a su fecha de emisión, sin despliegue de código. |
| CA-M3-04 | Los totales calculados por el motor coinciden al céntimo con los del validador del proveedor fiscal en el 100% de los casos de la suite de redondeo. |

## M4. Toma de pedidos omnicanal

| ID | Criterio |
|---|---|
| CA-M4-01 | Agregar un ítem sin modificadores toma ≤ 2 toques desde la pantalla de pedido; p95 de respuesta ≤ 500 ms en LAN. |
| CA-M4-02 | **Dado** una mesa con 6 ítems, **cuando** se divide en 3 partes iguales, **entonces** se generan 3 subcuentas cuya suma iguala el total y el redondeo residual se asigna a la última. |
| CA-M4-03 | **Dado** dos meseros editando la misma mesa, **cuando** ambos guardan, **entonces** el segundo recibe aviso de conflicto con la versión actualizada y no se pierden ítems. |
| CA-M4-04 | **Dado** un pedido programado para las 13:00 con preparación de 20 min y traslado de 15 min, **entonces** la comanda se libera a cocina a las 12:25. |
| CA-M4-05 | **Dado** que se corta internet, **cuando** se toman, envían y cobran pedidos durante 72 h simuladas, **entonces** no se pierde ninguna transacción y todas se sincronizan en ≤ 30 min tras reconectar. |
| CA-M4-06 | Anular un ítem enviado sin permiso exige PIN de supervisor y motivo; el evento aparece en la bitácora con ambos usuarios. |

## M5. Cocina, barra y logística

| ID | Criterio |
|---|---|
| CA-M5-01 | Una comanda aparece en el KDS de su estación en ≤ 2 s desde "enviar a cocina" (p95, LAN). |
| CA-M5-02 | **Dado** un SLA de 12 min, **cuando** transcurren 9 y 12 min, **entonces** la tarjeta cambia a ámbar y rojo respectivamente. |
| CA-M5-03 | **Dado** un pedido cancelado en preparación, **entonces** el KDS muestra alerta visual y sonora que requiere confirmación del cocinero. |
| CA-M5-04 | **Dado** un producto marcado "86", **entonces** queda bloqueado en todos los POS de la sucursal en ≤ 5 s y en los agregadores integrados en ≤ 2 min (sujeto a la API de la plataforma). |
| CA-M5-05 | Si el KDS falla, la comanda se imprime automáticamente en la impresora de respaldo de la estación. |

## M6. Delivery propio y agregadores

| ID | Criterio |
|---|---|
| CA-M6-01 | **Dado** un webhook de pedido válido, **entonces** el pedido aparece en la bandeja de la sucursal en ≤ 10 s (p95) y el webhook se responde en ≤ 2 s. |
| CA-M6-02 | **Dado** el mismo webhook recibido 3 veces, **entonces** existe un único pedido. |
| CA-M6-03 | **Dado** un SKU externo sin mapeo, **entonces** el pedido no se pierde: queda en estado "requiere revisión" con alerta y puede mapearse y aceptarse manualmente. |
| CA-M6-04 | **Dado** una dirección fuera de todos los polígonos, **entonces** el sistema impide confirmar delivery y ofrece pickup o la sucursal que la cubre. |
| CA-M6-05 | **Dado** un pedido bajo el mínimo de la zona, **entonces** no se puede confirmar y se muestra el faltante. |
| CA-M6-06 | **Dado** una liquidación importada, **entonces** cada línea queda clasificada (`MATCHED`, `DIFFERENCE`, `MISSING_IN_POS`, `MISSING_IN_SETTLEMENT`) y el reporte de rentabilidad por canal cuadra con la suma de líneas. |
| CA-M6-07 | La liquidación del repartidor muestra efectivo esperado = Σ pedidos contra entrega entregados − vueltos registrados, con diferencia y aprobación. |

## M7. Caja y cobros

| ID | Criterio |
|---|---|
| CA-M7-01 | No se puede cobrar sin caja abierta en el terminal (salvo rol sin manejo de efectivo con medios electrónicos, si se configura). |
| CA-M7-02 | **Dado** un pago mixto (S/ 50 efectivo + S/ 30 tarjeta) sobre S/ 80, **entonces** la cuenta se cierra y cada medio queda registrado en la sesión de caja. |
| CA-M7-03 | En el arqueo ciego el esperado no es visible antes de declarar; tras declarar se muestran diferencias por medio de pago. |
| CA-M7-04 | Una diferencia fuera de tolerancia exige motivo y aprobación de supervisor para cerrar. |
| CA-M7-05 | El cierre de día no se completa si hay cajas abiertas o comprobantes del día en estado `DRAFT`; advierte (sin bloquear) si hay documentos en cola de contingencia dentro de plazo. |
| CA-M7-06 | Cobro + impresión de ticket en p95 ≤ 2 s (excluye tiempo de autorización del terminal de tarjeta). |
| CA-M7-07 | El sistema no almacena número completo de tarjeta ni CVV en ninguna base, log o respaldo (verificado por escaneo automatizado). |

## M8. Facturación electrónica

| ID | Criterio |
|---|---|
| CA-M8-01 | **Dado** un cliente con identificador tributario de empresa válido, **entonces** el sistema sugiere factura; con consumidor final, boleta (según reglas configuradas del país piloto). |
| CA-M8-02 | La numeración por serie es correlativa y sin huecos ni duplicados, incluso con 4 terminales emitiendo simultáneamente online y offline (prueba de concurrencia de 10.000 documentos). |
| CA-M8-03 | El 100% de los casos de la suite de homologación del proveedor es aceptado en sandbox. |
| CA-M8-04 | **Dado** un documento emitido offline, **entonces** se envía automáticamente al reconectar y la consola alerta si faltan ≤ 24 h (configurable) para el vencimiento del plazo legal. |
| CA-M8-05 | Un documento emitido no puede modificarse en sus campos económicos (verificado a nivel de base de datos); la corrección sólo es posible por nota o anulación. |
| CA-M8-06 | **Dado** una nota de crédito parcial, **entonces** referencia al documento origen, su monto no supera el saldo no acreditado y revierte inventario si corresponde. |
| CA-M8-07 | El XML/representación y la constancia de cada documento quedan almacenados y recuperables por su número en ≤ 3 s. |
| CA-M8-08 | El ticket impreso contiene todos los campos obligatorios y el QR del país piloto (checklist firmado por el consultor tributario). |
| CA-M8-09 | Agregar un nuevo país o proveedor no requiere modificar módulos del dominio: sólo un nuevo adaptador y configuración (verificado por revisión de arquitectura). |

## M9. Clientes, fidelización y CRM

| ID | Criterio |
|---|---|
| CA-M9-01 | La búsqueda por teléfono devuelve el cliente, sus direcciones y últimos 5 pedidos en ≤ 1 s. |
| CA-M9-02 | Sin consentimiento de marketing registrado, el cliente no aparece en exportaciones para campañas. |
| CA-M9-03 | Los puntos se acreditan sólo sobre pedidos cerrados y pagados y se revierten ante nota de crédito. |
| CA-M9-04 | Un cupón de uso único no puede canjearse dos veces, ni siquiera desde dos terminales offline (validación al sincronizar con regla de conflicto documentada). |

## M10. Reportes y analítica

| ID | Criterio |
|---|---|
| CA-M10-01 | Las ventas netas del reporte de ventas cuadran al céntimo con la suma de comprobantes aceptados − notas de crédito del mismo periodo y sucursal. |
| CA-M10-02 | Los reportes del día anterior están disponibles antes de las 06:00; los reportes operativos del día en curso tienen latencia ≤ 15 min. |
| CA-M10-03 | Todo reporte permite filtrar por sucursal, marca, formato, canal, turno y rango de fechas, y exportar a Excel/CSV. |
| CA-M10-04 | Un usuario sólo ve datos de su ámbito (sucursal/marca) según sus permisos. |

## M11. Administración y seguridad

| ID | Criterio |
|---|---|
| CA-M11-01 | Un cajero de la sucursal A no puede ver ni operar datos de la sucursal B (prueba de RLS automatizada en API y base de datos). |
| CA-M11-02 | La bitácora detecta cualquier alteración (verificación de cadena de hash diaria sin errores). |
| CA-M11-03 | 5 intentos fallidos de PIN bloquean el usuario en ese terminal y notifican al supervisor. |
| CA-M11-04 | Restauración de respaldo a un punto en el tiempo probada con RTO ≤ 1 h y RPO ≤ 5 min. |
| CA-M11-05 | Sin vulnerabilidades críticas o altas abiertas en el pentest previo a producción. |

## Requisitos no funcionales transversales

| ID | Criterio | Método de verificación |
|---|---|---|
| CA-NF-01 | p95 ≤ 2 s en operaciones críticas con 20 terminales concurrentes por sucursal y 3× el pico esperado | Prueba de carga (k6/Gatling) |
| CA-NF-02 | 72 h de operación offline sin pérdida de datos | Prueba de caos (corte de red, reinicio de Edge, corte de energía con UPS) |
| CA-NF-03 | Disponibilidad nube ≥ 99,9% mensual | SLO medido |
| CA-NF-04 | UI usable en tablet de 8" y pantalla de 15"; objetivos táctiles ≥ 48 px | Revisión de diseño + pruebas con usuarios |
| CA-NF-05 | Trazabilidad: dado un número de comprobante, se reconstruye pedido, líneas, usuario, pagos, comanda y consumos en una sola consulta | Prueba funcional |
