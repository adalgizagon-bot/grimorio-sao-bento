import {pixReady,getActiveOffer} from '../_cakto.js';
export default async function handler(req,res){
  res.setHeader('Cache-Control','no-store, max-age=0');
  res.setHeader('X-Content-Type-Options','nosniff');
  if(req.method!=='GET'){res.setHeader('Allow','GET');return res.status(405).json({available:false});}
  if(!pixReady())return res.status(200).json({available:false,message:'Pix temporariamente indisponível. fale com nosso suporte pelo WhatsApp.'});
  try{
    const offer=await getActiveOffer();
    return res.status(200).json({available:true,amount:offer.price});
  }catch(err){
    return res.status(200).json({available:false,message:'Não foi possível carregar o Pix agora. fale com nosso suporte pelo WhatsApp.'});
  }
}