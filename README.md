# Grimório de São Bento

Landing page independente em português para venda do eBook digital, anunciada por R$ 19,90 à vista ou até 4x de R$ 5,37 (total de R$ 21,48), com preço anterior de referência de R$ 197,00 informado pela organização. Vite + JavaScript, sem frameworks visuais.

## Desenvolvimento e testes

```sh
npm ci
npm test
npm run build
npm run preview -- --port 4173
node tests/browser.mjs
```

Os testes visuais em Chromium foram preparados para larguras 1440, 390 e 320 px, usando servidor de preview em localhost:4173. Não afirmar que passaram sem executá-los.

## Funil atual

1. Headline com **MUDAR** destacado.
2. Vídeo novo no topo (Bunny `d2a9373d-c63a-40cd-a8f6-de534092b06f`).
3. Depoimentos em imagem enviados pela organização e exibidos por faixas responsivas, sem alteração de conteúdo (`public/depoimentos-novos.avif`).
4. Botão principal vermelho e botão verde do WhatsApp.
5. Benefícios: Dinheiro, Saúde, Amor, Família.
6. Vídeo anterior em destaque na segunda chamada (Bunny `0d6de8ec-bba4-4c8f-ad0c-03a15a51c987`).
7. Oferta única com desconto anunciado, parcelamento, botão de compra e suporte.
8. FAQ e rodapé.

A página de vendas do Grimório não apresenta blocos de arrecadação ou alimentação infantil. A iniciativa social separada não foi modificada.

## Configuração

Copie `.env.example` para `.env.local`, ou configure na Vercel. Variáveis `VITE_` são públicas.

- `VITE_CHECKOUT_URL`: opcional, checkout Cakto padrão `https://pay.cakto.com.br/876y8h4_1309579`. Todos os botões de compra usam essa oferta única. Só são aceitos HTTPS e hostnames Cakto autorizados. **O checkout real não foi verificado automaticamente**: conferir se o total cobrado está em R$ 19,90 e se 4x de R$ 5,37 está disponível (total R$ 21,48). Não mudar o preço da oferta na Cakto sem considerar eventuais taxas extras; a landing page não altera o checkout.
- `VITE_WHATSAPP_NUMBER`: padrão `5511942353966`; redirecionamento por `wa.me` com mensagem pré-preenchida.
- `VITE_HERO_VIDEO_EMBED_URL`: opcional, novo vídeo Bunny no topo.
- `VITE_TESTIMONY_VIDEO_EMBED_URL`: opcional, vídeo anterior na seção de compra.
- `VITE_PRIVACY_URL` e `VITE_TERMS_URL`: documentos reais de compra, entrega e privacidade; links omitidos enquanto não configurados.

Os players usam iframe HTTPS, `loading=lazy`, `autoplay=false`, `preload=false`; não reproduzem automaticamente com som.

**Antes de anunciar:** verificar se o preço anterior de R$ 197,00 foi realmente praticado como referência, se a promoção possui prazo real, se as parcelas correspondem à Cakto e se os temas informados aparecem na edição digital entregue. Relatos de clientes descrevem experiências individuais, não asseguram resultados de saúde, financeiros ou espirituais.

## Meta Pixel

Meta Pixel de ID `2202753393610846` instalado em `index.html` (script no head e fallback noscript no body). O evento `PageView` é registrado na visita. Nenhum `Purchase` é disparado na landing page. Registrar `Purchase` somente após confirmação de pagamento no checkout da Cakto. Evitar duplicações entre Pixel e API de Conversões. Validar recebimento no Gerenciador de Eventos da Meta.

## Vercel

Repositório `adalgizagon-bot/grimorio-sao-bento`, branch `main`; Vite, build `npm run build`, saída `dist`. O site do Projeto Renascer com Fé é independente e não foi alterado.
