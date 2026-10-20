/* Acknowledge the input, separately from the action's success/failure. */
let feedbackTimer;
function actionFeedback(message){let node=document.getElementById('actionFeedback');if(!node){node=document.createElement('div');node.id='actionFeedback';node.setAttribute('role','status');node.setAttribute('aria-live','polite');document.body.append(node)}node.textContent=message;clearTimeout(feedbackTimer);feedbackTimer=setTimeout(()=>node.textContent='',2600)}
document.addEventListener('click',event=>{const button=event.target.closest('button');if(!button||button.disabled)return;button.classList.add('isPressed');setTimeout(()=>button.classList.remove('isPressed'),350);if(!document.body.classList.contains('auth-pending'))actionFeedback('Pulsado: '+(button.textContent.trim()||button.getAttribute('aria-label')||'acción'));},true);
const notifyBeforeFeedback=notifyUser;
notifyUser=function(message){notifyBeforeFeedback(message);if(!document.body.classList.contains('auth-pending'))actionFeedback(message)};
document.addEventListener('click',event=>{if(event.target.closest('.nav button[data-tab]'))window.scrollTo({top:0,behavior:'auto'})});
