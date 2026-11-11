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
assert.equal(await page.locator('#checkout').isDisabled(),true);
assert.equal(await page.locator('#checkout').innerText(),'COMPRA DISPONÍVEL EM BREVE');
const whatsapp = new URL(await page.locator('#whatsapp').getAttribute('href'));
assert.equal(whatsapp.hostname,'wa.me'); assert.equal(whatsapp.pathname,'/5511942353966');
assert.equal(whatsapp.searchParams.get('text'),'Olá! Gostaria de saber mais sobre o Grimório de São Bento.');
for(const id of ['whatsapp-hero','whatsapp-offer']) {
  assert.equal(await page.locator('#'+id).getAttribute('href'),whatsapp.href);
}
assert.equal(await page.locator('#whatsapp').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(22, 128, 74)');
assert.equal(await page.locator('.hero-stage').evaluate(el=>getComputedStyle(el).backgroundColor),'rgb(24, 58, 45)');
assert.equal(await page.locator('.trust-line').isVisible(),false);
assert.equal(await page.locator('.real-review').count(),5);
assert.equal(await page.locator('.testimonial-carousel').count(),0);
assert.ok((await page.locator('.real-testimonials').innerText()).includes('Carlos Pereira'));
assert.equal(await page.locator('details').count(),5);
assert.equal(await page.locator('.offer-promotion img').count(),1);
assert.equal(await page.locator('.editorial').count(),0);
assert.equal(await page.getByText(/em preparação|pendente de configuração/i).count(),0);
await page.locator('a[href="#oferta"]').click();await page.waitForTimeout(600);assert.equal(new URL(page.url()).hash,'#oferta');
assert.ok(await page.locator('.impact-section').innerText().then(t=>t.includes('R$ 1,00')&&t.includes('R$ 20,00')&&t.includes('100%')));
await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
assert.equal(await page.locator('video,iframe').count(),0);assert.deepEqual(errors,[]);
await page.screenshot({path:`/tmp/grimorio-${width}.png`,fullPage:true});console.log(`PASS ${width}px: oferta, relatos enviados, FAQ, impacto responsivo, WhatsApp e ausência de overflow`);await page.close();
}
} finally {await browser.close();}
