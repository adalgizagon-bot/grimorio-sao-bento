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

## Configuração antes das vendas

Copie `.env.example` para `.env.local`, ou configure as mesmas variáveis na Vercel e refaça o build. Nenhuma dessas variáveis deve conter segredos: variáveis `VITE_` são públicas.

- `VITE_CHECKOUT_URL`: **checkout Cakto específico para o Grimório**, somente depois de confirmar preço e entrega digital. A organização enviou `https://pay.cakto.com.br/876y8h4_1309579`, que em 11/11/2026 apresentava o produto correto, porém preço de **R$ 19,90**, enquanto a landing page e as artes anunciam **R$ 19,00**. **Não ativar a compra até essa divergência ser resolvida pela organização.** A validação de domínio não verifica preço ou entrega; sem URL configurada, o botão continua desativado.
- `VITE_WHATSAPP_NUMBER`: número oficial com país e DDD, somente dígitos. O padrão é `5511942353966`, informado pelo responsável. A variável permite substituir esse número; uma substituição inválida desativa o link.
- `VITE_VSL_MP4_URL` ou `VITE_VSL_EMBED_URL`: HTTPS; MP4 tem prioridade. A página já usa como padrão o vídeo vertical da Bunny Stream informado pela organização (`/embed/805897/0d6de8ec-bba4-4c8f-ad0c-03a15a51c987`). O player só é inserido após o visitante clicar na capa, para não baixar o vídeo ao abrir a página. O vídeo pode iniciar automaticamente somente como resultado desse clique; controles compactos e reprodução no celular são configurados no URL do player.
- `VITE_PRIVACY_URL` e `VITE_TERMS_URL`: links HTTPS para documentos reais, com política de reembolso e entrega digital. Enquanto ausentes, não são exibidos links vazios nem textos técnicos de configuração.

Confirmar os temas com o arquivo real do livro, substituir a capa ilustrativa se necessário, publicar os canais oficiais e a prestação de contas. Validar com a organização a destinação integral das vendas, o complemento de R$ 1,00 e o custeio separado das taxas antes de abrir as vendas. Confirmar que R$ 197,00 representa um preço de referência legítimo antes de anunciar a promoção.

A seção de depoimentos exibe diretamente a imagem `depoimentos.png` enviada pela organização, sem edição do conteúdo ou verificação independente de autenticidade. No desktop ela aparece inteira; no celular, duas visualizações responsivas recortam visualmente suas colunas, com acesso à imagem original ao tocar. Não reutilizar os depoimentos de doadores do Projeto Renascer com Fé como avaliações do Grimório. A campanha da oferta usa imagens WebP responsivas em `public/`. Sem checkout validado, o botão principal permanece desativado com o rótulo “Compra disponível em breve”; o atendimento por WhatsApp permanece acessível.

## Meta Pixel

Não existia Pixel neste checkout. Nenhum evento Purchase é disparado na landing page ou no clique. Quando houver uma integração real, registrar Purchase somente na confirmação de pagamento da Cakto; se houver Pixel e API de Conversões, compartilhar `event_id` para deduplicação. Não inserir um segundo rastreamento sem conferir a configuração da plataforma.

## Vercel

Importar somente `adalgizagon-bot/grimorio-sao-bento`. Framework: Vite; build: `npm run build`; saída: `dist`. Para preview autenticado: `vercel deploy` (sem `--prod`). Não cadastrar `VITE_CHECKOUT_URL` até conferir o novo checkout. Esta página não altera o site principal do projeto.
