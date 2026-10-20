# Actualización v3.0 — 10 de octubre de 2026

Se implementaron los cambios solicitados sobre el ZIP original, conservando su marca, diseño oscuro/salvia, historial y fotografías. La lógica se separó del HTML. Nuevos usuarios no reciben datos personales ni suplementos.

## Migración

La primera ejecución guarda una copia del perfil anterior, convierte restricciones legadas compatibles y transforma el dolor de hombro en una molestia múltiple. Los registros históricos no se borran. La migración v2 solo copia claves cuando no existe ya el destino v3. El onboarding pide completar datos faltantes; no inventa edad/sexo/equipo para perfiles antiguos. Las fotos mantienen la misma base.

## Verificación

Pruebas automatizadas del respaldo con fotos (exportación, importación y rechazo de imágenes inválidas) y de fechas locales, inicio lunes/domingo, cálculo metabólico masculino/femenino, objetivos, diferenciación semanas 1/10, descarga 7, adaptación por RPE/cumplimiento y niveles.
Pruebas de navegador con datos ficticios: onboarding, metas, selección de sesión B, cambio S1/S10, registro de ejercicio, cálculo de dos huevos como unidades, sueño/agua, menú semanal, suplementos propios, múltiples molestias, mediciones, persistencia y carga offline.

Sonido/vibración y rendimiento en iPhone/Android físicos requieren validación del usuario; la vista previa de escritorio no certifica estas capacidades. Los valores de alimentos son estimados, no un catálogo clínicamente certificado.

## Referencias de método y fuentes para ampliación

- Mifflin y colaboradores, ecuación original: https://pubmed.ncbi.nlm.nih.gov/2305711/
- USDA FoodData Central (fuente para futura homologación del catálogo): https://fdc.nal.usda.gov/download-datasets/
- Tablas Peruanas del INS (fuente para futura homologación): https://tablasperuanas.ins.gob.pe/

Los factores de objetivos, score y adaptación son reglas explícitas de esta implementación. Estas referencias no constituyen una validación de todo el catálogo ni de los menús.

La descarga del JSON no pudo verificarse de extremo a extremo en el navegador de vista previa: la espera del evento de descarga agotó su tiempo. La construcción e importación del respaldo se comprobaron con pruebas automatizadas.
