# Grimório de São Bento

Landing page independente, em português, com oferta promocional apresentada como de R$ 197,00 por R$ 19,00. Vite e JavaScript, sem framework, fontes externas ou serviços obrigatórios.

## Desenvolvimento

Node.js 22.12+ (validado com 24.22.1).

```sh
npm ci --cache /tmp/grimorio-npm-cache
npm run dev
npm test
npm run build
npm run preview -- --port 4173
node tests/browser.mjs
```

A verificação de navegador usa Chromium em `/usr/bin/chromium` e gera capturas em `/tmp/grimorio-*.png`. Testa 1440, 390 e 320 px. O preview deve estar em execução. Cada tarefa na nuvem já é isolada: use este checkout, sem criar worktrees.

## Configuração da compra

Copie `.env.example` para `.env.local`, ou configure as mesmas variáveis na Vercel e refaça o build. Nenhuma dessas variáveis deve conter segredos: variáveis `VITE_` são públicas.

- `VITE_CHECKOUT_URL`: opcional. O checkout Cakto padrão do Grimório é `https://pay.cakto.com.br/876y8h4_1309579`; em 11/11/2026 a organização confirmou ter atualizado seu preço para **R$ 19,00** e autorizou a liberação. Ambos os botões de compra levam diretamente a esse checkout. A variável permite alterar a URL sem modificar o código; somente links HTTPS dos domínios Cakto aceitos são usados. A confirmação do preço foi fornecida pela organização, não verificada automaticamente pelo site.
- `VITE_WHATSAPP_NUMBER`: número oficial com país e DDD, somente dígitos. O padrão é `5511942353966`, informado pelo responsável. A variável permite substituir esse número; uma substituição inválida desativa o link.
- `VITE_VSL_MP4_URL` ou `VITE_VSL_EMBED_URL`: HTTPS; MP4 tem prioridade. A página já usa como padrão o vídeo vertical da Bunny Stream informado pela organização (`/embed/805897/0d6de8ec-bba4-4c8f-ad0c-03a15a51c987`). O iframe usa `loading="lazy"` e o player Bunny recebe `autoplay=false&preload=false`; a miniatura aparece com o próprio botão de Play da Bunny, sem baixar antecipadamente o vídeo. Os controles compactos e a reprodução no celular são configurados no URL do player.
- `VITE_PRIVACY_URL` e `VITE_TERMS_URL`: links HTTPS para documentos reais, com política de reembolso e entrega digital. Enquanto ausentes, não são exibidos links vazios nem textos técnicos de configuração.

Confirmar os temas com o arquivo real do livro, substituir a capa ilustrativa se necessário, publicar os canais oficiais e a prestação de contas. Validar com a organização a destinação integral das vendas, o complemento de R$ 1,00 e o custeio separado das taxas antes de abrir as vendas. Confirmar que R$ 197,00 representa um preço de referência legítimo antes de anunciar a promoção.

A página agora começa com uma chamada breve e a VSL. Logo em seguida aparece a imagem exata de depoimentos enviada pela organização, agora otimizada como `public/depoimentos-novos.avif`. No desktop ela é exibida em duas faixas horizontais e no smartphone em quatro quadrantes verticais, apenas por recorte CSS do mesmo arquivo, sem alterar palavras, fotos ou elementos originais. Um clique permite abrir o arquivo completo. Abaixo dos relatos aparecem o botão de compra vermelho bordô, informações de pagamento digital e o botão verde do WhatsApp. A seção seguinte apresenta os temas das orações; depois vem a oferta única e as informações solidárias. Os textos da oferta continuam em R$ 19,00, conforme preço atualizado pela organização em novembro de 2026.


## Meta Pixel

Não existia Pixel neste checkout. Nenhum evento Purchase é disparado na landing page ou no clique. Quando houver uma integração real, registrar Purchase somente na confirmação de pagamento da Cakto; se houver Pixel e API de Conversões, compartilhar `event_id` para deduplicação. Não inserir um segundo rastreamento sem conferir a configuração da plataforma.

## Vercel

Importar somente `adalgizagon-bot/grimorio-sao-bento`. Framework: Vite; build: `npm run build`; saída: `dist`. Para preview autenticado: `vercel deploy` (sem `--prod`). A URL padrão do checkout já está no código; `VITE_CHECKOUT_URL` é necessária apenas para substituí-la. Esta página não altera o site principal do projeto.
