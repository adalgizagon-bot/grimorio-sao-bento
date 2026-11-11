import './style.css';
import './promo.css';
import { checkoutUrl, whatsappUrl, httpsUrl } from './config.js';
const e = import.meta.env;
const supportNumber = e.VITE_WHATSAPP_NUMBER || '5511942353966';
const heart = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';
const whatsappIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-3Z"/></svg>';
// Títulos literais de relatos de apoiadores, não avaliações deste eBook.
const testimonials = [
  {name:'Mariana S.', quote:'Uma pequena ajuda, um grande significado'},
  {name:'Juliana R.', quote:'Toda criança merece ter o que comer'},
  {name:'Camila M.', quote:'Ajudar também transforma quem doa'},
  {name:'Fernanda L.', quote:'Nenhuma criança deveria passar fome'},
  {name:'Patrícia A.', quote:'Um gesto de amor ao próximo'},
  {name:'Renata C.', quote:'Alimentar é também cuidar'},
  {name:'Daniela F.', quote:'Quero fazer parte dessa mudança'},
];
const themes = [ ['✧','Prosperidade','Fé e esperança para novos caminhos.'],['♡','Amor e harmonia','Orações para cultivar paz e fortalecer seus vínculos.'],['◈','Vida financeira','Serenidade e sabedoria diante dos desafios.'],['↗','Renovação espiritual','Força, proteção e confiança para recomeçar.'] ];
const faqs = [['O livro é físico?','Não. É um eBook digital.'],['Como receberei meu Grimório?','O acesso será disponibilizado após a confirmação do pagamento.'],['Minha compra ajuda o projeto?','Sim. O valor integral das vendas válidas será destinado à alimentação infantil.'],['Posso falar com alguém?',whatsappUrl(supportNumber) ? 'Sim! Nosso suporte está disponível pelo WhatsApp.' : 'Nosso canal oficial de suporte pelo WhatsApp está em configuração.']];
document.querySelector('#app').innerHTML = `
<header class="promo-banner"><span class="promo-symbol" aria-hidden="true">✦</span><div><strong>PROMOÇÃO POR TEMPO LIMITADO</strong><small>Seu livro de fé também ajuda a alimentar crianças.</small></div><span class="promo-symbol" aria-hidden="true">✦</span></header>
<main><div class="hero-stage"><section class="hero wrap"><p class="eyebrow">FÉ QUE ACOMPANHA. AMOR QUE ALIMENTA.</p><h1>Orações poderosas para momentos de <em>fé, prosperidade, amor e transformação.</em></h1><p class="intro">Descubra uma coletânea de orações para fortalecer sua espiritualidade, renovar a esperança e buscar novos caminhos.</p>
<div class="vsl" id="vsl"><div class="vsl-copy"><span class="eyebrow">UM ENCONTRO COM A SUA FÉ</span><h2>Um momento de pausa.<br>Um novo olhar para<br><em>a sua caminhada.</em></h2><span class="video-pending">Vídeo de apresentação em breve</span></div><img src="/book.svg" alt="Capa ilustrativa do eBook Grimório de São Bento" width="580" height="720" fetchpriority="high"></div>
<div class="hero-actions"><a class="button hero-buy" href="#oferta">QUERO MEU GRIMÓRIO POR R$ 19,00 <span aria-hidden="true">→</span></a><button class="button whatsapp-hero" id="whatsapp-hero" disabled>${whatsappIcon} TEM ALGUMA DÚVIDA? FALE NO WHATSAPP</button></div><p class="micro">eBook digital <span>·</span> Uma compra com propósito</p></section></div>
<section class="benefits wrap"><p class="eyebrow">PALAVRAS PARA OS SEUS DIAS</p><h2>Encontre palavras de fé para diferentes momentos da sua vida</h2><div class="theme-grid">${themes.map(([icon,title,desc])=>`<article class="theme"><span class="theme-icon" aria-hidden="true">${icon}</span><h3>${title}</h3><p>${desc}</p></article>`).join('')}</div><p class="editorial">Temas pendentes de confirmação editorial com o conteúdo do livro.</p></section>

<section class="testimonials-section" aria-labelledby="testimonials-title"><div class="wrap"><p class="eyebrow">UMA CORRENTE DE SOLIDARIEDADE</p><h2 id="testimonials-title">Quem ajuda, espalha esperança.</h2><p class="testimonials-intro">Conheça mensagens compartilhadas por apoiadores do Projeto Renascer com Fé.</p>
<div class="testimonial-carousel" aria-roledescription="carrossel" aria-label="Depoimentos dos apoiadores">
<button class="carousel-arrow" id="testimonial-prev" type="button" aria-label="Depoimento anterior" aria-controls="testimonial-slides">←</button>
<div id="testimonial-slides" class="testimonial-slides" aria-live="polite">
${testimonials.map((person,i)=>'<article class="testimonial-slide" aria-label="Depoimento '+(i+1)+' de '+testimonials.length+'" '+(i?'hidden':'')+'><span class="testimonial-quote-mark" aria-hidden="true">“</span><blockquote>“'+person.quote+'”</blockquote><div class="testimonial-person"><span class="testimonial-avatar" aria-hidden="true">'+person.name.slice(0,1)+'</span><div><strong>'+person.name+'</strong><small>Apoiadora do Projeto Renascer com Fé</small></div></div></article>').join('')}
</div><button class="carousel-arrow" id="testimonial-next" type="button" aria-label="Próximo depoimento" aria-controls="testimonial-slides">→</button></div>
<div class="carousel-pagination"><div class="carousel-dots" id="testimonial-dots" aria-label="Escolher depoimento"></div><span id="testimonial-counter" aria-live="off">1 de ${testimonials.length}</span></div>
<p class="testimonial-disclaimer">Relatos de participantes da campanha solidária; não são avaliações do eBook Grimório de São Bento.</p>
</div></section>
<section class="offer-section" id="oferta"><div class="wrap"><div class="section-heading"><p class="eyebrow">UM LIVRO SEU. UM GESTO QUE ACOLHE.</p><h2>Um livro de fé.<br><em>Um gesto de amor.</em></h2><p>Ao adquirir seu Grimório de São Bento, você também participa de uma missão especial: ajudar a levar alimento a crianças em situação de vulnerabilidade.</p></div><div class="offer-layout"><figure class="book-display"><img src="/book.svg" alt="Apresentação ilustrativa da capa do Grimório de São Bento" width="580" height="720" loading="lazy"><figcaption>Para levar sua fé com você.<span>PRODUTO DIGITAL · CAPA ILUSTRATIVA</span></figcaption></figure><article class="offer-card"><p class="eyebrow">OFERTA ESPECIAL POR TEMPO LIMITADO</p><h3>GRIMÓRIO DE SÃO BENTO</h3><div class="old-price">De <s>R$ 197,00</s> por apenas</div><div class="price">R$ <strong>19,00</strong></div><p class="price-note">Pagamento único · eBook digital</p><ul><li>Receba seu eBook digital.</li><li>Leia no celular, tablet ou computador.</li><li>Orações para diferentes momentos da vida.</li></ul><div class="impact">${heart}<p>Sua compra ajuda a financiar<br><strong>2 refeições infantis.</strong></p></div><div class="offer-actions"><button class="button" id="checkout" disabled>QUERO COMPRAR E AJUDAR <span aria-hidden="true">→</span></button><button class="button whatsapp-offer" id="whatsapp-offer" disabled>${whatsappIcon} TENHO DÚVIDAS · FALAR NO WHATSAPP</button></div><p class="trust-line"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/></svg><span>Compra segura • Pagamento protegido • Produto 100% digital</span></p><p class="pending" id="checkout-status">Vendas ainda não abertas. Novo checkout Cakto pendente de configuração.</p></article></div></div></section>
<section class="transparency wrap"><div class="transparency-title">${heart}<div><p class="eyebrow">PROPÓSITO COM TRANSPARÊNCIA</p><h2>Sua compra também alimenta a esperança.</h2></div></div><p>O <strong>Projeto Renascer com Fé</strong> destinará 100% do valor das vendas válidas à alimentação infantil.</p><dl class="numbers"><div><dt>Sua compra</dt><dd>R$ 19,00</dd></div><div><dt>Refeições financiadas</dt><dd>2</dd></div><div><dt>Valor previsto das 2 refeições</dt><dd>R$ 20,00</dd></div></dl><p class="fine">Cada compra de R$ 19,00 ajuda a financiar duas refeições, com complemento de R$ 1,00 e taxas da plataforma custeados pela organização.</p><p class="fine">As refeições serão distribuídas conforme o cronograma da campanha. A prestação de contas será disponibilizada pelo projeto.</p><p><strong>A fé nos une. O amor alimenta.</strong></p></section>
<section class="support wrap" id="suporte"><div><p class="eyebrow">PODE CONTAR COM A GENTE</p><h2>Ficou com alguma dúvida?</h2><p>Fale com nosso suporte no WhatsApp.</p></div><div><button class="button whatsapp-button" id="whatsapp" disabled><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M21 11.5a9 9 0 0 1-13.3 7.9L3 21l1.5-4.8A9 9 0 1 1 21 11.5Z"/><path d="M8 7c-2 4 3 9 7 8l1-2-3-1-1 1-2-2 1-1-1-3Z"/></svg> FALAR COM O SUPORTE</button><p class="micro" id="whatsapp-status">Canal oficial em configuração.</p></div></section>
<section class="faq wrap"><p class="eyebrow">TUDO COM CLAREZA</p><h2>Dúvidas frequentes</h2><div class="questions">${faqs.map(([q,a])=>`<details><summary>${q}<span aria-hidden="true">+</span></summary><p>${a}</p></details>`).join('')}</div></section></main>
<footer><div class="wrap footer-grid"><div><p class="footer-brand">Grimório de São Bento</p><p>Projeto Renascer com Fé</p></div><div class="footer-links"><span id="privacy">Política de Privacidade — em preparação</span><span id="terms">Termos de Compra — em preparação</span><a href="#suporte">Canal de suporte</a></div></div><div class="wrap footer-note">Entrega 100% digital após a confirmação do pagamento. Condições de reembolso pendentes de publicação nos Termos de Compra antes da abertura das vendas.</div></footer>`;
function activateButton(id, url) { const old = document.getElementById(id); const link = document.createElement('a'); link.id = id; link.className = old.className; link.innerHTML = old.innerHTML; link.href = url; link.rel = 'noopener noreferrer'; old.replaceWith(link); }
const checkout = checkoutUrl(e.VITE_CHECKOUT_URL);
if(checkout) { activateButton('checkout',checkout); document.getElementById('checkout-status').textContent = 'Você será direcionado ao checkout da Cakto.'; }
const whatsapp = whatsappUrl(supportNumber);
if(whatsapp) { for(const id of ['whatsapp','whatsapp-hero','whatsapp-offer']) activateButton(id,whatsapp); document.getElementById('whatsapp-status').textContent = 'Atendimento pelo WhatsApp oficial.'; }
for(const [id,value] of [['privacy',e.VITE_PRIVACY_URL],['terms',e.VITE_TERMS_URL]]) { const url=httpsUrl(value); if(url) {const old=document.getElementById(id); const a=document.createElement('a'); a.textContent=id==='privacy'?'Política de Privacidade':'Termos de Compra'; a.href=url; old.replaceWith(a);} }
const mp4=httpsUrl(e.VITE_VSL_MP4_URL), embed=httpsUrl(e.VITE_VSL_EMBED_URL);
if(mp4 || embed) { const frame=document.getElementById('vsl'); frame.replaceChildren(); if(mp4) { const v=document.createElement('video'); v.controls=true; v.preload='none'; v.poster='/book.svg'; v.playsInline=true; v.src=mp4; v.setAttribute('aria-label','Apresentação do Grimório de São Bento'); frame.append(v); } else { const i=document.createElement('iframe'); i.src=embed; i.title='Apresentação do Grimório de São Bento'; i.loading='lazy'; i.allow='fullscreen; picture-in-picture'; i.referrerPolicy='strict-origin-when-cross-origin'; frame.append(i); } }

