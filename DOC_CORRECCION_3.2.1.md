# Corrección 3.2.1

Ver README.txt para la ruta actualizar.html que evita depender del acceso de la versión anterior. No elimina cachés de registros ni localStorage/IndexedDB; el service worker conserva su política de sustituir exclusivamente recursos estáticos de la app.

El formulario ya no depende del objeto implícito event de un atributo HTML. El manejador registrado recibe el evento y valida campos sin silencios de validación nativa. El botón muestra progreso y bloquea envíos simultáneos. La sesión tolera sessionStorage bloqueado usando memoria hasta la recarga. Los errores iniciales tienen diálogo visible, mientras que antes el aviso podía quedar dentro del contenido oculto por auth-pending.

No cambia la derivación de PIN ni el esquema de perfiles, fotos, registros o suplementos. Sin la URL o mensaje del fallo reportado no se confirmó una causa única. La corrección combina los defectos verificables con mejoras de diagnóstico.

Los controles usan minmax(0,1fr), ajuste de línea y rejillas móviles; las etiquetas de series dejan de ocupar una cuarta columna no reducible. Cada botón responde visualmente a pulsación/foco. Los avisos de interacción no equivalen a confirmación de guardado.

Se verificó también la página actualizar.html en Brave: instalación desde la pantalla bloqueada y reentrada con el mismo perfil/PIN. Navegar entre secciones vuelve al inicio de la pantalla para evitar conservar una posición desplazada de otro apartado.
