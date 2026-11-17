import {pixReady,normalizeCustomer,requestId,sameOrigin,caktoFetch,verifyTurnstile,signOrderId,getActiveOffer,supportedPrice} from '../_cakto.js';

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='POST') { res.setHeader('Allow','POST');return res.status(405).json({error:'Método não permitido.'}); }
  if(!pixReady())return res.status(503).json({error:'Pix simplificado ainda em configuração. Use o checkout tradicional.'});
  if(!sameOrigin(req))return res.status(403).json({error:'Origem não autorizada.'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return res.status(415).json({error:'Formato inválido.'});
  try {
    const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
    if (!body || JSON.stringify(body).length>5000) return res.status(400).json({error:'Dados inválidos.'});
    const customer=normalizeCustomer(body);
    if(!requestId(body.requestId))return res.status(400).json({error:'Atualize a página e tente novamente.'});
    if(!(await verifyTurnstile(body.turnstileToken,req)))return res.status(403).json({error:'Confirme a verificação de segurança e tente novamente.'});
    const offer=await getActiveOffer();
    const offerId=offer.id;
    const payload={
      customer:{...customer,fingerprint:'fp_'+body.requestId},
      paymentMethod:'pix',
      items:[{offerId}],
      pixExpiresIn:900
    };
    const response=await caktoFetch('/payments/', {
      method:'POST',
      headers:{'X-Idempotency-Key':body.requestId},
      body:JSON.stringify(payload)
    });
    if(!response.ok){
      if(response.status===409) return res.status(409).json({error:'Essa tentativa já está sendo processada. Aguarde alguns segundos ou recarregue a página.'});
      if(response.status===401||response.status===403) return res.status(503).json({error:'O pagamento Pix está temporariamente indisponível.'});
      return res.status(503).json({error:'Não foi possível gerar o Pix. Tente novamente ou use o checkout tradicional.'});
    }
    const data=await response.json();
    if(!data.id||!data.pix?.qrCode||data.paymentMethod!=='pix'||data.offer?.id!==offerId||(!supportedPrice(data.amount) || Math.abs(Number(data.amount)-Number(offer.price))>0.001)){
      return res.status(409).json({error:'Valor ou oferta divergente. Não faça pagamento por este Pix; utilize o checkout tradicional.'});
    }
    return res.status(201).json({
      orderToken:signOrderId(data.id),
      pixCode:data.pix.qrCode,
      expirationDate:data.pix.expirationDate||null,
      amount:offer.price,
      status:'waiting_payment'
    });
  }catch(err){
    if(err instanceof SyntaxError)return res.status(400).json({error:'Dados inválidos.'});
    if(err.message && (/Informe|Confira/.test(err.message)))return res.status(400).json({error:err.message});
    // Não registrar nome, e-mail, CPF, telefone ou detalhes das credenciais.
    return res.status(503).json({error:'Não foi possível gerar o Pix. Use o checkout tradicional ou tente novamente.'});
  }
}
