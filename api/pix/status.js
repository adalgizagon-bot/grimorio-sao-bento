import {pixReady,caktoFetch,readOrderToken} from '../_cakto.js';

export default async function handler(req,res) {
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({error:'Método não permitido.'});}
  if(!pixReady())return res.status(503).json({error:'Consulta indisponível.'});
  const orderId=readOrderToken(req.query?.token);
  if(!orderId)return res.status(403).json({error:'Sessão inválida ou expirada.'});
  try{
    const response=await caktoFetch('/orders/'+encodeURIComponent(orderId)+'/',{method:'GET'});
    if(!response.ok)return res.status(503).json({error:'Não foi possível verificar o pagamento.'});
    const data=await response.json();
    if(data.id!==orderId || data.paymentMethod!=='pix' || data.status==='refunded' || data.status==='chargedback'){
      return res.status(200).json({status:'not_confirmed'});
    }
    const status=data.status==='paid'?'paid':(data.status==='canceled'||data.status==='refused')?'canceled':'waiting_payment';
    return res.status(200).json({status});
  }catch{
    return res.status(503).json({error:'Verificação temporariamente indisponível.'});
  }
}
