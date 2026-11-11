import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
try {
for(const width of [1440,390,320]) {
const page=await browser.newPage({viewport:{width,height:1000},deviceScaleFactor:1});const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:4173');
assert.equal(await page.locator('h1').count(),1);
assert.equal(await page.locator('.offer-card').count(),1);
assert.equal(await page.locator('.price').innerText(),'R$ 19,90');
assert.equal(await page.locator('#checkout').isDisabled(),true);
assert.equal(await page.locator('#whatsapp').isDisabled(),true);
assert.equal(await page.locator('details').count(),4);
await page.locator('a[href="#oferta"]').click();await page.waitForTimeout(600);assert.equal(new URL(page.url()).hash,'#oferta');
assert.ok(await page.locator('.transparency').innerText().then(t=>t.includes('R$ 0,10')&&t.includes('R$ 20,00')&&t.includes('100%')));
await page.locator('summary').first().click();assert.equal(await page.locator('details').first().getAttribute('open'),'');
assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
assert.equal(await page.locator('video,iframe').count(),0);assert.deepEqual(errors,[]);
await page.screenshot({path:`/tmp/grimorio-${width}.png`,fullPage:true});console.log(`PASS ${width}px: oferta, CTA, FAQ, transparência, destinos pendentes e ausência de overflow`);await page.close();
}
} finally {await browser.close();}
