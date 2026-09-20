RENACE v3 — Nuevo Inicio

PRINCIPALES NOVEDADES
1. HOY
- Dashboard visual de cumplimiento.
- Semana de 7 días con semáforo de adherencia.
- Lectura automática diaria.
- Informe semanal de los últimos 7 días.

2. COMIDA
- Sueño y agua.
- Registro por alimento y cantidad.
- Cálculo de kcal, proteína, carbohidratos y grasas.
- Base inicial de alimentos.
- Menú sugerido según entrenamiento/descanso y estilo de día.
- Suplementos integrados.

3. ENTRENO
- Programa de 12 semanas.
- Selección de semana actual.
- Rutinas A/B/C/D.
- Registro por ejercicio: series, repeticiones y peso.
- Checklist de cumplimiento.
- Cálculo de volumen y repeticiones.
- Cronómetro de descansos 60/90/120 s.
- RPE, dolor de hombro y notas.

4. PROGRESO
- Peso, abdomen, pecho, brazo, cuádriceps y pantorrilla.
- Gráfico seleccionable.
- Fotos de frente, perfil y espalda guardadas localmente mediante IndexedDB.

5. DATOS
- Perfil, metas, macros, restricciones, preferencias y semana actual.
- Exportar/importar respaldo JSON.
- Migración básica desde RENACE v2.

PUBLICAR EN GITHUB PAGES
- Reemplaza los archivos anteriores del repositorio por:
  index.html
  manifest.json
  sw.js
  logo.svg
  icon-192.png
  icon-512.png
  README.txt
- Commit changes.
- Settings > Pages > Deploy from branch > main / (root).
- Espera el deployment.
- En iPhone, cierra y vuelve a abrir la PWA. Si persiste la versión vieja por caché, elimina el icono y vuelve a añadirla desde Safari.

NOTAS
- Los valores nutricionales precargados son estimaciones generales.
- Para alimentos comerciales, usa la etiqueta nutricional.
- Las fotos se almacenan localmente y no se incluyen en el JSON de respaldo.
