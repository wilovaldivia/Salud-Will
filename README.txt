TEMPLE 3.1 — actualización desde RENACE, 13 de octubre de 2026

PUBLICAR / ACTUALIZAR
1. Desde RENACE exporta un respaldo JSON antes de actualizar.
2. Descomprime el ZIP y sube todos los archivos y docs al nivel principal del mismo repositorio. Mantén la misma URL de GitHub Pages.
3. Conserva Pages publicado desde tu rama y carpeta actuales. No subas el ZIP como único archivo.
4. Abre la URL publicada con conexión. Si aparece «Actualización preparada», pulsa Recargar; se descarga un conjunto completo de archivos para evitar mezclas de versiones.
5. No borres los datos del navegador para actualizar. Si pasas de Brave a Safari, exporta desde Brave e importa desde Safari: cada navegador tiene su propio almacenamiento.
6. iPhone: abre la URL publicada con Safari y usa Compartir → Añadir a pantalla de inicio. El nombre/icono de un acceso ya instalado puede seguir mostrando RENACE hasta recrearlo. Conserva un respaldo antes de cambiar la instalación.
7. El modo sin conexión está disponible tras la primera descarga completa. Abrir index.html como archivo local no instala el service worker; usa HTTPS o un servidor local para comprobar la PWA.

QUÉ CAMBIÓ
- Nombre TEMPLE e isotipo de las tres piedras en el encabezado e iconos. Versión solo al pie con copyright, ayuda, contacto y privacidad.
- Pestañas navegables incluso sin perfil. Generar menú requiere un perfil guardado y muestra indicaciones claras si falta.
- Controles compactos y paneles expandibles/reducibles, con estado recordado en el dispositivo.
- Determinación global: promedio de adherencia de los días con registros reales. Se conserva al cambiar de día; se muestra por separado el cumplimiento de hoy. Puede subir o bajar con los nuevos registros, no es una barra monótona de nivel.
- Resúmenes de días anteriores congelados. Los registros legados reciben una primera estimación usando el perfil disponible durante la migración; no se inventan objetivos históricos desconocidos.
- Se elimina Informe semanal por duplicar Highlights. El único resumen semanal indica músculos trabajados y principales alimentos.
- Recuperación: energía, fatiga, estrés, movilidad y molestias, además de sueño y agua. Los síntomas orientan la sugerencia de sesión; no se usan como penalización en el score.
- Menú diario orientado al objetivo calórico/proteico y al tipo de sesión; porciones aproximadas, restricciones y preferencias. Sus totales se muestran antes de registrar lo realmente consumido. No se suma automáticamente a las ingestas.
- Alimentos agrupados por categorías y ordenados alfabéticamente dentro de cada categoría. Días de suplementos en fila adaptable.
- Entrenamiento sugerido usando grupos principales completados en los dos días anteriores, RPE, fatiga y molestias. Es una recomendación que debes aplicar voluntariamente.
- Descansos 15–60 s, selector en pasos de 5 y atajos 15/30/45/60. No es un límite fisiológico: puedes tomar descansos mayores fuera del contador si lo necesitas.
- Fin de sesión organizado en cuatro bloques, dos por columna, con botón de guardado propio.

DATOS Y CONTACTO
Se conservan las claves renace3_ e IndexedDB renace3_photos: no hay migración a un almacenamiento distinto ni pérdida intencional de historial. No se trasladan datos entre dominios o navegadores sin respaldo.
El contacto no tiene correo ni teléfono inventados. Para activarlo, edita supportEmail y/o supportWhatsApp en config.js (WhatsApp: código de país + número, solo dígitos). La ayuda y privacidad funcionan aunque no haya canal de contacto configurado.
No hay cuentas, cloud, pagos ni analítica. La arquitectura queda preparada para su futura evolución; no es un binario de tienda.

PRUEBAS
Se comprobó el cambio entre pestañas, guardado de perfil y generación de menú diario en Safari de macOS. También se probaron navegación, recuperación, sesión sugerida, guardado y paneles en el navegador integrado. Pruebas automáticas: progreso entre días, sugerencia de descanso ante dolor, evitar grupos principales recientes, cantidades/calorías del menú y restricciones veganas/sin gluten.
No se certifica todavía Safari/Brave de iPhone o vibración/sonido en dispositivos físicos; la incidencia original de tu equipo/URL no pudo reproducirse exactamente. No se afirma que Brave y Safari compartan registros.

ESTIMACIONES
No hay alimentos dirigidos selectivamente a un músculo. El menú distribuye proteína y energía para apoyar recuperación general y entrenamiento, con sus totales aproximados. No es una dieta clínica; confirma etiquetas, trazas y alergias. El historial muscular cuenta series del grupo principal y no mide crecimiento.
El cálculo metabólico mantiene Mifflin–St Jeor con actividad total y objetivo, sin somatotipos ni doble recuento del gasto de entrenamiento. Los alimentos siguen siendo referencias orientativas, no un catálogo certificado con precisión del 95%.

Consulta docs/ACTUALIZACION_TEMPLE.md para el detalle y sugerencias para la siguiente etapa.
