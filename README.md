# DDS Reformas — website

Site institucional e de conversão da **DDS Reformas** (construção, reformas e retrofit em Alphaville e região). Página única, estática, otimizada para gerar contatos qualificados pelo WhatsApp.

- **Stack:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Lucide, Lenis.
- **Sem backend:** o formulário monta a mensagem e abre o WhatsApp (`wa.me`). Nenhum dado é armazenado.

## Rodando localmente

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build && npm start
```

## Publicação na Vercel

1. Importe o repositório na Vercel (framework detectado automaticamente: Next.js).
2. Em **Settings → Environment Variables**, defina `NEXT_PUBLIC_SITE_URL` com o domínio definitivo (ex.: `https://www.seudominio.com.br`, sem barra no final). Enquanto não houver domínio, o site usa o domínio de produção da Vercel.
3. Faça o deploy. Sitemap (`/sitemap.xml`), robots (`/robots.txt`), Open Graph e canonical usam esse domínio.

Veja `.env.example` para todas as variáveis.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Nome, telefone, WhatsApp, Instagram, região, frases | `src/config/site.ts` |
| Serviços, frentes de atuação, opções do formulário | `src/content/services.ts` |
| Diferenciais, segmentos, etapas do orçamento | `src/content/company.ts` |
| **Portfólio de obras** | `src/content/projects.ts` |
| Fotos ilustrativas | `src/content/images.ts` + `src/assets/photos/` |
| Mensagens pré-preenchidas do WhatsApp | `src/lib/whatsapp.ts` |
| Cores e tipografia (tokens) | `src/app/globals.css` (`@theme`) |

### Dados pendentes (não inventados)

Em `src/config/site.ts`, os campos `email`, `address` e `cnpj` estão como `null` e **não aparecem no site** até serem confirmados pela empresa. O mesmo vale para os dados estruturados (`src/lib/structured-data.ts`): não há endereço, horário, avaliações ou números.

### Portfólio

A página `/portfolio` mostra cada obra em três etapas (**Antes → Durante a obra → Concluído**), com uma foto de destaque por etapa e galeria em tela cheia com todas as fotos. A página inicial exibe as duas primeiras obras como vitrine.

Para adicionar uma obra, salve as fotos em `src/assets/projetos/<slug>/`, importe-as em `src/content/projects.ts` e marque cada uma com a etapa (`antes`, `durante` ou `depois`). Só publique localidade ou nome de cliente com autorização.

### Fotografias

As fotos do portfólio são de obras da DDS. As demais (hero, serviços, segmentos) são de banco de imagens (Unsplash, licença de uso comercial), identificadas como **ilustrativas** no site e no rodapé. Substitua por fotos próprias quando houver material autorizado (mantendo o mesmo nome de arquivo ou atualizando `src/content/images.ts`).

A logo oficial fica em `src/assets/brand/`:
- `dds-logo.png` — logo completa (rodapé, dados estruturados);
- `dds-logo-marca.png` — recorte do símbolo + "DDS", sem as inscrições, para o cabeçalho (onde o texto pequeno ficaria ilegível). Nenhuma das versões foi redimensionada fora de proporção.

## Movimento e rolagem

- **Rolagem suave com inércia** ([Lenis](https://github.com/darkroomengineering/lenis)) no mouse/trackpad; no toque a rolagem continua nativa. É iniciada após o carregamento para não pesar na primeira renderização.
- **Revelações no scroll** (`src/components/ui/reveal.tsx`): `up` (sobe e aparece), `words` (títulos palavra por palavra com máscara), `image` (cortina vertical nas fotos) e linhas que se desenham nas listas.
- **Parallax** nas fotografias (`data-parallax="0.06"` = intensidade) e **cortina no hero**: no desktop, o hero fica fixo, escurece e recua enquanto a seção "Sobre" desliza por cima.
- **Barra de progresso** dourada na base do header.
- Com "reduzir movimento" ativado no sistema, ou sem JavaScript, todo o conteúdo aparece direto, sem animações.

Controle central: `src/components/motion/motion-controller.tsx`; estilos em `src/app/globals.css`.

## Medição (opcional)

Nada de terceiros é carregado por padrão. Ao configurar algum ID (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID` + `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL`, `NEXT_PUBLIC_META_PIXEL_ID`), o visitante vê um aviso de consentimento e os scripts só carregam após "Aceitar".

Eventos disparados (`src/lib/analytics.ts`):

| Evento | Quando | Parâmetros |
| --- | --- | --- |
| `whatsapp_click` | Qualquer botão de WhatsApp | `location` (`header`, `hero`, `floating`, `final_cta`, `segment_residencial`…) |
| `service_click` | "Consultar serviço" | `service`, `location` |
| `form_submit_whatsapp` | Envio do formulário | `service`, `property_type` |
| `instagram_click` | Link do Instagram | `location` |
| `phone_click` | Link de ligação | `location` |

Com GTM, os eventos vão para o `dataLayer`; com GA4/Ads, via `gtag`; no Meta Pixel, contatos viram o evento padrão `Contact`. Se usar GTM, evite configurar também o GA4 direto para não duplicar.

## Estrutura

```
src/
  app/            layout, página, metadados, sitemap, robots, manifest, ícones, OG
  components/
    layout/       Header, Footer, botão flutuante
    sections/     Hero, Sobre, Serviços, Segmentos, Diferenciais, Projetos, Contato/Formulário, CTA final
    ui/           botões, link rastreado, ícones de marca, revelação no scroll
    analytics/    carregamento condicionado ao consentimento
  config/         dados da empresa e IDs de medição
  content/        textos e listas editáveis
  lib/            WhatsApp, analytics, dados estruturados
```
