# Robson Barbosa — Catálogo comercial de pintura

Site pensado para gerar orçamentos: atrair → envolver → gerar confiança → WhatsApp.

## Como rodar

```bash
npm install
npx prisma migrate dev
npm run dev
```

Abra [http://localhost:3010](http://localhost:3010) *(porta 3010 para não conflitar com outros projetos)*.

## Variáveis de ambiente (`.env`)

| Variável | Função |
|---|---|
| `NEXT_PUBLIC_BRAND_NAME` | Nome da marca (Robson Barbosa) |
| `NEXT_PUBLIC_WHATSAPP` | WhatsApp com DDI (`5521991060924`) |
| `NEXT_PUBLIC_GA4_ID` | ID do Google Analytics 4 (opcional) |
| `ADMIN_METRICS_TOKEN` | Senha do painel de métricas |
| `DATABASE_URL` | Banco SQLite (`file:./dev.db`) |

## Painel de métricas

Acesse: `/admin/metrics?token=SEU_TOKEN`

Mostra visitantes, projetos vistos, vídeos, antes/depois, WhatsApp, orçamentos, taxa de conversão, origem e campanha.

## Jornada do site

1. **Atenção** — Hero com vídeo + “Solicitar orçamento”
2. **Interesse** — Projetos
3. **Desejo** — Antes e depois
4. **Confiança** — Processo, diferenciais e avaliações
5. **Intenção** — Botões no contexto do que a pessoa viu
6. **Ação** — Contato pelo WhatsApp

## Rastreamento

Cada ação importante vira um evento (página, projeto, serviço, vídeo, antes/depois, WhatsApp, orçamento, contato).

Os dados vão para:
- **Google Analytics 4** (se o ID estiver configurado)
- **API própria** (`POST /api/events`) gravada no SQLite

Parâmetros de campanha preservados: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`.
