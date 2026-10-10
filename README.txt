RENACE v3.0 — edición local preparada para evolución comercial

PUBLICAR EN GITHUB PAGES
1. Exporta un respaldo desde la versión anterior antes de reemplazar archivos.
2. Descomprime el ZIP y sube TODOS sus archivos y carpetas al nivel principal del repositorio existente. No subas el ZIP ni una carpeta contenedora.
3. En Settings > Pages, publica desde la rama main y /(root), o conserva tu configuración actual.
4. Abre la misma URL HTTPS y recarga. La actualización de caché sucede tras la descarga de los archivos nuevos.
5. iPhone: Safari > Compartir > Añadir a pantalla de inicio. Android: opción Instalar del navegador compatible.
6. Abre con conexión una vez para preparar el modo sin conexión. No abras index.html como archivo: el service worker necesita HTTPS o localhost.

DATOS Y ACTUALIZACIÓN
Se mantienen las claves renace3_ y la base IndexedDB renace3_photos. La actualización es aditiva: conserva alimentos registrados, medidas y fotografías. Se conserva una copia interna del perfil previo (renace3_pre-v3.0-profile).
Cambiar de URL/origen, navegador o dispositivo NO transfiere datos. Borrar datos del navegador puede eliminarlos. Usa Exportar JSON / Importar JSON; el respaldo nuevo incluye las fotos.
Los usuarios anteriores deben completar edad, sexo, actividad y equipo antes de continuar. Los suplementos históricos permanecen en sus registros, pero NO se convierten automáticamente en planes de suplementos; configura los actuales desde Comida.
Los respaldos v3 pueden importarse: no incluían fotos. La importación combina fechas y reemplaza las coincidentes; exporta primero para poder revertir.
No hay cuenta, cloud, pagos, analítica ni solicitudes a servicios nutricionales externos. El servidor de Pages sirve solo archivos de la app. Los registros permanecen en el navegador; no están cifrados por la aplicación.

NOVEDADES
Mi Progreso: Determinación con score y nivel; barras de energía, proteína, carbohidratos, grasas, sueño y agua; semana lunes-domingo; highlights de series por músculo y alimentos por frecuencia, kcal y proteína.
Comida: sueño/agua en pasos de 0.5; menú semanal antes del registro; catálogo ampliado de 52 alimentos globales/peruanos; gramos, ml y medidas domésticas específicas; etiqueta personalizada reutilizable. Suplementos propios con dosis, unidad, días, horario, tipo, cafeína y notas.
Entreno: semanas 1–12 modifican series, repeticiones, RIR, tempo y descanso. La sesión previa comparable (últimos 30 días), RPE, cumplimiento y molestias moderan la próxima propuesta. El equipo define alternativas. Horario 11–12 y personalizado; descanso 30/45/60/90, sonido y vibración compatibles. Molestias múltiples.
Progreso: controles de medidas ±0.5, Gráfico corporal, fotos e historial conservados.
Mi info: onboarding adulto genérico, objetivos, cálculo metabólico sin somatotipos, restricciones/preferidos múltiples, trabajo/viajes, experiencia, equipo y días disponibles.

ALCANCE DE LAS ESTIMACIONES
Mifflin–St Jeor: 10×kg + 6.25×cm − 5×edad + 5 (masculino) o −161 (femenino). Se multiplica por actividad total 1.2–1.9, que YA incluye entrenamientos. Meta: −15% para perder grasa; +8% para ganar masa; mantenimiento para los demás objetivos. Proteína 1.8 g/kg para perder grasa/recomposición y 1.6 para otros; grasa 28% de energía; carbohidratos como resto. Son reglas de producto orientativas, no una medición metabólica ni prescripción clínica. No es el modelo dinámico NIDDK. No se recalibran automáticamente con la evolución de peso.
El agua y sueño son metas editables. El score promedia nutrición, recuperación, actividad registrada y suplementos programados; sin suplementos ese componente se excluye. No es una medida de salud, eficacia o beneficio muscular. Los músculos reflejan series completadas asignadas al grupo principal, sin inferir resultados fisiológicos.
Catálogo compacto orientativo: conserva la base original y añade valores aproximados. No es una extracción certificada íntegra de USDA/INS ni tiene garantía de 95%. Recetas peruanas y unidades domésticas tienen más variación. Para productos comerciales utiliza sus etiquetas y gramos/ml.
El menú usa restricciones y preferidos, y ofrece opciones transportables según trabajo/viajes. Las cantidades son orientativas, NO optimizadas al objetivo calórico. No garantiza ausencia de trazas/alérgenos. Suplementos con calorías deben registrarse también como alimento; no se suman automáticamente al checklist.
No es un dispositivo médico; uso general para adultos. Antes de publicar comercialmente hace falta una revisión nutricional/de entrenamiento y de accesibilidad.

COMPATIBILIDAD
Sonido requiere iniciar el cronómetro con un gesto del usuario. Vibración depende de dispositivo/navegador (puede no estar disponible en iPhone). En segundo plano el navegador puede suspender alertas; el tiempo mostrado se corrige con el reloj al reanudar. No son notificaciones del sistema.
Datos locales sujetos al espacio disponible del navegador. Respaldos con fotos pueden ser grandes.

DOCUMENTACIÓN
Consulta docs/ACTUALIZACION.md, docs/ARQUITECTURA.md y docs/PRIVACIDAD.md.
