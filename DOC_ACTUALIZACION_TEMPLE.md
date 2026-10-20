# TEMPLE 3.1 — 13 de octubre de 2026

El isotipo seleccionado se adaptó a fondo transparente con la herramienta de imágenes, preservando las tres formas y la paleta. El PNG se utilizó en el encabezado y se exportó a tamaños 192/512 para instalación. Los recursos y el nombre del manifiesto se actualizaron; el esquema de datos original se conserva.

## Compatibilidad y menús

La versión previa deshabilitaba las pestañas hasta completar el onboarding. Un navegador sin los datos del otro empezaba con el perfil vacío. Ahora todas las pestañas responden desde el principio. Los cálculos que requieren perfil explican el requisito y llevan a Mi info.
Se elimina la dependencia de Array.at en el gráfico y se añade alternativa a crypto.randomUUID para identificadores. Las etiquetas de selectores se vinculan con sus controles. El acceso al almacenamiento muestra un aviso si no puede guardar. Los paneles usan details/summary nativos. El service worker precarga todo el conjunto de archivos de la versión y permite una recarga explícita al activar una actualización.
Estas correcciones se verificaron en Safari de macOS. No se conoce la versión del iPhone ni se accedió a la URL publicada del usuario; no se atribuye la incidencia original a una única causa demostrada.

## Progreso y recuperación

El score global promedia únicamente días con alimentos, sueño/agua o registros de sesión. Crear un menú o registrar solo estrés/fatiga no incorpora un día vacío al promedio. Cada día guarda su resumen; al pasar a una fecha nueva se mantiene el anterior. Los días legados sin resumen se evalúan una vez con el perfil disponible y se congelan.
El score no equivale a salud ni mejora corporal. No es necesariamente creciente. Los síntomas son señales para recuperar, no incumplimientos.
La sugerencia considera los dos días previos y el solapamiento de grupos principales; abdomen/movilidad no bloquean por sí solos todas las sesiones. Es conservadora ante RPE ≥9, molestias ≥4/10 o fatiga actual ≥7/10. No diagnostica lesiones ni garantiza recuperación fisiológica.

## Menú

Cuatro comidas con proteína, fuente de carbohidratos, frutas/verduras y grasas según metas. Se ajusta el conjunto al objetivo energético dentro de límites de porción; se muestran los macros y la desviación relevante. Se filtran restricciones y se priorizan preferidos compatibles. La selección automática usa la sesión guardada de hoy. No se inventa una acción específica sobre pecho/bíceps/piernas según el alimento.
Los valores, unidades domésticas y reglas son estimaciones de producto, no prescripciones clínicas ni una garantía de ausencia de alérgenos.
Referencias: [ACSM sobre nutrición deportiva](https://acsm.org/ten-sports-nutrition-facts/) y [Mifflin–St Jeor](https://pubmed.ncbi.nlm.nih.gov/2305711/).

## Próximo nivel sugerido

1. Historial por ejercicio: cargas, repeticiones, mejores marcas y evolución, para sustituir recomendaciones generales por progresión personal.
2. Editor de menú con sustituciones equivalentes y registro por comida, para personalizar porciones sin reconstruir todo el menú.
3. Calendario y revisión de objetivos con tendencias de medidas y adherencia, mostrando siempre por qué se propone un cambio.

## Estructura

core.js: reglas base; app.js: persistencia, catálogo, fotos y gráfico; upgrade.js: módulos v3 compatibles; experience.js: cambios TEMPLE; bootstrap.js: inicialización/migración; config.js: canales de soporte; experience.css: interfaz compacta. No se incorporaron servicios externos.
