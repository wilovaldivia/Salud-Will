# Propuesta integral — Sistema de Ventas Multi-Formato para Restaurantes (POS omnicanal + Delivery + Facturación Electrónica)

**Versión:** 0.1 (borrador para revisión) · **Fecha:** 2026-11-25 · **Rol principal:** Arquitectura de software · **Roles de apoyo:** Analista funcional POS, Director de operaciones, Financista.

> Convención de etiquetas: **[Dato entregado]** viene del requerimiento; **[Supuesto]** se asumió para avanzar; **[Estimación]** es un cálculo de orden de magnitud; **[Recomendación]** es una decisión propuesta; **[Requiere validación]** debe confirmarse con especialista, proveedor o normativa vigente antes de construir.

---

## 1. Índice de entregables

| # | Entregable solicitado | Archivo |
|---|---|---|
| 1 | Diagrama de arquitectura por componentes y flujo de datos + stack justificado | [01_arquitectura.md](01_arquitectura.md) |
| — | Módulos funcionales y reglas de negocio (alcance funcional 1–9) | [02_modulos_funcionales.md](02_modulos_funcionales.md) |
| 3 | Modelo entidad-relación preliminar | [03_modelo_datos.md](03_modelo_datos.md) |
| 4 | Flujos de pantalla (salón, delivery, agregador, comprobante, cierre de caja) | [04_flujos_pantalla.md](04_flujos_pantalla.md) |
| 5 | Diseño de integración con delivery y facturación electrónica | [05_integraciones.md](05_integraciones.md) |
| 2 | Backlog priorizado con historias de usuario (MoSCoW) | [06_backlog_moscow.md](06_backlog_moscow.md) |
| 6 | Plan de implementación por fases (MVP e iteraciones) | [07_plan_implementacion.md](07_plan_implementacion.md) |
| 7 | Criterios de aceptación por módulo | [08_criterios_aceptacion.md](08_criterios_aceptacion.md) |
| 8 | Riesgos, supuestos, dependencias legales/técnicas y preguntas críticas | [09_riesgos_supuestos_preguntas.md](09_riesgos_supuestos_preguntas.md) |

---

## 2. Resumen ejecutivo

- **Arquitectura recomendada: monolito modular en la nube + nodo local por sucursal ("Edge Hub") + apps POS/KDS offline-first.** El Edge Hub permite que caja, KDS, impresoras y facturación sigan operando sin internet y coordinados entre sí; un POS que sólo es PWA offline no puede coordinar varios dispositivos ni garantizar numeración fiscal. [Recomendación]
- **Stack: TypeScript de punta a punta** (React + NestJS + PostgreSQL), con Python/FastAPI reservado para analítica y pronósticos en fases posteriores. Una sola lengua reduce costo de equipo y permite compartir el modelo de dominio (tipos, validaciones, motor de precios) entre nube, Edge Hub y POS. [Recomendación]
- **Lo fiscal y lo de agregadores se aísla en "capas anticorrupción" con adaptadores enchufables.** El núcleo sólo conoce un *Documento Fiscal Canónico* y un *Pedido Canónico*; las reglas por país (tipos de comprobante, impuestos, series, plazos, contingencia) viven en tablas versionadas por vigencia, no en código. [Recomendación]
- **MVP en ~6 meses** (Fase 0 + Fase 1: salón/barra/mostrador, KDS, caja, facturación electrónica de un país, inventario por receta básico, offline) más **piloto de 6 semanas** en 1 sucursal; delivery propio y 1–2 agregadores en la fase 2; multi-marca/formato avanzado, CRM y analítica en la fase 3 (v1.0 completa en ~54 semanas). Esfuerzo ≈ **60 persona-mes hasta el MVP** y **~133 persona-mes hasta v1.0**. [Estimación]
- **Decisión que debe tomarse antes de construir: build vs. buy.** Construir un POS completo sólo se justifica si la operación multi-marca/dark kitchen es una ventaja estratégica o si el número de sucursales hace que las licencias SaaS superen el costo de propiedad. Se recomienda un **modelo híbrido**: construir el núcleo (pedidos, precios, KDS, caja, inventario) y **comprar** lo commodity (proveedor OSE/PSE, pasarela de pago, opcionalmente middleware de agregadores). Ver §4. [Recomendación]
- **Riesgo #1:** cumplimiento fiscal en modo offline/contingencia; **riesgo #2:** acceso a APIs de agregadores (requiere convenio de partner); **riesgo #3:** calidad de datos de recetas (sin recetas correctas el costeo y el inventario automático no sirven). [Supuesto basado en experiencia sectorial]

---

## 3. Supuestos globales y nivel de confianza

