# 06 — Backlog priorizado (MoSCoW)

**Criterio de priorización.** MoSCoW se aplica contra la **versión 1.0** (= alcance funcional mínimo solicitado, al cierre de la fase 3). La columna *Fase* indica la secuencia de construcción (ver [07_plan_implementacion.md](07_plan_implementacion.md)). Puntos de historia (SP) en escala Fibonacci son [Estimación] relativa, a recalibrar en el refinamiento con el equipo.

- **M — Must:** sin esto no se puede operar legal o comercialmente.
- **S — Should:** alto valor; puede postergarse una iteración con un procedimiento manual.
- **C — Could:** mejora deseable; entra si hay capacidad.
- **W — Won't (en v1.0):** excluido explícitamente para proteger el alcance.

## E1. Plataforma, seguridad y configuración

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E1-01 | Como **administrador del grupo**, quiero crear marcas, formatos, sucursales, áreas y terminales, para reflejar la estructura real del negocio. | M | 1 | 8 |
| E1-02 | Como **administrador**, quiero asignar roles con alcance por marca/formato/sucursal, para que cada usuario vea y haga sólo lo que le corresponde. | M | 1 | 8 |
| E1-03 | Como **cajero**, quiero ingresar con PIN en un terminal registrado, para empezar a trabajar en segundos. | M | 1 | 5 |
| E1-04 | Como **auditor**, quiero una bitácora inmutable de acciones sensibles con usuario, aprobador y antes/después, para investigar incidentes. | M | 1 | 8 |
| E1-05 | Como **gerente de TI**, quiero registrar y monitorear el estado de cada Edge Hub (en línea, cola pendiente, versión), para actuar antes de que afecte la operación. | M | 1 | 8 |
| E1-06 | Como **administrador**, quiero MFA para usuarios de backoffice, para proteger configuraciones y datos. | M | 1 | 3 |
| E1-07 | Como **administrador**, quiero publicar configuración versionada con fecha de vigencia, para programar cambios de precio/menú sin intervenir en la noche. | S | 2 | 8 |

## E2. Catálogo, precios, impuestos y reglas

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E2-01 | Como **gerente de marca**, quiero un catálogo central con categorías, productos y variantes por sucursal/canal, para mantener un solo maestro. | M | 1 | 13 |
| E2-02 | Como **gerente de marca**, quiero grupos de modificadores con mín./máx. y precio, para personalizar platos sin errores. | M | 1 | 8 |
| E2-03 | Como **gerente de marca**, quiero combos fijos con prorrateo por componente, para venderlos y reportarlos correctamente. | M | 1 | 8 |
| E2-04 | Como **gerente comercial**, quiero listas de precio por formato, sucursal, canal y franja horaria, para fijar precios diferenciados. | M | 1 | 8 |
| E2-05 | Como **contador**, quiero configurar impuestos por país, régimen y categoría tributaria con vigencias, para cumplir sin cambios de código. | M | 1 | 8 |
| E2-06 | Como **gerente comercial**, quiero crear promociones (%, monto, NxM, happy hour) con reglas de acumulación, para ejecutar campañas sin soporte de TI. | S | 2 | 13 |
| E2-07 | Como **gerente de delivery**, quiero recargos por canal y zona y reglas de comisión por agregador, para medir el margen real por canal. | M | 2 | 8 |
| E2-08 | Como **gerente de marca**, quiero combos "arma tu combo" con slots y opciones, para ofrecer más flexibilidad. | C | 3 | 8 |
| E2-09 | Como **gerente de marca**, quiero menús con horarios de disponibilidad (desayuno, almuerzo, noche), para mostrar sólo lo vendible en cada momento. | S | 2 | 5 |

