
const K='renace3_';
const isoToday=()=>Renace.localDate(new Date());
const getJSON=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const setJSON=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const value=id=>document.getElementById(id).value;
const num=id=>+value(id)||null;

const foodDB=[
 {n:"Arroz blanco cocido",k:130,p:2.7,c:28.2,f:.3},{n:"Papa cocida",k:87,p:1.9,c:20.1,f:.1},{n:"Camote cocido",k:90,p:2.0,c:20.7,f:.15},
 {n:"Avena",k:389,p:16.9,c:66.3,f:6.9},{n:"Pan integral",k:247,p:13,c:41,f:4.2},{n:"Plátano",k:89,p:1.1,c:22.8,f:.3},
 {n:"Manzana",k:52,p:.3,c:13.8,f:.2},{n:"Palta",k:160,p:2,c:8.5,f:14.7},{n:"Huevo entero",k:143,p:12.6,c:.7,f:9.5},
 {n:"Claras de huevo",k:52,p:10.9,c:.7,f:.2},{n:"Pechuga de pollo cocida",k:165,p:31,c:0,f:3.6},{n:"Carne magra cocida",k:200,p:26,c:0,f:10},
 {n:"Pavo cocido",k:135,p:29,c:0,f:1.6},{n:"Atún al agua escurrido",k:116,p:25.5,c:0,f:.8},{n:"Pescado blanco cocido",k:120,p:24,c:0,f:2.5},
 {n:"Salmón cocido",k:208,p:20,c:0,f:13},{n:"Quinua cocida",k:120,p:4.4,c:21.3,f:1.9},{n:"Lentejas cocidas",k:116,p:9,c:20,f:.4},
 {n:"Yogur alto en proteína sin lactosa",k:70,p:10,c:5,f:1},{n:"Leche sin lactosa",k:60,p:3.2,c:4.8,f:3.2},{n:"Almendras",k:579,p:21.2,c:21.6,f:49.9},
 {n:"Personalizado",k:0,p:0,c:0,f:0}
];

const workouts={
 A:[
  {n:"Calentamiento hombro/escápula",target:"5–7 min",sets:1,reps:1},
  {n:"Flexiones",target:"4 × 8–20",sets:4,reps:12},
  {n:"Press piso mancuernas",target:"4 × 10–15",sets:4,reps:12},
  {n:"Flexiones pies elevados",target:"3 × 8–15",sets:3,reps:10},
  {n:"Press cerrado",target:"3 × 10–15",sets:3,reps:12},
  {n:"Flexiones cerradas",target:"3 × 8–15",sets:3,reps:10},
  {n:"Crunch inverso",target:"3 × 12–20",sets:3,reps:15}
 ],
 B:[
  {n:"Calentamiento general",target:"5 min",sets:1,reps:1},
  {n:"Sentadilla goblet",target:"4 × 12–20",sets:4,reps:15},
  {n:"Peso muerto rumano",target:"4 × 10–15",sets:4,reps:12},
  {n:"Bulgarian split squat",target:"3 × 8–12/pierna",sets:3,reps:10},
  {n:"Puente de glúteo",target:"3 × 15–20",sets:3,reps:15},
  {n:"Pantorrillas",target:"4 × 15–25",sets:4,reps:20},
  {n:"Plancha",target:"3 × 30–60 s",sets:3,reps:45},
  {n:"Crunch inverso",target:"3 × 12–20",sets:3,reps:15}
 ],
 C:[
  {n:"Calentamiento hombro/escápula",target:"5–7 min",sets:1,reps:1},
  {n:"Remo a una mano",target:"4 × 10–15",sets:4,reps:12},
  {n:"Remo con barra",target:"4 × 10–15",sets:4,reps:12},
  {n:"Curl mancuernas",target:"4 × 8–15",sets:4,reps:10},
  {n:"Curl martillo",target:"3 × 8–12",sets:3,reps:10},
  {n:"Curl barra",target:"3 × 10–15",sets:3,reps:12},
  {n:"Flexiones escapulares",target:"3 × 12–15",sets:3,reps:12},
  {n:"Plancha lateral",target:"3 × 30–45 s/lado",sets:3,reps:35}
 ],
 D:[
  {n:"Calentamiento general",target:"5 min",sets:1,reps:1},
  {n:"Flexiones lentas",target:"4 × 10–20",sets:4,reps:12},
  {n:"Press piso mancuernas",target:"3 × 12–20",sets:3,reps:15},
  {n:"Bulgarian split squat",target:"3 × 10–15/pierna",sets:3,reps:12},
  {n:"Peso muerto rumano",target:"3 × 12–15",sets:3,reps:12},
  {n:"Curl bíceps",target:"3 × 10–15",sets:3,reps:12},
  {n:"Flexiones cerradas",target:"3 × 8–15",sets:3,reps:10},
  {n:"Core",target:"3 series",sets:3,reps:15}
 ]
};

