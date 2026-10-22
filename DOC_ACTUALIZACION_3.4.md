# TEMPLE 3.4.0 · Mi Temple y vista previa freemium

## Cambios
- Mi info se llama Mi Temple. Equipamiento disponible es un desplegable cerrado inicialmente; conserva sus selecciones.
- Cambio de PIN en Mi Temple → Seguridad del perfil. Solicita PIN actual y dos nuevos iguales de 6–12 dígitos. Cambia sal y hash PBKDF2; conserva identidad, espacio de datos, historial y fotografías. Cinco intentos incorrectos bloquean 15 minutos. Las sesiones abiertas con el PIN anterior se bloquean al siguiente control, dentro de 15 segundos. No existe recuperación por correo.
- Se retira Última cafeína del formulario. El campo histórico, si existía, no se elimina del respaldo.
- 39 alimentos añadidos: verduras, ensaladas sin aliño, lechugas, aceitunas escurridas, huevos y preparaciones, carnes y frutas. Preferencias por categorías, orden alfabético y búsqueda que conserva las selecciones ocultas.
- Unidades domésticas para lechugas, aceitunas, ensaladas y huevos. Cuy y liebre se registran crudos, sin huesos; las carnes cocidas y fritas se identifican por preparación.
- Seis referencias ilustradas: peso, abdomen, pecho, brazo, cuádriceps y pantorrilla. Mismo lenguaje gráfico que las guías de ejercicio. Ilustraciones simplificadas; el texto define el punto de medición. Abdomen se sigue a la altura del ombligo, sin confundirlo con cintura clínica.

## Planes de esta versión
| Función | Gratuito | Premium de demostración |
|---|---|---|
| Mi Progreso / Determinación y resumen diario | Sí | Sí |
| Mi Temple, equipo y preferencias | Sí | Sí |
| Registro alimentario del catálogo | Sí | Sí |
| Suplementos y entrenamiento registrado | Sí | Sí |
| Progreso, medidas, fotos y gráfico corporal | No | Sí |
| Menú del día | No | Sí |
| Guías ilustradas de ejercicios | No | Sí |
| Crear o registrar alimentos personalizados | No | Sí |
| Exportar/importar respaldo | Sí | Sí |

Cada perfil comienza Gratis. «Ver Premium» explica las funciones; «Activar demostración Premium» permite probarlas sin cobros. Mi Temple permite volver al plan gratuito. El historial ya guardado no se borra ni se recalculan sus ingestas; los registros personalizados anteriores siguen visibles en su día. Progreso vuelve a estar disponible al activar la demostración.

El plan es una preferencia local por perfil. No es una licencia comercial, ni una compra verificada, ni una protección frente a cambios manuales del almacenamiento. No incluye nube, pagos, cuentas externas, sincronización ni suscripciones. La validación de compras y restauración deberá implementarse con un proveedor antes de vender Premium. La copia de seguridad de salud no incluye PIN ni el estado de demostración Premium; importar un respaldo no desbloquea funciones.

## Publicación en GitHub Pages
1. Exporta tu respaldo desde la versión actual. No borres datos del navegador.
2. Descomprime el ZIP. Sube **todos sus archivos directamente a la raíz** del repositorio Salud-Will, sustituyendo los de la versión anterior. No subas únicamente index.html ni una carpeta contenedora.
3. Espera a que termine la publicación de Pages.
4. Abre https://wilovaldivia.github.io/Salud-Will/verificar-3.4.0.html y comprueba los archivos. Luego actualiza desde esa página.
5. En la aplicación, el pie debe mostrar v3.4.0. Usa la misma URL, navegador y perfil para mantener tus registros.

El manifiesto release-3.4.0.json permite verificar integridad de los archivos. Las imágenes ausentes se avisan y pueden reintentarse; no impiden actualizar los controles. Para abrir todas las guías sin conexión, deja que se descarguen inicialmente con conexión.

## Alimentos y mediciones
Los valores nutricionales nuevos son estimaciones generales por 100 g de porción comestible, no análisis de una receta concreta ni garantía de exactitud. Aceite absorbido, aliño, marcas y cocción cambian el resultado. «Huevos a la inglesa» significa fritos con yema aguada, según la definición confirmada por el usuario; utiliza una estimación de huevo frito con aceite. También están disponibles huevo pasado, duro, escalfado y revuelto con aceite sin leche.

Referencias alimentarias de consulta: [INS — Tablas Peruanas](https://tablasperuanas.ins.gob.pe/), [publicación TPCA](https://www.gob.pe/institucion/ins/informes-publicaciones/4231115-tablas-peruanas-de-composicion-de-alimentos). El registro de cuy crudo utiliza 96 kcal, 19 g proteína, 0.1 g carbohidratos y 1.6 g grasa por 100 g de la tabla INS. El resto de incorporaciones son aproximaciones orientativas; no se presentan como transcripción validada del INS.

Referencias de medición: [NHS England — peso](https://www.england.nhs.uk/long-read/how-to-record-your-weight/), [CDC NHANES — antropometría](https://wwwn.cdc.gov/nchs/data/nhanes/public/2021/manuals/2021-Anthropometry-Procedures-Manual-508.pdf), [Framingham — muslo](https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/document.cgi?phd=4124&study_id=phs000007.v25.p9). Pecho y abdomen usan un protocolo de consistencia para seguimiento personal; no son umbrales diagnósticos.

## Validación
Pruebas de cambio de PIN con datos ficticios, conservación de medidas, aislamiento del plan entre perfiles, restricciones para nuevas carnes, revisión de las 30 guías previas, respaldo con fotos y suplementos, integridad de publicación y funcionamiento de la interfaz local. Sin modificar el PIN del usuario ni publicar en su repositorio.
