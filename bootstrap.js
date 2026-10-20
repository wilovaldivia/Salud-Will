function bootTemple(){try {
setupUpgrade();setupExperience();setupHistoryAccounts();setupAnatomy();migrateV2();
// Additive, idempotent migration. Original records and original supplement ticks remain untouched.
if(!getJSON(K+'schema4',false)){const p=getJSON(K+'profile',null);if(p){setJSON(K+'pre-v3.0-profile',p);if(!Array.isArray(p.restrictions)){p.legacyRestrictions=p.restrictions;p.restrictions=/lactosa/i.test(p.restrictions||'')?['Sin lactosa']:[]}if(!Array.isArray(p.preferredFoods)){p.legacyPreferredFoods=p.preferredFoods;p.preferredFoods=[]}setJSON(K+'profile',p)}for(const k of Object.keys(localStorage).filter(k=>k.startsWith(K+'day_'))){const d=getJSON(k,{});if(d.shoulderPain&&!d.discomforts){d.discomforts=[{zone:'Hombro izquierdo',type:'Otro',intensity:d.shoulderPain}];setJSON(k,d)}}setJSON(K+'schema4',true)}
initFoods();loadProfile();migrateSummaries();renderAll();setTimer(30);if(!getProfile().onboarded){document.querySelector('[data-tab="datos"]').click();notifyUser('Completa Mi info para personalizar tus metas. Puedes explorar todas las secciones.')}installCollapses();

} catch(error){console.error(error);document.getElementById("statusMessage").textContent="No se pudo completar la carga. Recarga la app o revisa el espacio de almacenamiento del navegador.";}

}
startIdentity().catch(error=>{console.error(error);identityFailure(error)});

// Check updates before authentication, so a cached access error can receive its fix.
if('serviceWorker' in navigator)navigator.serviceWorker.addEventListener('controllerchange',()=>{notifyUser('Actualización preparada. Recarga para usar la nueva versión.');const b=document.createElement('button');b.textContent='Recargar';b.onclick=()=>location.reload();if(document.body.classList.contains('auth-pending')){const notice=document.createElement('p');notice.textContent='Actualización preparada. ';notice.append(b);document.getElementById('identityDialog').append(notice)}else document.getElementById('statusMessage').append(b)});
if('serviceWorker' in navigator && location.protocol!=='file:')navigator.serviceWorker.register('./sw.js').then(reg=>reg.update()).catch(()=>{});