const weekPlans=[
 "Adaptación técnica. Deja 2–3 repeticiones en reserva.",
 "Adaptación técnica. Mejora rango de movimiento y control.",
 "Progresión. Añade 1–2 repeticiones donde puedas.",
 "Progresión. Mantén técnica y aumenta volumen gradualmente.",
 "Progresión. Busca el extremo alto de cada rango.",
 "Consolidación. Intenta superar registros previos sin dolor.",
 "Descarga. Reduce 30–40% de series/repeticiones.",
 "Segundo bloque. Retoma progresión con buena técnica.",
 "Sobrecarga. Más repeticiones, pausa o tempo lento.",
 "Sobrecarga. Mejora volumen total de trabajo.",
 "Pico de bloque. Busca tus mejores series con control.",
 "Evaluación. Repite medidas, fotos y compara rendimiento."
];

function getProfile(){return {...defaultProfile(),...getJSON(K+'profile',{})}}
function dayData(date=isoToday()){return getJSON(K+'day_'+date,{sleep:null,water:null,foods:[],supp:{},workout:"",trainingTime:"am",exercises:{},rpe:null,shoulderPain:null,trainingNotes:""})}
function saveDay(d,date=isoToday()){setJSON(K+'day_'+date,d);renderAll()}

function removeFood(id){const d=dayData();d.foods=d.foods.filter(x=>x.id!==id);saveDay(d)}
function totals(d){return d.foods.reduce((a,x)=>({kcal:a.kcal+x.kcal,protein:a.protein+x.protein,carbs:a.carbs+x.carbs,fat:a.fat+x.fat}),{kcal:0,protein:0,carbs:0,fat:0})}

function weekPhase(w){if(w<=2)return"Adaptación";if(w<=6)return"Progresión";if(w===7)return"Descarga";if(w<=11)return"Segundo bloque";return"Evaluación"}
let timerSec=90,timerRun=false,timerInt=null;
function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function setTimer(s){timerSec=s;timerRun=false;clearInterval(timerInt);document.getElementById('timerTxt').textContent=fmt(timerSec);document.getElementById('timerBtn').textContent='Iniciar'}
function pastDates(n){const a=[];for(let i=n-1;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);a.push(Renace.localDate(d))}return a}
function renderProgress(){
 const a=getJSON(K+'measurements',[]),metric=value('chartMetric'),labels={abdomen:"Abdomen",chest:"Pecho",arm:"Brazo",quad:"Cuádriceps",calf:"Pantorrilla",weight:"Peso"},valid=a.filter(x=>x[metric]!=null);
 drawChart(valid.map(x=>({d:x.date,v:x[metric]})),labels[metric]);let txt="Aún no hay suficientes registros.";
 if(valid.length>=2){const diff=(valid.at(-1)[metric]-valid[0][metric]).toFixed(1);txt=`Cambio de ${labels[metric].toLowerCase()}: ${diff>0?'+':''}${diff} ${metric==='weight'?'kg':'cm'}.`}
 document.getElementById('trendText').textContent=txt;
 document.getElementById('measureHistory').innerHTML=a.length?'<table><tr><th>Fecha</th><th>kg</th><th>Abd.</th><th>Pecho</th><th>Brazo</th><th>Quad.</th><th>Pant.</th></tr>'+a.slice().reverse().map(x=>`<tr><td>${x.date}</td><td>${x.weight??'—'}</td><td>${x.abdomen??'—'}</td><td>${x.chest??'—'}</td><td>${x.arm??'—'}</td><td>${x.quad??'—'}</td><td>${x.calf??'—'}</td></tr>`).join('')+'</table>':'<div class="small">Sin mediciones.</div>';
}
function drawChart(vals,label){
 const c=document.getElementById('chart'),ctx=c.getContext('2d');ctx.clearRect(0,0,c.width,c.height);ctx.fillStyle="#111517";ctx.fillRect(0,0,c.width,c.height);
 if(vals.length<2){ctx.fillStyle="#99a5aa";ctx.font="17px sans-serif";ctx.fillText("Registra al menos 2 mediciones de "+label,32,110);return}
 const ys=vals.map(x=>x.v),min=Math.min(...ys)-1,max=Math.max(...ys)+1,p=42;ctx.strokeStyle="#455056";ctx.beginPath();ctx.moveTo(p,p);ctx.lineTo(p,c.height-p);ctx.lineTo(c.width-p,c.height-p);ctx.stroke();
 ctx.strokeStyle="#c8d5c1";ctx.lineWidth=3;ctx.beginPath();vals.forEach((x,i)=>{const xx=p+i*(c.width-2*p)/(vals.length-1),yy=c.height-p-(x.v-min)*(c.height-2*p)/(max-min);i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy)});ctx.stroke();
}

