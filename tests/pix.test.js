import test from 'node:test';
import assert from 'node:assert/strict';
import {validCpf,normalizeCustomer,requestId,validPixAmount,pixReady,signOrderId,readOrderToken} from '../api/_cakto.js';
import createHandler from '../api/pix/create.js';
import statusHandler from '../api/pix/status.js';

test('CPF deve rejeitar sequências repetidas e aceitar dígitos verificadores válidos',()=>{
  assert.equal(validCpf('111.111.111-11'),false);
  assert.equal(validCpf('12345678900'),false);
  assert.equal(validCpf('529.982.247-25'),true);
});
test('dados do comprador: somente nome, CPF, email e telefone normalizados',()=>{
  const c=normalizeCustomer({name:' Maria  Souza ',cpf:'529.982.247-25',email:'  MARIA@example.com ',phone:'(11) 99999-9999'});
  assert.deepEqual(c,{name:'Maria Souza',email:'maria@example.com',phone:'5511999999999',docType:'cpf',docNumber:'52998224725'});
  assert.throws(()=>normalizeCustomer({name:'A',cpf:'123',email:'a',phone:'123'}));
});
test('segurança e valor do checkout',()=>{
  assert.equal(pixReady({}),false);
  assert.equal(pixReady({CAKTO_PIX_ENABLED:'true',CAKTO_CLIENT_ID:'id',CAKTO_CLIENT_SECRET:'secret',CAKTO_OFFER_ID:'offer',TURNSTILE_SECRET_KEY:'secret'}),true);
  assert.equal(requestId('d9428888-122b-4f28-b7ad-441451e5b7f3'),true);
  assert.equal(requestId('1'),false);
  assert.equal(validPixAmount('19.90'),true);
  assert.equal(validPixAmount('19.00'),true);
  assert.equal(validPixAmount('20.80'),true);
});
test('token de consulta deve ter assinatura que impeça adulteração',()=>{
  const old=process.env.CAKTO_CLIENT_SECRET;
  process.env.CAKTO_CLIENT_SECRET='segredo-apenas-teste';
  try{
    const token=signOrderId('a11813aa-4ab7-4c5b-a978-a8a9ff242df1');
    assert.equal(readOrderToken(token),'a11813aa-4ab7-4c5b-a978-a8a9ff242df1');
    assert.equal(readOrderToken(token.slice(0,-2)+'zz'),null);
  } finally {if(old===undefined)delete process.env.CAKTO_CLIENT_SECRET;else process.env.CAKTO_CLIENT_SECRET=old;}
});
function fakeRes(){
  return {code:200,headers:{},setHeader(k,v){this.headers[k]=v;return this;},status(n){this.code=n;return this;},json(body){this.body=body;return this;}};
}
test('sem chave de produção, ambas APIs falham fechadas e não geram pagamentos',async()=>{
  const prev=process.env.CAKTO_PIX_ENABLED;
  delete process.env.CAKTO_PIX_ENABLED;
  try{
    const a=fakeRes(),b=fakeRes();
    await createHandler({method:'POST',headers:{}},a);
    await statusHandler({method:'GET',headers:{},query:{token:'qualquer'}},b);
    assert.equal(a.code,503);
    assert.equal(b.code,503);
  }finally{if(prev===undefined)delete process.env.CAKTO_PIX_ENABLED;else process.env.CAKTO_PIX_ENABLED=prev;}
});
