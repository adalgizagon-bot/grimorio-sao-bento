import './style.css';
import './promo.css';
import './refinement.css';
import './conversion.css';
import './offer-refresh.css';
import { checkoutUrl, whatsappUrl, httpsUrl } from './config.js';
const e = import.meta.env;
const supportNumber = e.VITE_WHATSAPP_NUMBER || '5511942353966';
const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-3Z"/></svg>';
const themes = [
  ['💰', 'Dinheiro', 'Orações para pedir prosperidade, oportunidades e sabedoria nas decisões financeiras.'],
  ['✚', 'Saúde', 'Palavras de fé, força e esperança para enfrentar os dias difíceis e cuidar de si.'],
  ['♡', 'Amor', 'Orações para cultivar amor, diálogo e harmonia nos relacionamentos.'],
  ['⌂', 'Família', 'Momentos de oração pela proteção, união e paz dentro de casa.']
];
const faqs = [
  ['O Grimório é físico ou digital?', 'É um eBook 100% digital. Você pode ler no celular, tablet ou computador.'],
  ['Como receberei meu Grimório?', 'O acesso será disponibilizado após a confirmação do pagamento, conforme as instruções da plataforma.'],
  ['Posso parcelar a compra?', 'A página apresenta a opção de até 4 parcelas de R$ 5,37, sujeita às condições e aos valores confirmados no checkout.'],
  ['Posso falar com alguém?', whatsappUrl(supportNumber) ? 'Sim! Nosso suporte está disponível pelo WhatsApp.' : 'Nosso canal de suporte está em configuração.']
];
document.querySelector('#app').innerHTML = `
<header class="promo-banner"><strong>PROMOÇÃO POR TEMPO LIMITADO</strong></header>
<main>
<div class="hero-stage"><section class="hero wrap">
<h1>Veja como a poderosa <em>oração de São Bento</em> vem mudando vidas — e pode <strong class="change-word">MUDAR</strong> a sua também.</h1>
<div class="vsl vsl-video" id="vsl" aria-label="Apresentação em vídeo do Grimório de São Bento"></div>
</section></div>
<section class="real-testimonials" id="depoimentos" aria-label="Depoimentos de clientes">
  <div class="wrap reviews-compact">
    <figure class="testimonials-sliced">
      <div class="testimonials-desktop">
        <a class="testimonial-strip testimonial-strip-top" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar a primeira faixa dos depoimentos originais"></a>
        <a class="testimonial-strip testimonial-strip-bottom" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar a segunda faixa dos depoimentos originais"></a>
      </div>
      <div class="testimonials-mobile">
        <a class="testimonial-quadrant quadrant-1" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar os depoimentos de Patrícia, Juliana e Camila"></a>
        <a class="testimonial-quadrant quadrant-2" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar os depoimentos de Roberto e Carlos"></a>
        <a class="testimonial-quadrant quadrant-3" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar os depoimentos de Mariana, Neusa e Ricardo"></a>
        <a class="testimonial-quadrant quadrant-4" href="/depoimentos-novos.avif" target="_blank" rel="noopener noreferrer" aria-label="Ampliar os depoimentos de Carlos e Juliana"></a>
      </div>
    </figure>
  </div>
</section>
<section class="instant-purchase" id="comprar-agora">
  <div class="wrap quick-purchase-inner">
    <p class="quick-offer">Seu Grimório digital por <strong>R$ 19,90</strong></p>
    <a class="button hero-buy quick-buy" id="hero-checkout" href="#oferta">QUERO MUDAR MINHA VIDA <span aria-hidden="true">→</span></a>
    <p class="quick-trust">Compra segura • Pagamento protegido • Produto 100% digital</p>
    <button class="button whatsapp-hero quick-whatsapp" id="whatsapp-hero" disabled>${whatsappIcon} FALAR NO WHATSAPP</button>
  </div>
</section>
<section class="benefits wrap"><h2>DINHEIRO, SAÚDE, PAZ, AMOR E PROSPERIDADE: <em>orações para mudar sua vida.</em></h2><div class="theme-grid">${themes.map(([icon,title,desc])=>`<article class="theme"><span class="theme-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div></section>