| Tema | Supuesto adoptado | Etiqueta | Impacto si es falso |
|---|---|---|---|
| País piloto | **Perú** (el requerimiento usa "boletas" y "OSE/PSE", terminología de SUNAT). El diseño es multi-país. | [Supuesto] | Cambia el adaptador fiscal piloto y el catálogo de tipos de documento; no cambia la arquitectura. |
| Escala inicial | 3–10 sucursales, 1–3 marcas, 2–6 terminales POS + 1–3 KDS por sucursal; picos de 300–1.500 pedidos/día por sucursal. | [Supuesto] | Por encima de ~200 sucursales conviene adelantar particionamiento y bus de eventos dedicado. |
| Moneda | Una moneda funcional por país (PEN en piloto); soporte de moneda extranjera sólo para cobro. | [Supuesto] | Multi-moneda contable agrega complejidad al cierre de caja. |
| Hardware | Tablets Android / mini-PC Windows/Linux para POS; impresoras térmicas ESC/POS por red; terminales de tarjeta integrados (no se almacena PAN). | [Supuesto] | Hardware heterogéneo eleva costo de certificación. |
| Pagos con tarjeta | Vía terminal/pasarela certificada; el sistema sólo guarda token/últimos 4 dígitos/autorización. | [Recomendación] | Guardar datos de tarjeta obliga a alcance PCI DSS completo. |
| Facturación | Se usará un proveedor OSE/PSE (o PAC/proveedor tecnológico en otros países); no emisión directa al ente tributario. | [Recomendación] | Emisión directa exige certificación propia y mayor riesgo regulatorio. |
| Agregadores | Al menos un agregador ofrece API de partner en el país; si no, se usa middleware de terceros o tablet del agregador + digitación. | [Requiere validación] | Sin API, la conciliación será manual/por archivos. |
| Equipo | Equipo propio o tercerizado de ~9–11 personas para el MVP. | [Supuesto] | Con menos personas el MVP se alarga proporcionalmente. |

**Nivel de confianza global:** *Alto* en arquitectura, modelo de datos y flujos (patrones probados en POS gastronómicos). *Medio* en estimaciones de esfuerzo (sin datos de volumen reales ni equipo definido). *Bajo-medio* en detalles normativos: las referencias fiscales son ilustrativas y **todas requieren validación** con un contador/tributarista y con el proveedor OSE/PSE elegido. No se verificaron fuentes externas en esta sesión.

---

## 4. Decisión previa: construir vs. comprar vs. híbrido

Criterios ponderados (escala 1–5; 5 = mejor). Pesos y puntajes son [Estimación] para un grupo de 3–10 sucursales multi-marca.

| Criterio | Peso | A. Comprar POS SaaS regional | B. Construir todo | C. Híbrido (núcleo propio + fiscal/pagos/agregadores comprados) |
|---|---|---|---|---|
| Ajuste a multi-formato/multi-marca/dark kitchen | 20% | 2 | 5 | 5 |
| Tiempo a valor | 15% | 5 | 1 | 3 |
| Costo total 3 años (TCO) | 15% | 3 | 2 | 3 |
| Riesgo de cumplimiento fiscal | 15% | 4 | 2 | 4 |
| Control de datos y analítica | 10% | 2 | 5 | 5 |
| Riesgo de ejecución | 10% | 5 | 1 | 3 |
| Diferenciación / escalabilidad del modelo | 15% | 1 | 5 | 4 |
| **Total ponderado** | 100% | **3,05** | **3,10** | **3,90** |

**[Recomendación]** Opción C. Condición de go: que la gerencia confirme que la operación multi-marca/multi-formato es estratégica a 3+ años y que existe presupuesto para un equipo estable. Si el objetivo es sólo "operar ya" en ≤3 sucursales de un solo formato, la opción A es más racional.

---

## 5. Recomendación principal y alternativas

| Opción | Descripción | Cuándo elegirla |
|---|---|---|
| **Principal** | Híbrido: monolito modular NestJS + PostgreSQL en la nube, Edge Hub por sucursal, POS/KDS React empaquetado (Capacitor/Tauri), adaptadores fiscales y de delivery enchufables. | Crecimiento a multi-marca/dark kitchen; necesidad de datos propios. |
| Alternativa 1 | Mismo diseño pero con middleware de agregadores de terceros en vez de integraciones directas. | Si los convenios de API directa demoran >3 meses o se operan 3+ agregadores. |
| Alternativa 2 | POS SaaS comprado + capa propia de datos/BI + integración por API. | Presupuesto o plazo restringidos; operación de formato único. |

## 6. Mejoras opcionales a considerar

1. **Motor de pronóstico de demanda (fase 4):** usar el historial de ventas por franja/canal para sugerir producción (mise en place) y compras; impacto típico esperado en mermas, a medir con piloto A/B. [Recomendación]
2. **"Menú dinámico por capacidad de cocina":** pausar automáticamente productos o canales (p. ej. agregadores) cuando la carga del KDS supera un umbral de tiempo de preparación, protegiendo el SLA del salón. [Recomendación]

## 7. Próximos pasos inmediatos

| # | Acción | Responsable sugerido | Plazo | Métrica de cierre |
|---|---|---|---|---|
| 1 | Responder las preguntas críticas (archivo 09, §5) | Gerencia general + Finanzas | 1 semana | 100% de preguntas "bloqueantes" respondidas |
| 2 | Decisión build/buy/híbrido con TCO real | Gerencia + Finanzas + TI | 2 semanas | Acta de decisión firmada |
| 3 | Seleccionar proveedor OSE/PSE y validar API/sandbox | TI + Contabilidad | 3 semanas | Comprobante de prueba aceptado en sandbox |
| 4 | Solicitar acceso partner a agregadores prioritarios | Comercial / Delivery | 4 semanas | Credenciales sandbox recibidas |
| 5 | Levantamiento de recetas y catálogo de una sucursal piloto | Operaciones + Chef corporativo | 4 semanas | ≥90% de productos con receta y costo |
| 6 | Fase 0 (Discovery técnico y prototipos de pantallas) | Product Owner + Arquitecto | 4 semanas | Backlog MVP validado y prototipo probado con cajeros |
