function bootTemple(){try {
setupUpgrade();setupExperience();setupHistoryAccounts();setupAnatomy();setupTemple340();migrateV2();
// Additive, idempotent migration. Original records and original supplement ticks remain untouched.
if(!getJSON(K+'schema4',false)){const p=getJSON(K+'profile',null);if(p){setJSON(K+'pre-v3.0-profile',p);if(!Array.isArray(p.restrictions)){p.legacyRestrictions=p.restrictions;p.restrictions=/lactosa/i.test(p.restrictions||'')?['Sin lactosa']:[]}if(!Array.isArray(p.preferredFoods)){p.legacyPreferredFoods=p.preferredFoods;p.preferredFoods=[]}setJSON(K+'profile',p)}for(const k of Object.keys(localStorage).filter(k=>k.startsWith(K+'day_'))){const d=getJSON(k,{});if(d.shoulderPain&&!d.discomforts){d.discomforts=[{zone:'Hombro izquierdo',type:'Otro',intensity:d.shoulderPain}];setJSON(k,d)}}setJSON(K+'schema4',true)}
initFoods();loadProfile();migrateSummaries();renderAll();setTimer(30);if(!getProfile().onboarded){document.querySelector('[data-tab="datos"]').click();notifyUser('Completa Mi Temple para personalizar tus metas. Puedes explorar todas las secciones.')}installCollapses();refreshMembership();

} catch(error){console.error(error);document.getElementById("statusMessage").textContent="No se pudo completar la carga. Recarga la app o revisa el espacio de almacenamiento del navegador.";}

}
startIdentity().catch(error=>{console.error(error);identityFailure(error)});

