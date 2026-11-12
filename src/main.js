import './style.css';
import './promo.css';
import './refinement.css';
import { checkoutUrl, whatsappUrl, httpsUrl } from './config.js';
const e = import.meta.env;
const supportNumber = e.VITE_WHATSAPP_NUMBER || '5511942353966';
const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-3Z"/></svg>';
const themes = [ ['✧','Prosperidade','Fé e esperança para novos caminhos.'],['♡','Amor e harmonia','Orações para cultivar paz e fortalecer seus vínculos.'],['◈','Vida financeira','Serenidade e sabedoria diante dos desafios.'],['↗','Renovação espiritual','Força, proteção e confiança para recomeçar.'] ];
const faqs = [['O livro é físico?','Não. É um eBook digital.'],['Como receberei meu Grimório?','O acesso será disponibilizado após a confirmação do pagamento.'],['Minha compra ajuda o projeto?','Sim. O valor integral das vendas válidas será destinado à alimentação infantil.'],['Posso falar com alguém?',whatsappUrl(supportNumber) ? 'Sim! Nosso suporte está disponível pelo WhatsApp.' : 'Nosso canal oficial de suporte pelo WhatsApp está em configuração.']];
document.querySelector('#app').innerHTML = `
<header class="promo-banner"><strong>PROMOÇÃO POR TEMPO LIMITADO</strong></header>
<main>
<div class="hero-stage"><section class="hero wrap">
<h1>Veja como a poderosa <em>oração de São Bento</em> vem tocando vidas — e pode inspirar a sua também.</h1>
<div class="vsl vsl-video" id="vsl" aria-label="Apresentação em vídeo do Grimório de São Bento"></div>
</section></div>
<section class="real-testimonials" id="depoimentos" aria-label="Relatos de clientes">
  <div class="wrap reviews-compact">
    <figure class="facebook-reviews">
      <a class="facebook-reviews-desktop" href="/depoimentos-originais.webp" target="_blank" rel="noopener" aria-label="Ampliar os relatos enviados por clientes">
        <img src="/depoimentos-originais.webp" alt="Relatos de clientes sobre a oração de São Bento" width="1254" height="614" loading="lazy">
      </a>
      <a class="facebook-reviews-mobile" href="/depoimentos-originais.webp" target="_blank" rel="noopener" aria-label="Ampliar os relatos enviados por clientes">
        <img src="/depoimentos-originais.webp" alt="Relatos de clientes sobre a oração de São Bento" width="1254" height="614" loading="lazy">
      </a>
      <figcaption>Relatos de clientes. Experiências pessoais não garantem resultados iguais.</figcaption>
    </figure>
  </div>
</section>
<section class="instant-purchase" id="comprar-agora">
  <div class="wrap quick-purchase-inner">
    <p class="quick-offer">Seu Grimório digital por <strong>R$ 19,00</strong></p>
    <a class="button hero-buy quick-buy" id="hero-checkout" href="#oferta">QUERO MUDAR MINHA VIDA <span aria-hidden="true">→</span></a>
    <p class="quick-trust">Compra segura • Pagamento protegido • Produto 100% digital</p>
    <button class="button whatsapp-hero quick-whatsapp" id="whatsapp-hero" disabled>${whatsappIcon} FALAR NO WHATSAPP</button>
  </div>
</section>
<section class="benefits wrap"><p class="eyebrow">FÉ PARA TODOS OS MOMENTOS</p><h2>Saúde, paz, amor e prosperidade: encontre orações para acompanhar a sua vida</h2><div class="theme-grid">${themes.map(([icon,title,desc])=>`<article class="theme"><span class="theme-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section>



<section class="offer-section" id="oferta">
  <div class="wrap">
    <picture class="offer-promotion">
      <source media="(max-width: 700px)" srcset="/promo-mudar-vida-mobile.webp" type="image/webp">
      <img src="/promo-mudar-vida-desktop.webp" alt="Oferta do eBook Grimório de São Bento de R$ 197,00 por R$ 19,00. Clique no botão abaixo para mudar sua vida. Cada compra ajuda a financiar duas refeições infantis." width="1280" height="720" loading="lazy">
    </picture>
    <article class="offer-card offer-card-focus">
      <p class="eyebrow">SEU GRIMÓRIO DIGITAL</p>
      <h3>GRIMÓRIO DE SÃO BENTO</h3>
      <div class="old-price">De <s>R$ 197,00</s> por apenas</div>
      <div class="price">R$ <strong>19,00</strong></div>
      <p class="price-note">Pagamento único · Acesso digital</p>
      <ul><li>Um eBook para acompanhar seus momentos de fé.</li><li>Leia no celular, tablet ou computador.</li><li>Sua compra contribui para alimentar crianças.</li></ul>
      <div class="impact">${heart}<p>Sua compra ajuda a financiar<br><strong>2 refeições infantis.</strong></p></div>
      <div class="offer-actions">
        <button class="button" id="checkout" disabled>COMPRA DISPONÍVEL EM BREVE</button>
        <button class="button whatsapp-offer" id="whatsapp-offer" disabled>${whatsappIcon} TENHO DÚVIDAS · FALAR NO WHATSAPP</button>
      </div>
      <p class="trust-line" id="trust-line" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></svg><span>Compra segura • Pagamento protegido • Produto 100% digital</span></p>
    </article>
  </div>