let dbPromise=null;
function photoDB(){
 if(dbPromise)return dbPromise;
 dbPromise=new Promise((resolve,reject)=>{const req=indexedDB.open('renace3_photos',1);req.onupgradeneeded=e=>{const db=e.target.result;if(!db.objectStoreNames.contains('photos'))db.createObjectStore('photos',{keyPath:'id'})};req.onsuccess=e=>resolve(e.target.result);req.onerror=e=>reject(e.target.error)});
 return dbPromise;
}
function fileToDataURL(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}
async function savePhotos(){
 const inputs={front:'photoFront',side:'photoSide',back:'photoBack'},items=[];
 for(const [type,id] of Object.entries(inputs)){const f=document.getElementById(id).files[0];if(f)items.push({type,data:await fileToDataURL(f)})}
 if(!items.length){alert("Selecciona al menos una foto.");return}
 const db=await photoDB(),tx=db.transaction('photos','readwrite'),store=tx.objectStore('photos');
 items.forEach(x=>store.put({id:isoToday()+'_'+x.type,date:isoToday(),type:x.type,data:x.data}));tx.oncomplete=()=>renderPhotos();
}
async function renderPhotos(){
 const db=await photoDB(),tx=db.transaction('photos','readonly'),req=tx.objectStore('photos').getAll();
 req.onsuccess=()=>{const a=req.result.sort((x,y)=>y.date.localeCompare(x.date)).slice(0,9);document.getElementById('photoGallery').innerHTML=a.length?a.map(x=>`<div class="photoCard"><img src="${x.data}"><span>${x.date} · ${x.type}</span></div>`).join(''):'<div class="small">Sin fotos guardadas.</div>'}
}

function migrateV2(){
 if(localStorage.getItem(K+'migrated'))return;
 const p2=getJSON('renace_profile',null); if(p2&&!localStorage.getItem(K+'profile'))setJSON(K+'profile',{...defaultProfile(),...p2});
 const m2=getJSON('renace_measurements',null); if(m2&&!localStorage.getItem(K+'measurements'))setJSON(K+'measurements',m2);
 for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith('renace_day_')){const dt=k.replace('renace_day_','');const d=getJSON(k,{});if(!localStorage.getItem(K+'day_'+dt))setJSON(K+'day_'+dt,{...dayData(dt),...d})}}
 setJSON(K+'migrated',true);
}
function renderAll(){renderFood();renderWorkout();renderPlan();renderProgress();renderToday();renderPhotos()}
document.querySelectorAll('.nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.nav button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.section').forEach(x=>x.classList.remove('active'));document.getElementById(b.dataset.tab).classList.add('active');if(b.dataset.tab==='progreso'){renderProgress();renderPhotos()}});
