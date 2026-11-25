# 09 — Riesgos, supuestos, dependencias y preguntas críticas

## 1. Matriz de riesgos

Probabilidad (P) e impacto (I) en escala 1–5; severidad = P × I. Valores [Estimación].

| ID | Riesgo | Tipo | P | I | Sev. | Mitigación | Responsable sugerido | Indicador de alerta |
|---|---|---|---|---|---|---|---|---|
| R01 | Incumplimiento fiscal por documentos offline enviados fuera de plazo o rechazados | Legal | 3 | 5 | **15** | Monitor de plazos, alertas escalonadas, proveedor secundario, homologación previa, checklist firmado por tributarista | Contador + Tech Lead | Documentos en cola > X h |
| R02 | Cambios normativos (tasas, formatos, plazos) durante el proyecto | Legal | 3 | 4 | **12** | Reglas parametrizadas con vigencia; proveedor fiscal absorbe cambios de formato; vigilancia normativa mensual | Contador | Publicaciones del ente tributario |
| R03 | Demora o negativa de acceso a APIs de agregadores | Técnico/comercial | 4 | 3 | **12** | Iniciar trámite en Fase 0; alternativa middleware; contingencia con tablet | Gerente comercial | Sin sandbox a la semana 8 |
| R04 | Recetas y catálogo incompletos o erróneos → costos e inventario no confiables | Datos | 4 | 3 | **12** | Levantamiento en Fase 0, plantillas validadas, responsable por marca, inventario físico de calibración | Chef corporativo | % productos sin receta |
| R05 | Complejidad de sincronización offline subestimada (conflictos, duplicados) | Técnico | 3 | 4 | **12** | Event log append-only, UUIDv7, pruebas de caos desde el sprint 2, arquitecto con experiencia en offline | Arquitecto | Defectos de sync abiertos |
| R06 | Ampliación de alcance (scope creep) por requerimientos de cada marca | Gestión | 4 | 3 | **12** | MoSCoW estricto, comité de cambios, "Won't" documentados | Product Owner | Variación de SP por sprint > 15% |
| R07 | Resistencia del personal / errores de uso en hora pico | Organizacional | 3 | 3 | 9 | Prototipos probados con usuarios, modo entrenamiento, hypercare, piloto con operación paralela | Gerente de operaciones | Tiempo de pedido en piloto |
| R08 | Heterogeneidad de hardware (impresoras, terminales de pago) | Técnico | 3 | 3 | 9 | Lista de hardware homologado; ESC/POS por red; compra centralizada | DevOps | Incidentes de impresión |
| R09 | Fuga de datos personales o de pago | Seguridad/legal | 2 | 5 | 10 | Minimización, cifrado, sin PAN, pentest, RLS, gestión de secretos, plan de respuesta a incidentes | Responsable de seguridad | Hallazgos de pentest |
| R10 | Falla del Edge Hub (hardware) en servicio | Operativo | 2 | 4 | 8 | UPS, modo degradado en POS, hub de repuesto preconfigurado, monitoreo de heartbeat | Soporte | Heartbeat perdido |
| R11 | Dependencia de un solo proveedor fiscal (caída o quiebra) | Proveedor | 2 | 4 | 8 | Adaptador intercambiable; cláusulas de SLA y portabilidad de datos; proveedor secundario evaluado | Finanzas + TI | SLA incumplido |
| R12 | Rotación de personal clave del equipo de desarrollo | Gestión | 3 | 3 | 9 | Documentación (ADR), pair programming, código compartido entre módulos, revisión cruzada | Tech Lead | Bus factor < 2 por módulo |
| R13 | Desviación del presupuesto/plazo | Financiero | 3 | 4 | **12** | Contingencia 15–20%, fases con go/no-go, priorización por valor | Gerencia | Burn-up vs. plan |

## 2. Supuestos

| ID | Supuesto | Etiqueta | Validar con | Cuándo |
|---|---|---|---|---|
| S01 | País piloto: Perú | [Supuesto] | Gerencia | Fase 0, semana 1 |
| S02 | Se contratará un proveedor fiscal autorizado (OSE/PSE u homólogo) | [Recomendación] | Contabilidad/TI | Fase 0 |
| S03 | Cada sucursal cuenta con red local estable y puede alojar un mini-PC con UPS | [Supuesto] | Operaciones/TI | Fase 0 (visita técnica) |
| S04 | Escala inicial 3–10 sucursales, 1–3 marcas | [Supuesto] | Gerencia | Fase 0 |
| S05 | Los pagos con tarjeta se procesan en terminales certificados semi-integrados | [Recomendación] | Finanzas | Fase 0 |
| S06 | Existe al menos un agregador con API de partner disponible en el país | [Requiere validación] | Comercial | Fase 0 |
| S07 | Las recetas existen (aunque sea en Excel) y pueden normalizarse | [Supuesto] | Chef corporativo | Fase 0 |
| S08 | Una moneda funcional por país | [Supuesto] | Finanzas | Fase 0 |
| S09 | El negocio acepta operar con un periodo de operación paralela en el piloto | [Supuesto] | Operaciones | Antes del piloto |
| S10 | El uso de series por terminal y procedimientos de contingencia offline es admisible en el país piloto | [Requiere validación] | Tributarista + proveedor | Fase 0 (bloqueante para el diseño de numeración) |

## 3. Dependencias legales

