# Robson Barbosa — Catálogo comercial de pintura

Site pensado para gerar orçamentos: atrair → envolver → gerar confiança → WhatsApp.

Compatível com **Vercel** (Next.js + PostgreSQL).

## Variáveis de ambiente

| Variável | Função |
|---|---|
| `DATABASE_URL` | PostgreSQL (Neon, Vercel Postgres ou Docker local) |
| `NEXT_PUBLIC_BRAND_NAME` | Nome da marca |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp com DDI (`5521991060924`) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 (opcional) |
| `ADMIN_METRICS_TOKEN` | Token do painel `/admin/metrics` |

## Local

```bash
cp .env.example .env
npm install
npm run db:up          # sobe Postgres no Docker
npm run db:deploy      # aplica migrations
npm run dev
```

Abra [http://localhost:3010](http://localhost:3010).

## Deploy na Vercel

1. Importe o repositório no [Vercel](https://vercel.com/new).
2. Crie um banco Postgres gratuito:
   - [Neon](https://neon.tech) (recomendado), ou
   - Storage → Postgres na própria Vercel
3. Em **Project → Settings → Environment Variables**, configure:
   - `DATABASE_URL` (connection string com `sslmode=require`; use a URL **pooled** se disponível)
   - `NEXT_PUBLIC_BRAND_NAME=Robson Barbosa`
   - `NEXT_PUBLIC_WHATSAPP=5521991060924`
   - `ADMIN_METRICS_TOKEN=` (senha forte)
   - `NEXT_PUBLIC_GA4_ID=` (opcional)
4. Faça o deploy. O `vercel.json` já roda:
   - `prisma generate`
   - `prisma migrate deploy`
   - `next build`

### Observações importantes

- **Não use SQLite na Vercel** (filesystem efêmero). Este projeto usa PostgreSQL.
- As migrations rodam no build (`prisma migrate deploy`).
- API routes usam runtime `nodejs` (exigido pelo Prisma).
- Imagens remotas do Unsplash já estão liberadas no `next.config.ts`.

## Painel de métricas

`/admin/metrics?token=SEU_TOKEN`

## Jornada do site

1. **Atenção** — Hero + “Solicitar orçamento”
2. **Interesse** — Projetos
3. **Desejo** — Antes e depois
4. **Confiança** — Processo e avaliações
5. **Intenção** — CTAs contextuais
6. **Ação** — WhatsApp

## Rastreamento

Eventos: página, projeto, serviço, vídeo, antes/depois, WhatsApp, orçamento, contato.

Destinos:
- GA4 (se configurado)
- API própria (`POST /api/events`) → PostgreSQL

UTMs preservados: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
