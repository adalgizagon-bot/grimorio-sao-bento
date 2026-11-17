import './pix.css';

const SITE_KEY=import.meta.env.VITE_TURNSTILE_SITE_KEY || '';
const formatBRL=value=>Number(value).toLocaleString('pt-BR',{style:'currency',currency:'BRL',minimumFractionDigits:2,maximumFractionDigits:2});
async function loadPriceFromCakto(){
  try {
    const response=await fetch('/api/pix/config',{cache:'no-store'});
    const data=await response.json();
    if(data.available && Number(data.amount)>0){
      document.querySelector('#initialPrice').textContent=formatBRL(data.amount);
    }
  }catch { /* A cobrança ainda pode ser gerada; o valor final será mostrado antes do pagamento. */ }
}
const form=document.querySelector('#pixForm');
const submit=document.querySelector('#generatePix');
const feedback=document.querySelector('#formFeedback');
const qrPanel=document.querySelector('#pixPanel');
const formPanel=document.querySelector('#formPanel');
let turnstileToken='';
let widgetId=null;
let orderToken='';
let pollTimer=null;
let expiresAt=null;
let processing=false;
let requestId=crypto.randomUUID();

function inform(message,error=false){
  feedback.textContent=message;
  feedback.classList.toggle('is-error',error);
}
function renderQr(code){
  const target=document.querySelector('#qrCode');
  target.replaceChildren();
  if(typeof window.QRCode==='function'){
    new window.QRCode(target,{text:code,width:220,height:220,correctLevel:window.QRCode.CorrectLevel.M});
  }else{
    target.textContent='Use o código Pix copia e cola abaixo.';
  }
}
function formatDate(value){
  if(!value)return null;
  const d=new Date(String(value).replace(' ','T'));
  return Number.isFinite(d.getTime())?d:null;
}
function updateCountdown(){
  if(!expiresAt)return true;
  const remaining=Math.ceil((expiresAt.getTime()-Date.now())/1000);
  const el=document.querySelector('#expires');
  if(remaining<=0){
    el.textContent='Esse Pix expirou. Gere um novo código ou peça ajuda pelo WhatsApp.';
    return false;
  }
  const m=Math.floor(remaining/60),s=String(remaining%60).padStart(2,'0');
  el.textContent='Validade do Pix: '+m+':'+s;
  return true;
}
function nextStatusPoll(ms=7000){
  clearTimeout(pollTimer);
  pollTimer=setTimeout(checkPayment,ms);
}
async function checkPayment(){
  if(!orderToken || !updateCountdown())return;
  if(document.hidden){nextStatusPoll(10000);return;}
  try{
    const resp=await fetch('/api/pix/status?token='+encodeURIComponent(orderToken),{cache:'no-store'});
    if(!resp.ok)throw new Error('temporarily unavailable');
    const data=await resp.json();
    if(data.status==='paid'){
      clearTimeout(pollTimer);
      document.querySelector('#paymentStatus').classList.add('is-paid');
      document.querySelector('#paymentStatus').textContent='✓ Pagamento confirmado pela Cakto!';
      document.querySelector('#pixFeedback').textContent='Confira as instruções de acesso no e-mail cadastrado. Se não receber, fale com nosso suporte.';
      document.querySelector('#newPix').hidden=true;
      return;
    }
    if(data.status==='canceled'){
      document.querySelector('#paymentStatus').textContent='O pedido foi cancelado. Gere um novo Pix ou fale com o suporte.';
      return;
    }
  }catch{
    document.querySelector('#pixFeedback').textContent='Ainda não foi possível consultar a Cakto. A confirmação será verificada novamente.';
  }
  nextStatusPoll();
}
function resetCaptcha(){
  turnstileToken='';
  submit.disabled=true;
  if(window.turnstile && widgetId!==null){try{window.turnstile.reset(widgetId);}catch{}}
}
function loadTurnstile(){
  if(!SITE_KEY){
    inform('Pagamento Pix indisponível no momento. Fale com o suporte pelo WhatsApp.',true);
    return;
  }
  const tag=document.createElement('script');
  tag.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  tag.async=true;
  tag.onload=()=>{
    if(!window.turnstile){inform('A verificação de segurança não carregou.',true);return;}
    widgetId=window.turnstile.render('#turnstile',{
      sitekey:SITE_KEY,theme:'light',language:'pt-BR',
      callback:(token)=>{turnstileToken=token;submit.disabled=false;inform('Pronto! Você pode gerar seu Pix.');},
      'expired-callback':()=>{turnstileToken='';submit.disabled=true;inform('Confirme novamente a verificação de segurança.');},
      'error-callback':()=>{turnstileToken='';submit.disabled=true;inform('Falha na verificação. Atualize a página ou fale com nosso suporte.',true);}
    });
  };
  tag.onerror=()=>inform('Não foi possível carregar a verificação. Fale com o suporte pelo WhatsApp.',true);
  document.head.append(tag);
}
form.addEventListener('submit',async ev=>{
  ev.preventDefault();
  if(processing || !turnstileToken)return;
  if(!form.reportValidity())return;
  const body={
    name:document.querySelector('#customerName').value,
    cpf:document.querySelector('#customerCpf').value,
    phone:document.querySelector('#customerPhone').value,
    email:document.querySelector('#customerEmail').value,
    requestId,
    turnstileToken
  };
  processing=true;
  submit.disabled=true;
  inform('Gerando seu Pix pela Cakto...');
  try{
    const response=await fetch('/api/pix/create',{
      method:'POST',headers:{'Content-Type':'application/json'},
      cache:'no-store',body:JSON.stringify(body)
    });
    const data=await response.json();
    if(!response.ok || !data.pixCode || !data.orderToken || !Number.isFinite(Number(data.amount)) || Number(data.amount)<=0)
      throw new Error(data.error||'Não foi possível gerar o Pix.');
    document.querySelector('#finalPixAmount').textContent=formatBRL(data.amount);
    orderToken=data.orderToken;
    expiresAt=formatDate(data.expirationDate);
    document.querySelector('#pixCode').value=data.pixCode;
    renderQr(data.pixCode);
    formPanel.hidden=true;
    qrPanel.hidden=false;
    if(window.parent!==window) window.parent.postMessage({type:'grimorio-pix-iframe-scroll'},window.location.origin);
    window.scrollTo({top:0,behavior:'smooth'});
    updateCountdown();
    nextStatusPoll();
  }catch(e){
    inform(e.message||'Erro ao gerar Pix. Fale com o suporte pelo WhatsApp.',true);
    resetCaptcha();
  }finally{processing=false;}
});
document.querySelector('#copyPix').addEventListener('click',async()=>{
  const code=document.querySelector('#pixCode').value;
  try{
    await navigator.clipboard.writeText(code);
    document.querySelector('#copyPix').textContent='✓ PIX COPIADO! ABRA SEU BANCO';
  }catch{
    const input=document.querySelector('#pixCode');
    input.focus();input.select();
    document.querySelector('#pixFeedback').textContent='Selecione e copie o código Pix acima.';
  }
});
document.querySelector('#newPix').addEventListener('click',event=>{
  event.preventDefault();
  clearTimeout(pollTimer);
  orderToken='';
  expiresAt=null;
  requestId=crypto.randomUUID();
  document.querySelector('#paymentStatus').textContent='Aguardando confirmação do pagamento...';
  document.querySelector('#pixFeedback').textContent='';
  qrPanel.hidden=true;
  formPanel.hidden=false;
  resetCaptcha();
  window.scrollTo({top:0,behavior:'smooth'});
});
document.addEventListener('visibilitychange',()=>{
  if(!document.hidden && orderToken)nextStatusPoll(600);
});
loadPriceFromCakto();
loadTurnstile();

/* Mantém o checkout integrado sem barra de rolagem interna no celular. */
if(window.parent!==window && 'ResizeObserver' in window){
  const shell=document.querySelector('.checkout-shell');
  const reportHeight=()=>{
    if(!shell)return;
    const height=Math.ceil(shell.getBoundingClientRect().height+32);
    window.parent.postMessage({type:'grimorio-pix-iframe-height',height},window.location.origin);
  };
  new ResizeObserver(reportHeight).observe(shell);
  window.addEventListener('load',reportHeight);
  reportHeight();
}