| ID | Dependencia | Impacto en el diseño | Estado |
|---|---|---|---|
| DL01 | Normativa de comprobantes electrónicos del país (tipos, formatos, plazos de envío, resúmenes, anulaciones, contingencia) | Reglas fiscales y adaptador | [Requiere validación] |
| DL02 | Tasas y regímenes tributarios aplicables a restaurantes (incluidos regímenes especiales o reducidos y tributos específicos como bolsas plásticas) | Tabla `TAX_RULE` | [Requiere validación] con vigencias |
| DL03 | Requisitos de la representación impresa (campos, QR) | Plantillas de impresión | [Requiere validación] |
| DL04 | Plazo de conservación de comprobantes y libros | Retención en almacenamiento WORM | [Requiere validación] |
| DL05 | Ley de protección de datos personales (en Perú, Ley N.º 29733 y su reglamento): registro de bancos de datos, consentimiento, transferencias internacionales si la nube está fuera del país | Hosting, consentimientos, contratos con encargados | [Requiere validación] |
| DL06 | Tratamiento tributario y laboral de propinas y cargos por servicio | Distribución de propinas, reporte para planilla | [Requiere validación] |
| DL07 | Responsabilidad de emisión de comprobantes en ventas por agregadores (quién emite, sobre qué monto, cómo se documenta la comisión) | Flujo fiscal de pedidos externos y conciliación | [Requiere validación] con contrato de cada plataforma |
| DL08 | Normas de defensa del consumidor (exhibición de precios con impuestos, libro de reclamaciones si aplica) | Menús, web propia, tickets | [Requiere validación] |
| DL09 | PCI DSS (si se procesan tarjetas) | Arquitectura de pagos semi-integrada | Definido por diseño: sin PAN |

## 4. Dependencias técnicas

| ID | Dependencia | Riesgo asociado | Plan B |
|---|---|---|---|
| DT01 | Sandbox y documentación API del proveedor fiscal | R01, R11 | Proveedor alternativo preseleccionado |
| DT02 | Credenciales partner de agregadores | R03 | Middleware de agregación |
| DT03 | SDK/protocolo de terminales de pago y QR locales | R08 | Modo no integrado (digitación del monto en terminal) temporal |
| DT04 | Proveedor de mapas/geocodificación | — | Proveedor alternativo vía `MapsPort`; polígonos dibujados manualmente |
| DT05 | Hardware homologado disponible en el país | R08 | Lista de 2 modelos por tipo de dispositivo |
| DT06 | Conectividad mínima por sucursal (incluido respaldo 4G) | R01 | Router con failover celular [Recomendación] |
| DT07 | Servicio de mensajería (email/WhatsApp/SMS) | — | Email como canal mínimo |

## 5. Preguntas críticas antes de iniciar el desarrollo

### 5.1 Bloqueantes (sin respuesta no se puede cerrar el diseño) — responder primero

1. **País(es) y razones sociales:** ¿en qué país(es) se operará en los próximos 24 meses, cuántas razones sociales/RUC emiten y bajo qué régimen tributario está cada una (incluido si aplica algún régimen especial para restaurantes)?
2. **Escala real:** ¿cuántas sucursales, marcas y formatos hay hoy y cuántos se proyectan a 3 años; cuántos terminales y pedidos/día por sucursal en hora pico?
3. **Facturación electrónica actual:** ¿ya emiten electrónicamente? ¿con qué proveedor (OSE/PSE) y contrato? ¿qué series usan y qué procedimiento de contingencia aplican hoy?
4. **Agregadores:** ¿con qué plataformas operan, qué % de las ventas representan, y quién emite el comprobante al consumidor en esas ventas según contrato?
5. **Decisión estratégica:** ¿el objetivo es tener un producto propio (activo diferenciador, eventualmente comercializable) o resolver la operación al menor costo y plazo? Esto define build/buy/híbrido.

### 5.2 Importantes (afectan alcance y estimación)

6. ¿Qué sistema(s) usan hoy (POS, inventario, contabilidad/ERP) y qué deben integrarse o reemplazarse?
7. ¿Existen recetas estandarizadas con gramajes y costos? ¿Hay cocina central que abastece a sucursales?
8. ¿El delivery propio usa repartidores en planilla, tercerizados o ambos? ¿Cobran contra entrega?
9. ¿Qué medios de pago y proveedores (adquirentes, billeteras, QR) son obligatorios desde el día uno?
10. ¿Qué hardware existe y puede reutilizarse (impresoras, tablets, terminales)? ¿Hay red estable y espacio para un equipo local con UPS por sucursal?
11. ¿Programa de fidelización existente? ¿Datos de clientes a migrar y con qué consentimiento?
12. ¿Políticas de propinas y cargo por servicio por formato?

### 5.3 De gobierno del proyecto

13. ¿Presupuesto y fecha objetivo de salida en vivo? ¿Hay estacionalidad que impida cortes en ciertos meses?
14. ¿Quién será el Product Owner con autoridad de decisión y qué disponibilidad tendrá (≥ 50% recomendado)?
15. ¿Desarrollo con equipo interno, proveedor externo o mixto? ¿Quién será dueño del código y de la propiedad intelectual?

## 6. Próximo paso recomendado

Realizar un **taller de 2 horas** con Gerencia, Operaciones, Finanzas/Contabilidad y TI para responder las preguntas 1–5, seguido de la Fase 0 (4 semanas). Responsable sugerido: Product Owner designado. Métrica de cierre: acta con respuestas a las 5 preguntas bloqueantes y decisión build/buy/híbrido.
