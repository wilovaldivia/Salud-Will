# Auditoría de la publicación de TEMPLE

URL revisada: https://wilovaldivia.github.io/Salud-Will/
Repositorio: https://github.com/wilovaldivia/Salud-Will
Árbol revisado: 5a5df62d18202001d2d548b30975228893dfc4b6, rama main.

Los blobs de los archivos presentes coincidían exactamente con el ZIP entregado de 3.3.0 (comparación SHA de objetos Git). No existían exercises/anatomy/ ni sus diez PNG; tampoco se subieron docs/, cuyo contenido no era necesario para ejecutar las guías. El index publicado sí cargaba anatomy.js, anatomy-data.js, anatomy.css y feedback.js.

El service worker anterior utilizaba cache.addAll para el shell y todas las imágenes en una sola instalación; cualquier 404 abortaba la actualización. La navegación y los recursos se resolvían primero desde la caché anterior. Esto explica que un navegador previamente usado pudiera seguir mostrando la app anterior. La ausencia de las láminas se comprobó directamente en el árbol del repositorio; el estado de la caché del dispositivo del usuario no fue inspeccionado.

Se preparó un paquete plano 3.3.1 con verificación de publicación, actualización accesible sin cuenta y carga independiente de imágenes. Este paquete aún debe publicarse: la auditoría no realizó escrituras en el repositorio.

## Prueba de actualización realizada

En un servidor local con la misma subruta /Salud-Will/: se instaló 3.2.1, se creó un perfil ficticio y una ingesta; después se sirvió 3.3.0 sin exercises/anatomy/. Al recargar permanecieron v3.2.1 y el catálogo nuevo no apareció. Se sirvió el paquete plano 3.3.1, se abrió actualizar-3.3.1.html, se verificaron los 37 archivos requeridos y se instaló. La app mostró v3.3.1 y las ilustraciones, y conservó perfil e ingesta.

Pruebas de la caché: instalación de controles con diez imágenes ausentes, recuperación de las imágenes al reintentar, confirmación de versión activa y rechazo de un shell incompleto. Regresión de rutinas/guías, registros, perfiles, suplementos y respaldo.