const slides = [...document.querySelectorAll('.testimonial-slide')];
const dots = document.getElementById('testimonial-dots');
const counter = document.getElementById('testimonial-counter');
let currentTestimonial = 0;
function showTestimonial(index) {
  currentTestimonial = (index + slides.length) % slides.length;
  slides.forEach((slide,i) => { slide.hidden = i !== currentTestimonial; });
  [...dots.children].forEach((dot,i) => {
    dot.classList.toggle('is-active',i === currentTestimonial);
    dot.setAttribute('aria-pressed',String(i === currentTestimonial));
  });
  counter.textContent = (currentTestimonial + 1) + ' de ' + slides.length;
}
slides.forEach((_,i) => {
  const dot = document.createElement('button');
  dot.className = 'carousel-dot';
  dot.type = 'button';
  dot.setAttribute('aria-label','Ir para depoimento '+(i+1));
  dot.addEventListener('click',() => showTestimonial(i));
  dots.append(dot);
});
document.getElementById('testimonial-prev').addEventListener('click',() => showTestimonial(currentTestimonial-1));
document.getElementById('testimonial-next').addEventListener('click',() => showTestimonial(currentTestimonial+1));
document.getElementById('testimonial-slides').setAttribute('tabindex','0');
document.getElementById('testimonial-slides').addEventListener('keydown',(event) => {
  if(event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showTestimonial(currentTestimonial+(event.key === 'ArrowRight'?1:-1));
  }
});
showTestimonial(0);