<section class="offer-section" id="oferta">
  <div class="wrap">
    <div class="offer-video-heading">
      <span class="offer-video-kicker">ASSISTA AO DEPOIMENTO</span>
      <h2>Veja o depoimento de quem já leu o <em>Grimório Sagrado de São Bento.</em></h2>
    </div>
    <div class="vsl vsl-video testimony-video" id="testimony-video" aria-label="Vídeo de depoimento sobre o Grimório de São Bento"></div>
    <article class="offer-card offer-card-focus">
      <p class="eyebrow">OFERTA ESPECIAL · EBOOK DIGITAL</p>
      <h3>GRIMÓRIO DE SÃO BENTO</h3>
      <div class="old-price">De <s>R$ 197,00</s> por apenas</div>
      <div class="price">R$ <strong>19,90</strong></div>
      <p class="installments">ou até <strong>4x de R$ 5,37</strong> no cartão</p>
      <p class="payment-note">Total parcelado: R$ 21,48. Valores e condições sujeitos à confirmação no checkout.</p>
      <p class="price-note">Pagamento único à vista ou parcelado · Acesso digital</p>
      <ul>
        <li>Orações de fé para dinheiro, saúde, amor e família.</li>
        <li>Leitura no celular, tablet ou computador.</li>
        <li>Receba seu eBook após a confirmação da compra.</li>
      </ul>
      <div class="offer-actions">
        <button class="button" id="checkout" disabled>COMPRA DISPONÍVEL EM BREVE</button>
        <button class="button whatsapp-offer" id="whatsapp-offer" disabled>${whatsappIcon} TENHO DÚVIDAS · FALAR NO WHATSAPP</button>
      </div>
      <p class="trust-line" id="trust-line" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></svg><span>Compra segura • Pagamento protegido • Produto 100% digital</span></p>
    </article>
  </div>
</section>
<section class="support wrap" id="suporte"><div><p class="eyebrow">PODE CONTAR COM A GENTE</p><h2>Ficou com alguma dúvida?</h2><p>Fale com nosso suporte no WhatsApp.</p></div><div><button class="button whatsapp-button" id="whatsapp" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-1-3Z"/></svg> FALAR COM O SUPORTE</button><p class="micro" id="whatsapp-status">Canal oficial em configuração.</p></div></section>
<section class="faq wrap"><p class="eyebrow">TUDO COM CLAREZA</p><h2>Dúvidas frequentes</h2><div class="questions">${faqs.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section></main>
<footer><div class="wrap footer-grid"><div><p class="footer-brand">Grimório de São Bento</p><p>Orações e espiritualidade • Edição digital</p></div><div class="footer-links"><span id="privacy" hidden></span><span id="terms" hidden></span><a href="#suporte">Canal de suporte</a></div></div><div class="wrap footer-note">eBook 100% digital. Atendimento pelo WhatsApp informado nesta página.</div></footer>`;
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
// Os dois vídeos possuem posições definidas: novo vídeo no topo e vídeo anterior junto à oferta.
const bunnyQuery='?autoplay=false&preload=false&playsinline=true&compactControls=true&showSpeed=false&levelCap=true';
const heroEmbed=httpsUrl(e.VITE_HERO_VIDEO_EMBED_URL || 'https://player.mediadelivery.net/embed/805897/d2a9373d-c63a-40cd-a8f6-de534092b06f'+bunnyQuery);
const testimonyEmbed=httpsUrl(e.VITE_TESTIMONY_VIDEO_EMBED_URL || 'https://player.mediadelivery.net/embed/805897/0d6de8ec-bba4-4c8f-ad0c-03a15a51c987'+bunnyQuery);
function addVideo(frameId, source, title) {
  if (!source) return;
  const frame=document.getElementById(frameId);
  if (!frame) return;
  const iframe=document.createElement('iframe');
  iframe.src=source;
  iframe.title=title;
  iframe.loading='lazy';
  iframe.allow='autoplay; encrypted-media; picture-in-picture; fullscreen';
  iframe.allowFullscreen=true;
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  frame.append(iframe);
}
addVideo('vsl',heroEmbed,'Apresentação do Grimório de São Bento');
addVideo('testimony-video',testimonyEmbed,'Depoimento sobre o Grimório de São Bento');