## E3. Recetas e inventario

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E3-01 | Como **chef corporativo**, quiero definir recetas y sub-recetas con mermas estándar, para costear y descontar insumos. | M | 1 | 8 |
| E3-02 | Como **administrador de sucursal**, quiero que cada venta descuente insumos automáticamente del almacén correcto, para conocer el stock teórico. | M | 1 | 8 |
| E3-03 | Como **almacenero**, quiero registrar compras/ingresos con costo, para valorizar inventario a costo promedio. | M | 1 | 5 |
| E3-04 | Como **administrador de sucursal**, quiero alertas de stock mínimo, para reponer a tiempo. | M | 1 | 3 |
| E3-05 | Como **jefe de cocina**, quiero registrar mermas con motivo, para controlar pérdidas. | M | 1 | 3 |
| E3-06 | Como **almacenero**, quiero transferencias entre almacenes/sucursales con envío y recepción, para mover stock con trazabilidad. | S | 2 | 8 |
| E3-07 | Como **controller**, quiero comparar consumo teórico vs. real tras inventario físico, para detectar fugas. | S | 2 | 8 |
| E3-08 | Como **gerente de marca**, quiero ver costo y margen por producto y por canal, para decidir precios y menú. | S | 2 | 5 |
| E3-09 | Como **jefe de cocina central**, quiero órdenes de producción que consuman insumos y generen producto intermedio, para abastecer sucursales y dark kitchens. | C | 3 | 8 |
| E3-10 | Como **comprador**, quiero órdenes de compra a proveedores con sugerencia por punto de reorden. | W | — | — |

## E4. Toma de pedidos omnicanal

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E4-01 | Como **mesero**, quiero un mapa de mesas por área con estados en tiempo real, para atender rápido. | M | 1 | 8 |
| E4-02 | Como **mesero**, quiero tomar el pedido con modificadores, notas y cursos y enviarlo a cocina, para evitar errores de comunicación. | M | 1 | 13 |
| E4-03 | Como **mesero**, quiero unir y transferir mesas e ítems, para adaptarme a cambios del cliente. | M | 1 | 5 |
| E4-04 | Como **cajero**, quiero dividir la cuenta por ítem, comensal, partes iguales o monto, para cobrar a cada cliente su parte. | M | 1 | 8 |
| E4-05 | Como **cajero de mostrador**, quiero un flujo rápido de pago anticipado con número de turno, para formatos fast food y cafetería. | M | 1 | 5 |
| E4-06 | Como **supervisor**, quiero que anular un ítem enviado requiera motivo y mi PIN, para controlar pérdidas y fraude. | M | 1 | 3 |
| E4-07 | Como **cajero**, quiero seguir tomando pedidos y cobrando sin internet, para no detener la venta. | M | 1 | 13 |
| E4-08 | Como **operador de delivery**, quiero buscar al cliente por teléfono, validar dirección y zona y calcular tarifa y ETA, para tomar pedidos de delivery propio. | M | 2 | 13 |
| E4-09 | Como **cliente/operador**, quiero programar pedidos para una fecha/hora, para que se preparen a tiempo. | S | 2 | 5 |
| E4-10 | Como **cajero de barra**, quiero cuentas abiertas por nombre con rondas rápidas. | S | 2 | 3 |
| E4-11 | Como **cliente**, quiero pedir desde una web propia con pago en línea y seguimiento. | C | 3 | 21 |
| E4-12 | Como **cliente**, quiero pedir desde un kiosco de autoservicio. | W | — | — |

