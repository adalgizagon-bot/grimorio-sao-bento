import crypto from 'node:crypto';

export const CAKTO_BASE = 'https://api.cakto.com.br/public_api';
export const EXPECTED_AMOUNT = '19.90';
export const FALLBACK_CHECKOUT = 'https://pay.cakto.com.br/876y8h4_1309579';

export function pixReady(env=process.env) {
  return env.CAKTO_PIX_ENABLED === 'true' &&
    !!env.CAKTO_CLIENT_ID && !!env.CAKTO_CLIENT_SECRET &&
    !!env.CAKTO_OFFER_ID && !!env.TURNSTILE_SECRET_KEY;
}
export function onlyDigits(value) { return String(value || '').replace(/\D/g,''); }
export function validCpf(value) {
  const s = onlyDigits(value);
  if (!/^\d{11}$/.test(s) || /^(\d)\1{10}$/.test(s)) return false;
  for (let k=9;k<=10;k++) {
    const sum = [...s.slice(0,k)].reduce((acc,d,i)=>acc+Number(d)*(k+1-i),0);
    const check = (sum*10)%11%10;
    if (check !== Number(s[k])) return false;
  }
  return true;
}
export function normalizeCustomer(raw) {
  if (!raw || typeof raw!=='object' || Array.isArray(raw)) throw new Error('Informe os dados para finalizar a compra.');
  const name = String(raw.name||'').trim().replace(/\s+/g,' ');
  const email = String(raw.email||'').trim().toLowerCase();
  let phone = onlyDigits(raw.phone);
  const cpf = onlyDigits(raw.cpf);
  if (name.length<5 || name.length>120 || !name.includes(' ')) throw new Error('Informe seu nome completo.');
  if (email.length>180 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Informe um e-mail válido.');
  if (phone.length===10 || phone.length===11) phone='55'+phone;
  if (!/^55[1-9]\d{9,10}$/.test(phone)) throw new Error('Informe um WhatsApp com DDD.');
  if (!validCpf(cpf)) throw new Error('Confira o CPF informado.');
  return { name, email, phone, docType:'cpf', docNumber:cpf };
}
export function requestId(value) {
  return typeof value==='string' && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/i.test(value);
}
export function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) return false;
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  try { return new URL(origin).host === String(host).split(',')[0].trim() && new URL(origin).protocol==='https:'; }
  catch { return false; }
}
let tokenCache = { value:'', until:0 };
export async function accessToken() {
  if (tokenCache.value && Date.now()<tokenCache.until) return tokenCache.value;
  const response=await fetch(CAKTO_BASE+'/token/', {
    method:'POST',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    body:new URLSearchParams({client_id:process.env.CAKTO_CLIENT_ID,client_secret:process.env.CAKTO_CLIENT_SECRET}),
    signal:AbortSignal.timeout(10000)
  });
  if (!response.ok) throw new Error('Não foi possível autenticar na Cakto.');
  const data=await response.json();
  if (!data.access_token) throw new Error('Token Cakto ausente.');
  tokenCache={value:data.access_token,until:Date.now()+Math.max(30,Math.min(30000,Number(data.expires_in||300)-60))*1000};
  return data.access_token;
}
export async function caktoFetch(path,options={}) {
  const token=await accessToken();
  return fetch(CAKTO_BASE+path,{
    ...options,
    headers:{'Authorization':'Bearer '+token,'Content-Type':'application/json',...(options.headers||{})},
    signal:AbortSignal.timeout(15000)
  });
}
export async function verifyTurnstile(token,req) {
  if (typeof token!=='string' || token.length<20 || token.length>2048) return false;
  const body=new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY,response:token});
  const ip=String(req.headers['x-forwarded-for']||'').split(',')[0].trim();
  if (ip && ip.length<65) body.set('remoteip',ip);
  const r=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body,signal:AbortSignal.timeout(10000)
  });
  if (!r.ok) return false;
  const data=await r.json();
  const host=String(req.headers['x-forwarded-host']||req.headers.host||'').split(',')[0].trim();
  return data.success===true && data.hostname===host;
}
function hmac(value) {
  return crypto.createHmac('sha256',process.env.CAKTO_CLIENT_SECRET).update('grimorio-pix-status-v1:'+value).digest('base64url');
}
export function signOrderId(id) {
  const payload=Buffer.from(JSON.stringify({id,exp:Date.now()+2*60*60*1000})).toString('base64url');
  return payload+'.'+hmac(payload);
}
export function readOrderToken(value) {
  if(typeof value!=='string'||value.length>750) return null;
  const parts=value.split('.');
  if(parts.length!==2||!/^[A-Za-z0-9_-]+$/.test(parts[0]))return null;
  const signed=hmac(parts[0]);
  const a=Buffer.from(signed),b=Buffer.from(parts[1]||'');
  if(a.length!==b.length || !crypto.timingSafeEqual(a,b))return null;
  try {
    const data=JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
    if(typeof data.id!=='string'||!/^[a-z0-9-]{5,80}$/i.test(data.id))return null;
    if(!Number.isSafeInteger(data.exp)||data.exp<Date.now())return null;
    return data.id;
  } catch {return null;}
}
export function isCorrectAmount(value) {return Number.isFinite(Number(value))&&Math.abs(Number(value)-19.90)<0.001;}
