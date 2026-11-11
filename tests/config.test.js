import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutUrl, whatsappUrl, httpsUrl } from '../src/config.js';
test('checkout remains inactive for missing, unsafe and unrelated URLs',()=>{ for(const url of ['', 'javascript:alert(1)','http://pay.cakto.com.br/example','https://evil.test','https://pay.cakto.com.br.evil.test/example','https://pay.cakto.com.br/']) assert.equal(checkoutUrl(url),null); });
test('accepts HTTPS Cakto product checkout',()=>assert.equal(checkoutUrl('https://pay.cakto.com.br/example'),'https://pay.cakto.com.br/example'));
test('WhatsApp requires international digits and encodes the requested message',()=>{assert.equal(whatsappUrl(''),null);assert.equal(whatsappUrl('fake'),null);const u=new URL(whatsappUrl('5511999999999'));assert.equal(u.searchParams.get('text'),'Olá! Gostaria de saber mais sobre o Grimório de São Bento.');});
test('external media and policy links require HTTPS',()=>{assert.equal(httpsUrl('javascript:alert(1)'),null);assert.equal(httpsUrl('https://example.org/video.mp4'),'https://example.org/video.mp4');});