## E5. Cocina, barra y logística (KDS)

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E5-01 | Como **cocinero**, quiero ver las comandas de mi estación en el KDS y marcarlas en preparación/listas, para trabajar sin papel. | M | 1 | 8 |
| E5-02 | Como **jefe de cocina**, quiero semáforos de tiempo por SLA de producto y canal, para priorizar. | M | 1 | 5 |
| E5-03 | Como **cocinero**, quiero alertas visuales y sonoras de cancelaciones y cambios, para no preparar de más. | M | 1 | 3 |
| E5-04 | Como **sucursal sin KDS**, quiero impresión de comandas por estación como alternativa o respaldo. | M | 1 | 3 |
| E5-05 | Como **expedidor**, quiero una pantalla de pase que consolide todas las estaciones de un pedido. | S | 2 | 5 |
| E5-06 | Como **jefe de cocina**, quiero marcar productos agotados ("86") que se bloqueen en POS y agregadores. | M | 2 | 5 |
| E5-07 | Como **jefe de operaciones**, quiero priorización automática por canal, hora prometida y llegada del repartidor. | S | 3 | 8 |
| E5-08 | Como **dark kitchen multi-marca**, quiero identificar la marca en cada comanda y empaque. | S | 3 | 3 |

## E6. Delivery propio y agregadores

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E6-01 | Como **cajero**, quiero recibir los pedidos de agregadores automáticamente en una bandeja unificada y aceptarlos/rechazarlos, para no digitarlos. | M | 2 | 13 |
| E6-02 | Como **cajero**, quiero que los estados (aceptado, listo, cancelado) se sincronicen con el agregador. | M | 2 | 8 |
| E6-03 | Como **gerente de marca**, quiero publicar menú, precios y disponibilidad al agregador desde el backoffice. | S | 2 | 13 |
| E6-04 | Como **administrador**, quiero definir zonas de reparto con tarifa, pedido mínimo y horario. | M | 2 | 8 |
| E6-05 | Como **despachador**, quiero asignar repartidores y agrupar pedidos por ruta. | M | 2 | 8 |
| E6-06 | Como **repartidor**, quiero una app para ver mis entregas, cambiar estados y registrar cobros contra entrega. | S | 2 | 13 |
| E6-07 | Como **cliente**, quiero un enlace de seguimiento del pedido. | C | 3 | 8 |
| E6-08 | Como **controller**, quiero importar liquidaciones de agregadores y conciliarlas pedido a pedido, para detectar cobros indebidos. | S | 3 | 13 |
| E6-09 | Como **cajero**, quiero liquidar al repartidor al final de su turno (efectivo vs. pedidos entregados). | M | 2 | 5 |
| E6-10 | Como **operaciones**, quiero integrar flotas de última milla de terceros. | W | — | — |

## E7. Caja y pagos

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E7-01 | Como **cajero**, quiero abrir caja con fondo inicial y registrar ingresos/retiros con motivo. | M | 1 | 5 |
| E7-02 | Como **cajero**, quiero cobrar con efectivo, tarjeta, transferencia, QR y pago mixto. | M | 1 | 13 |
| E7-03 | Como **cajero**, quiero registrar propinas por medio de pago y su distribución. | M | 1 | 5 |
| E7-04 | Como **supervisor**, quiero límites de descuento por rol con aprobación por PIN. | M | 1 | 3 |
| E7-05 | Como **cajero**, quiero cerrar caja con arqueo ciego por denominación y medio de pago. | M | 1 | 8 |
| E7-06 | Como **administrador**, quiero un cierre de día que consolide cajas y cuadre con lotes de tarjeta. | M | 1 | 5 |
| E7-07 | Como **cajero**, quiero terminal de tarjeta integrado que envíe el monto automáticamente. | S | 2 | 8 |
| E7-08 | Como **cliente corporativo**, quiero consumir a crédito y recibir factura consolidada. | C | 3 | 8 |

