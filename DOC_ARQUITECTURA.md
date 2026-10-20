# Arquitectura y futuro freemium

Aplicación estática sin dependencias de ejecución ni paso de build. Las rutas son relativas para repositorios de GitHub Pages y empaquetado con WebView.

- `core.js`: reglas puras de fechas, estimación metabólica, niveles, prescripción adaptativa y escape de texto. `Renace.capabilities` declara explícitamente cuentas/cloud/pagos/Pro desactivados.
- `app.js`: catálogo base, sesión base, acceso compatible a localStorage, IndexedDB de fotografías, gráfico e historial. `getJSON/setJSON`, `photoDB` son puntos de integración para un futuro almacenamiento nativo.
- `upgrade.js`: interfaz y coordinación de dominios, perfil, alimentos, menú, suplementos, entrenamientos, molestias, migraciones y respaldo. Audio/vibración están aislados en el controlador del cronómetro.
- `sw.js`: caché de recursos propios; funciona bajo HTTPS y conserva cachés ajenas. Precarga el conjunto entero antes de activar la actualización.
- `manifest.json`: identificación, alcance y recursos para instalación PWA.

Identidad, pagos y funciones Pro no están implementados ni simulados. Las funcionalidades actuales siguen disponibles gratis. El esquema de respaldo 4 permite evolucionar datos manteniendo las claves v3. No se incluye configuración de tiendas ficticia ni compilación nativa.

## Próxima fase para tiendas

Empaquetar estos archivos con un contenedor como Capacitor, sustituyendo almacenamiento y avisos por adaptadores nativos cuando sea necesario. Configurar identificadores de app, firma, iconos nativos, restauración de compras y entitlement verificable mediante StoreKit/Google Play Billing. Separar funciones gratuitas/Pro de la interfaz usando una política de capacidades, sin confiar en un flag editable en el dispositivo para compras reales. Si se aprueba cloud en una fase posterior, diseñar sincronización, conflictos y eliminación de cuenta antes de activarla.

Revisar licencias de catálogo e identidad visual, validar cálculos y accesibilidad, realizar pruebas en dispositivos físicos y preparar fichas, política de privacidad, clasificación y declaraciones de datos. El ZIP actual es una PWA para validación; no un binario aprobado para App Store o Play Store.

## Extensiones 3.2

`identity.js`: perfiles locales/PIN y selección de espacio de datos. `account-history.js`: fecha activa, revisiones de suplementos y acceso a guías. `library.js`/`media-data.js`: referencias educativas y créditos, con recursos en `exercises/`. `accounts` sigue desactivado para cuentas externas; `localProfiles` está activado. La sesión local no es un proveedor de autenticación para cloud ni para pagos. Ver ACTUALIZACION_3.2.md.

## Guías 3.3

`anatomy-data.js`, `anatomy.js` y `anatomy.css` sustituyen la ampliación de láminas escaneadas de 3.2.2. `exercises/anatomy/` contiene la colección original uniforme. El catálogo y las guías no alteran las claves de datos ni la prescripción de las sesiones.
