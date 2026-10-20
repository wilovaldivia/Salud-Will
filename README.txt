TEMPLE 3.3.1 — corrección de publicación en GitHub Pages

DIAGNÓSTICO CONFIRMADO EN wilovaldivia/Salud-Will
Los archivos principales publicados coinciden con la entrega 3.3.0. No se publicó exercises/anatomy/: faltaban las diez láminas. La caché anterior exigía todos esos archivos para instalarse y podía conservar la versión anterior al fallar una imagen. Los cambios de botones sí estaban en el repositorio, pero un navegador podía seguir usando su caché previa.

ESTE ZIP NO REQUIERE SUBIR CARPETAS
Todos los archivos están en un solo nivel, incluidas las diez imágenes anatomy-01.png a anatomy-10.png. No reconstruyas la carpeta exercises. No subas el ZIP sin descomprimir.

PASOS PARA TU PUBLICACIÓN
1. Descomprime este ZIP y entra al repositorio wilovaldivia/Salud-Will.
2. Add file / Upload files: selecciona TODOS los archivos descomprimidos y confirma el cambio en la raíz, donde está index.html. Reemplaza los existentes. Los PNG nuevos también deben quedar junto a index.html.
3. Espera a que GitHub Pages termine de publicar el commit.
4. Abre https://wilovaldivia.github.io/Salud-Will/actualizar-3.3.1.html
5. Pulsa «1. Comprobar publicación». Todos los archivos deben ser correctos. Si alguno falta o es distinto, la lista indica su nombre.
6. Pulsa «2. Actualizar conservando mis datos», espera confirmación y «3. Abrir TEMPLE actualizado».
7. Verifica v3.3.1 al pie y «Ver todas las guías ilustradas» en Entreno.
No borres datos de Brave ni cambies PIN o perfiles. Mantén la misma dirección y navegador.

CORRECCIONES
- Imágenes al mismo nivel que la app para que el selector de archivos de GitHub no omita subcarpetas.
- Scripts/estilos con identificador de versión para evitar mezclar versiones por caché.
- Comprobador de publicación: detecta archivos ausentes o diferentes mediante SHA-256, antes de instalar.
- Navegación con prioridad a la versión de red y respaldo sin conexión.
- Instalación de los controles separada de las láminas: una imagen ausente ya no impide actualizar botones y acceso.
- Avisos visibles si falla una actualización o faltan guías. Las láminas se descargan en segundo plano para usar sin conexión cuando finaliza la descarga.
- Mantiene el estado pulsado de los botones, los ajustes móviles de 3.2.1 y las 30 variantes ilustradas de 3.3.

DATOS
La corrección solo cambia archivos estáticos y sus cachés. No cambia el esquema de perfiles/PIN, registros, suplementos, medidas ni fotos. No hay nube, pagos ni sincronización de datos personales.
