# TEMPLE 3.2 — 17 de octubre de 2026

## Acceso local

`identity.js` administra perfiles en `temple_local_identities_v1`. El primer perfil utiliza `renace3_` y `renace3_photos` para adoptar los datos existentes. Los siguientes utilizan `temple_user_<id>_` y una base de fotos propia. La migración v2 se limita al primer espacio. El PIN deriva con Web Crypto PBKDF2 SHA-256, 150.000 iteraciones y sal de 16 bytes. La sesión local en sessionStorage dura 30 minutos. Cinco fallos activan una espera de 15 minutos.

Es un bloqueo de interfaz, sin cifrado de los datos ni verificación externa de identidad. No protege frente a manipulación del almacenamiento o de la aplicación. No se ofrece recuperación por correo. Los respaldos de salud son independientes de los perfiles/PIN y se importan en el perfil activo.

## Fechas y suplementos

`activeDate()` selecciona la fecha de alimentación, recuperación, suplementos y entrenamiento; al entrar se restablece hoy. Se rechazan fechas futuras e inválidas. Medidas y fotografías mantienen la fecha de captura de sus controles originales. Los objetivos históricos ya guardados se conservan al corregir una ingesta; el resumen de ese día se recalcula.

`account-history.js` almacena suplementos por identificador estable y revisiones con `effectiveFrom`. Editar aplica desde hoy y archivar usa `archivedFrom`, sin borrar. Los días guardan una instantánea del plan (`suppPlan`) y de las tomas (`suppDetails`). Los planes históricos guardados no se reescriben con cambios actuales; una fecha sin plan anterior se resuelve mediante las versiones conocidas. La importación conserva revisiones y valida su estructura.

## Guías

`library.js` relaciona el nombre que se muestra según el equipamiento con imágenes y explicaciones locales. Las variantes próximas se señalan como referencia. `exercises/credits.json` y `media-data.js` conservan autor, licencia, origen y ruta de cada imagen. Los dibujos de bandas, movilidad y otras variantes son esquemas originales simplificados. No se descargan imágenes de terceros durante el uso de la app. Los créditos externos solo se abren si el usuario pulsa sus enlaces.

## Validación

Pruebas automatizadas: fecha retrospectiva sin alterar hoy, fechas imposibles/futuras, separación de registros y perfiles, revisiones/archivo de suplementos conservando tomas, cobertura de guías y presencia de archivos, derivación y comparación de PIN, exportación/importación del respaldo con revisiones y fotografías.

Prueba en Brave con perfiles ficticios: alta, rechazo de PIN incorrecto, acceso correcto, comida de ayer separada de hoy, edición de dosis conservando la toma anterior, segundo perfil vacío y guía de flexiones dentro de la app. La primera prueba en el navegador integrado permitió crear perfil, pero un diálogo nativo de confirmación bloqueó la automatización; el cambio de fecha se simplificó y las comprobaciones continuaron en Brave.

Safari/iPhone y Android físicos requieren validar instalación, rendimiento, vibración y audio en el dispositivo. Esta actualización no afirma una prueba nueva de extremo a extremo en Safari ni aprobación de tiendas.
