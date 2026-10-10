/* Pure domain rules. Native wrappers can replace adapters without changing rules. */
const Renace = {
 version:'3.0.0', schema:4,
 capabilities:{local:true,accounts:false,cloud:false,payments:false,pro:false},
 localDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`},
 week(date=new Date()){const start=new Date(date.getFullYear(),date.getMonth(),date.getDate());start.setDate(start.getDate()-(start.getDay()+6)%7);return Array.from({length:7},(_,i)=>{const d=new Date(start);d.setDate(d.getDate()+i);return this.localDate(d)})},
 metabolic(p){const bmr=10*p.weight+6.25*p.height-5*p.age+(p.sex==='male'?5:-161),tdee=bmr*Number(p.activity),factor=p.goal==='Perder grasa'?.85:p.goal==='Ganar masa muscular'?1.08:1,kcal=Math.round(tdee*factor),protein=Math.round(p.weight*(p.goal==='Perder grasa'||p.goal==='Recomposición corporal'?1.8:1.6)),fat=Math.round(kcal*.28/9),carbs=Math.max(0,Math.round((kcal-protein*4-fat*9)/4));return {bmr:Math.round(bmr),tdee:Math.round(tdee),kcalTrain:kcal,kcalRest:kcal,protein,fat,carbTrain:carbs,carbRest:carbs,water:Math.round(p.weight*.03*2)/2,sleepHours:8}},
 level(score){return score>=95?'Imparable':score>=85?'Determinado':score>=70?'Consistente':score>=50?'Construyendo':'Reinicio'},
 prescription(week,previous,experience='Principiante'){const sets=[2,2,3,3,3,4,2,3,3,4,4,2][week-1],reps=[10,12,10,12,12,10,8,10,12,10,10,12][week-1];let delta=0,reason='Adaptación según semana';if(previous){const done=Object.values(previous.exercises||{}).filter(x=>x&&typeof x==='object'),ratio=done.length?done.filter(x=>x.done).length/done.length:0;if(previous.rpe>=9||ratio<.6||(previous.discomforts||[]).some(x=>x.intensity>=4)){delta=-1;reason='Reducido por esfuerzo, molestias o cumplimiento anterior'}else if(previous.rpe&&previous.rpe<=7&&ratio>=.9){reason='Buen cumplimiento: añade una repetición';delta=1}}return {sets:Math.max(1,sets-(delta<0?1:0)-(experience==='Principiante'&&week>2&&week!==7?1:0)),reps:Math.max(6,reps+(delta>0&&week!==7?1:0)),rir:week===7?4:week<3?3:2,tempo:week>=8?'3–1–1':'2–0–1',rest:week>=5&&week!==7?45:60,reason}},
 escape(x){return String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
};
if(typeof module!=='undefined')module.exports=Renace;
