import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
for(const width of [1440,390,320]) {
const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4173');
assert.equal(await page.locator('h1').count(),1);
assert.equal(await page.locator('.offer-card').count(),1);
assert.equal(await page.locator('.price').innerText(),'R$ 19,00');
assert.equal(await page.locator('.old-price').innerText(),'De R$ 197,00 por apenas');
assert.equal((await page.locator('.promo-banner').innerText()).trim(),'PROMOÇÃO POR TEMPO LIMITADO');
const checkout='https://pay.cakto.com.br/876y8h4_1309579';
assert.equal(await page.locator('#checkout').getAttribute('href'),checkout);
assert.equal(await page.locator('#hero-checkout').getAttribute('href'),checkout);
assert.equal((await page.locator('#checkout').innerText()).trim(),'QUERO MUDAR MINHA VIDA →');
assert.ok((await page.locator('h1').innerText()).includes('oração de São Bento'));
assert.equal((await page.locator('#hero-checkout').innerText()).trim(),'QUERO MUDAR MINHA VIDA →');
const whatsapp = new URL(await page.locator('#whatsapp').getAttribute('href'));
assert.equal(whatsapp.hostname,'wa.me'); assert.equal(whatsapp.pathname,'/5511942353966');
assert.equal(whatsapp.searchParams.get('text'),'Olá! Gostaria de saber mais sobre o Grimório de São Bento.');
for(const id of ['whatsapp-hero','whatsapp-offer']) {
  assert.equal(await page.locator('#'+id).getAttribute('href'),whatsapp.href);
}
assert.equal(await page.locator('#whatsapp').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(22, 128, 74)');
assert.equal(await page.locator('.hero-stage').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(24, 58, 45)');
assert.equal(await page.locator('.trust-line').isVisible(),true);
assert.equal(await page.locator('#vsl-launch').count(),0);
assert.equal(await page.locator('video,iframe').count(),1);
assert.equal(await page.locator('#vsl').evaluate(el=>getComputedStyle(el).aspectRatio),'9 / 16');
assert.equal(await page.locator('.testimonial-carousel').count(),0);
assert.equal(await page.locator('.real-review').count(),0);
assert.equal(await page.locator('.facebook-reviews-desktop img').count(),1);
assert.equal(await page.locator('.facebook-reviews-mobile img').count(),1);
assert.equal(await page.locator('.reviews-heading').count(),0);
assert.equal(await page.locator('.quick-purchase-inner').count(),1);
assert.deepEqual(await page.locator('main > *').evaluateAll(els=>els.slice(0,4).map(el=>el.className)),['hero-stage','real-testimonials','instant-purchase','benefits wrap']);
assert.equal(await page.locator('.facebook-reviews-desktop').isVisible(),width>700);
assert.equal(await page.locator('.facebook-reviews-mobile').isVisible(),width<=700);
assert.ok((await page.locator('.real-testimonials').innerText()).includes('Relatos de clientes'));
assert.ok((await page.locator('.quick-trust').innerText()).includes('Compra segura'));
assert.equal(await page.locator('details').count(),4);
assert.equal(await page.locator('.offer-promotion img').count(),1);
assert.equal(await page.locator('.editorial').count(),0);
assert.equal(await page.getByText(/em preparação|pendente de configuração/i).count(),0);
assert.ok(await page.locator('.impact-section').innerText().then(t=>t.includes('R$ 1,00')&&t.includes('R$ 20,00')&&t.includes('100%')));
await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
const iframe=page.locator('#vsl iframe');
assert.equal(await iframe.count(),1);
const playerUrl=new URL(await iframe.getAttribute('src'));
assert.equal(playerUrl.origin,'https://player.mediadelivery.net');
assert.equal(playerUrl.pathname,'/embed/805897/0d6de8ec-bba4-4c8f-ad0c-03a15a51c987');
assert.equal(playerUrl.searchParams.get('preload'),'false');
assert.equal(playerUrl.searchParams.get('autoplay'),'false');
assert.equal(await iframe.getAttribute('loading'),'lazy');
assert.deepEqual(errors,[]);
await page.screenshot({path:`/tmp/grimorio-${width}.png`,fullPage:true});console.log(`PASS ${width}px: vídeo, depoimentos logo abaixo, CTAs, FAQ, WhatsApp e ausência de overflow`);await page.close();
}
} finally {await browser.close();}