</section>
<section class="impact-section" id="impacto">
  <div class="wrap impact-layout">
    <div class="impact-copy">
      <p class="eyebrow">PROPÓSITO COM TRANSPARÊNCIA</p>
      <h2>Uma escolha que fortalece sua fé. <em>Um gesto que alimenta a esperança.</em></h2>
      <p>O <strong>Projeto Renascer com Fé</strong> destina 100% do valor das vendas válidas do Grimório à alimentação infantil.</p>
      <div class="impact-signature">${heart}<span>A fé nos une. O amor alimenta.</span></div>
    </div>
    <div class="impact-dashboard">
      <div class="impact-primary">
        <span class="impact-primary-icon">${heart}</span>
        <div><strong>2</strong><span>refeições infantis<br>ajudadas por compra</span></div>
      </div>
      <div class="impact-stat-grid">
        <div class="impact-stat"><span>Valor do eBook</span><strong>R$ 19,00</strong></div>
        <div class="impact-stat"><span>Valor das refeições</span><strong>R$ 20,00</strong></div>
      </div>
      <p class="impact-footnote">O projeto complementa R$ 1,00 por compra e assume separadamente as taxas da plataforma para financiar duas refeições de R$ 10,00.</p>
    </div>
  </div>
  <div class="wrap impact-bottom">As refeições serão distribuídas conforme o cronograma da campanha, com prestação de contas pelo projeto.</div>
</section>
<section class="support wrap" id="suporte"><div><p class="eyebrow">PODE CONTAR COM A GENTE</p><h2>Ficou com alguma dúvida?</h2><p>Fale com nosso suporte no WhatsApp.</p></div><div><button class="button whatsapp-button" id="whatsapp" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-1-3Z"/></svg> FALAR COM O SUPORTE</button><p class="micro" id="whatsapp-status">Canal oficial em configuração.</p></div></section>
<section class="faq wrap"><p class="eyebrow">TUDO COM CLAREZA</p><h2>Dúvidas frequentes</h2><div class="questions">${faqs.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section></main>
<footer><div class="wrap footer-grid"><div><p class="footer-brand">Grimório de São Bento</p><p>Projeto Renascer com Fé</p></div><div class="footer-links"><span id="privacy" hidden></span><span id="terms" hidden></span><a href="#suporte">Canal de suporte</a></div></div><div class="wrap footer-note">eBook 100% digital. Atendimento pelo canal oficial do Projeto Renascer com Fé.</div></footer>`;
function activateButton(id, url) { const old = document.getElementById(id); const link = document.createElement('a'); link.id = id; link.className = old.className; link.innerHTML = old.innerHTML; link.href = url; link.rel = 'noopener noreferrer'; old.replaceWith(link); }
const checkout = checkoutUrl(e.VITE_CHECKOUT_URL || 'https://pay.cakto.com.br/876y8h4_1309579');
if(checkout) {
  document.getElementById('hero-checkout').href=checkout;
  const button=document.getElementById('checkout');
  button.innerHTML='QUERO MUDAR MINHA VIDA <span aria-hidden="true">→</span>';
  activateButton('checkout',checkout);
  document.getElementById('trust-line').hidden=false;
}
const whatsapp = whatsappUrl(supportNumber);
if(whatsapp) { for(const id of ['whatsapp','whatsapp-hero','whatsapp-offer']) activateButton(id,whatsapp); document.getElementById('whatsapp-status').textContent = 'Atendimento pelo WhatsApp oficial.'; }
for(const [id,value] of [['privacy',e.VITE_PRIVACY_URL],['terms',e.VITE_TERMS_URL]]) { const url=httpsUrl(value); if(url) {const old=document.getElementById(id); const a=document.createElement('a'); a.textContent=id==='privacy'?'Política de Privacidade':'Termos de Compra'; a.href=url; old.replaceWith(a);} }
const bunnyEmbed='https://player.mediadelivery.net/embed/805897/0d6de8ec-bba4-4c8f-ad0c-03a15a51c987?autoplay=false&preload=false&playsinline=true&compactControls=true&showSpeed=false&levelCap=true';
const mp4=httpsUrl(e.VITE_VSL_MP4_URL), embed=httpsUrl(e.VITE_VSL_EMBED_URL || bunnyEmbed);
if(mp4 || embed) {
  const frame=document.getElementById('vsl');
  if(mp4) {
    const v=document.createElement('video'); v.controls=true; v.preload='none'; v.poster='/book.svg'; v.playsInline=true; v.src=mp4; v.setAttribute('aria-label','Apresentação do Grimório de São Bento'); frame.append(v);
  } else {
    const i=document.createElement('iframe'); i.src=embed; i.title='Apresentação do Grimório de São Bento'; i.loading='lazy'; i.allow='autoplay; encrypted-media; picture-in-picture; fullscreen'; i.allowFullscreen=true; i.referrerPolicy='strict-origin-when-cross-origin'; frame.append(i);
  }
}
