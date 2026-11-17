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


## Novo checkout Pix simplificado (ativação por variável de ambiente)

Rota independente de testes: `/pix.html`. O site principal e seus botões para o checkout tradicional Cakto permanecem inalterados. A função `api/pix/create.js` retorna 503 e **não cria cobranças** enquanto `CAKTO_PIX_ENABLED` não for `true`. Não há dados bancários ou credenciais no Git.

### Configuração na Vercel

Em **grimorio-sao-bento → Settings → Environment Variables**, adicione as variáveis no ambiente desejado:

- `CAKTO_CLIENT_ID` (secret): identificador da chave Cakto API.
- `CAKTO_CLIENT_SECRET` (secret): segredo privado da API. Não usar `VITE_`, não adicionar ao repositório.
- `CAKTO_OFFER_ID` (servidor): ID de uma **oferta ativa** do Grimório. O valor final da cobrança vem da resposta da Cakto, sem bloqueio por preço fixo. Não confundir com o link `pay.cakto.com.br`.
- `TURNSTILE_SECRET_KEY` (secret): chave privada do Cloudflare Turnstile.
- `VITE_TURNSTILE_SITE_KEY` (pública): chave pública do Turnstile. Configure os domínios de produção e preview usados.
- `CAKTO_PIX_ENABLED=false` inicialmente; somente trocar para `true` após verificação técnica, segurança, preço final, privacidade e teste de entrega.

O Turnstile é validado **no servidor** antes de criar uma cobrança; sem ele ou sem qualquer credencial, o endpoint recusa pagamentos. O comprador informa nome completo, CPF válido, WhatsApp com DDD e e-mail. Dados são encaminhados diretamente à Cakto via HTTPS, sem `localStorage` de informações pessoais. O identificador da intenção é enviado como `X-Idempotency-Key` na criação. A página mostra o Pix copia e cola e o QR gerado localmente pela biblioteca MIT `public/vendor/qrcode.min.js`. O valor final retornado pela Cakto é exibido ao comprador, sem exigir preço fixo. A cobrança deve ter valor positivo válido e pertencer à oferta ativa do produto. O cliente pode consultar status de pagamento por `api/pix/status.js`, com token assinado pelo servidor e GET autenticado do pedido na Cakto.

**O que falta antes de ativar:** confirmar `CAKTO_OFFER_ID` (oferta correta/ativa), configurar credenciais em ambiente protegido, registrar as condições de privacidade/entrega/reembolso e testar uma compra real de baixo valor com o responsável. A criação da cobrança pode funcionar mesmo que a entrega digital não esteja automatizada; verificar como a Cakto libera esse produto quando a venda vem da API. **Não existe envio automático pelo WhatsApp nesta implementação.** O acesso continua sujeito às regras de entrega configuradas na Cakto ou à orientação do suporte.

Não registrar `Purchase` por clique ou Pix gerado. Só contabilizar a compra depois de `paid` validado. Ainda não foi criado webhook: a página consulta a API de pedidos enquanto permanece aberta. Para garantir conciliação de todos os pedidos e recuperação de cobranças, configure webhook assinado com persistência e deduplicação em etapa posterior.

Comandos locais: `npm test`, `npm run build` e `node tests/browser.mjs` (para a página principal com preview rodando).

