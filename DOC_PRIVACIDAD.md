# Privacidad de TEMPLE 3.2

TEMPLE guarda los registros de salud y los perfiles de acceso en el navegador. Las fotos se guardan en IndexedDB y el resto en localStorage; las sesiones en sessionStorage. No envía estos datos a un servidor de TEMPLE. No incluye cuentas en nube, pagos, anuncios ni analítica. GitHub Pages sirve archivos públicos y gestiona sus propios registros de hosting.

Cada perfil separa sus registros y su base de fotos. El PIN bloquea la interfaz, no cifra el almacenamiento ni acredita identidad. Se conserva una derivación del PIN con sal, no el PIN en texto claro. No hay recuperación por correo. Usa el bloqueo del dispositivo y conserva los respaldos privados.

Los respaldos exportados contienen datos de salud y fotos del perfil activo; no incluyen PIN, registro de accesos o sesiones. Importar combina/reemplaza fechas en el perfil activo. Borrar datos locales desde Mi info elimina los datos de salud de ese perfil, conservando su acceso local; requiere confirmación en la app.

Cada navegador, dominio y dispositivo tiene almacenamiento independiente. Borrar datos del navegador o usar navegación privada puede perder los registros. Las imágenes de ejercicios se sirven con la PWA y funcionan sin conexión después de la descarga inicial. Los enlaces de créditos o contacto abren servicios externos solo cuando el usuario los elige.

Antes de una distribución comercial, completar titular/contacto de soporte y documentos del producto según el alcance real de la publicación.