## E8. Facturación electrónica

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E8-01 | Como **contador**, quiero configurar tipos de comprobante, series y reglas de determinación por país, sucursal, formato y canal. | M | 1 | 8 |
| E8-02 | Como **cajero**, quiero emitir boleta o factura al cobrar con validación del documento del cliente. | M | 1 | 13 |
| E8-03 | Como **sistema**, quiero enviar el comprobante al proveedor OSE/PSE mediante adaptador y registrar su estado y constancia. | M | 1 | 13 |
| E8-04 | Como **cajero**, quiero emitir comprobantes sin internet con envío diferido y control de plazos. | M | 1 | 13 |
| E8-05 | Como **supervisor**, quiero emitir notas de crédito totales/parciales vinculadas al documento original. | M | 1 | 8 |
| E8-06 | Como **contador**, quiero anular comprobantes según el procedimiento del país (baja/anulación). | M | 1 | 5 |
| E8-07 | Como **cliente**, quiero recibir el comprobante por email/WhatsApp y consultarlo por QR. | S | 1 | 5 |
| E8-08 | Como **contador**, quiero una consola fiscal con estados, rechazos, reproceso y alertas de vencimiento. | M | 1 | 8 |
| E8-09 | Como **contador**, quiero notas de débito. | S | 2 | 3 |
| E8-10 | Como **grupo regional**, quiero un segundo adaptador de país. | C | 4 | 21 |
| E8-11 | Como **TI**, quiero un proveedor fiscal secundario en conmutación. | C | 4 | 13 |

## E9. Clientes y fidelización

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E9-01 | Como **operador**, quiero un perfil de cliente con direcciones, datos fiscales e historial. | M | 2 | 8 |
| E9-02 | Como **cliente**, quiero que se registre mi consentimiento de uso de datos y poder revocarlo. | M | 2 | 3 |
| E9-03 | Como **gerente de marketing**, quiero cupones con condiciones y uso único. | S | 3 | 5 |
| E9-04 | Como **cliente frecuente**, quiero acumular y canjear puntos. | S | 3 | 13 |
| E9-05 | Como **gerente de marketing**, quiero segmentar clientes por RFM y canal y exportar listas. | C | 3 | 8 |

## E10. Reportes y analítica

| ID | Historia de usuario | MoSCoW | Fase | SP |
|---|---|---|---|---|
| E10-01 | Como **gerente de sucursal**, quiero ventas por turno, producto, categoría, medio de pago y empleado. | M | 1 | 8 |
| E10-02 | Como **contador**, quiero el reporte fiscal de comprobantes emitidos, anulados, notas y estado de envío. | M | 1 | 5 |
| E10-03 | Como **auditor**, quiero reportes de descuentos, anulaciones y diferencias de caja por usuario. | M | 1 | 5 |
| E10-04 | Como **gerente general**, quiero ventas consolidadas por sucursal, marca, formato y canal con ticket promedio y horas pico. | S | 2 | 8 |
| E10-05 | Como **gerente de delivery**, quiero tiempos, cancelaciones, comisiones y rentabilidad por canal. | S | 3 | 8 |
| E10-06 | Como **gerente de marca**, quiero márgenes e ingeniería de menú. | S | 3 | 8 |
| E10-07 | Como **dirección**, quiero pronóstico de demanda por franja y producto. | W | — | — |

## Resumen del backlog [Estimación]

| Prioridad | N.º historias | SP | Comentario |
|---|---|---|---|
| Must | 53 | 390 | Núcleo operativo, fiscal y de delivery |
| Should | 22 | 168 | Mayormente fases 2–3 |
| Could | 8 | 95 | Fases 3–4 |
| Won't (v1.0) | 4 | — | Documentados para futuras versiones |
| **Total** | **87** | **653** | |

| Fase | SP |
|---|---|
| Fase 1 (MVP) | 316 |
| Fase 2 | 184 |
| Fase 3 | 119 |
| Fase 4 | 34 (+ evolutivos no detallados) |

Velocidad de referencia [Supuesto]: 2 squads × ~30–35 SP/sprint de 2 semanas ≈ 60–70 SP/sprint → Fase 1 ≈ 5 sprints de construcción pura; el plan agrega estabilización, homologación fiscal, hardware y piloto. Las historias técnicas transversales (sync offline, Edge Hub, CI/CD, observabilidad) están embebidas en E1-05, E4-07 y E8-04 y suelen subestimarse: se reserva un 25% de capacidad para ellas.
