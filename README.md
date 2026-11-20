# Catálogo de Pintura — Robson Barbosa

<div align="center">

### Site comercial com captação de orçamentos e análise de conversões

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io/)

**[Código no GitHub](https://github.com/Davi-silv/catalogo-pintura)** · **[Portfólio do desenvolvedor](https://portifolio-future.vercel.app/)**

</div>

## Sobre o projeto

Site comercial voltado à **apresentação de serviços de pintura e geração de pedidos de orçamento**. A experiência foi estruturada para apresentar projetos, antes e depois, informações de serviços e chamadas para contato pelo WhatsApp.

Além da interface, o repositório documenta **rastreamento de eventos**, **API própria** e armazenamento em **PostgreSQL**, recursos relevantes para analisar a jornada de conversão.

## Funcionalidades documentadas

| Área | Recursos |
| --- | --- |
| Vitrine comercial | Apresentação de serviços, projetos e comparações antes/depois |
| Captação | Chamadas para solicitar orçamento pelo WhatsApp |
| Métricas | Painel em `/admin/metrics` protegido por token configurado |
| Eventos | Rastreamento de visualizações e interações, incluindo orçamento e contato |
| Marketing | Suporte a parâmetros UTM e integração opcional com GA4 |
| Persistência | API `POST /api/events` e banco PostgreSQL via Prisma |

## Tecnologias e arquitetura

- **Interface:** Next.js 16, React 19, TypeScript e Tailwind CSS 4.
- **Banco de dados:** PostgreSQL com Prisma.
- **Validação:** Zod.
- **Deploy:** build para ambiente Node.js, com orientação para hospedagem na Vercel.

O projeto separa experiência pública, rotas de API e persistência de eventos. O uso do PostgreSQL é importante em hospedagens com armazenamento temporário, como funções serverless.

## Executar localmente

**Pré-requisitos:** Node.js 20+, npm e Docker para a opção de PostgreSQL local.

```bash
git clone https://github.com/Davi-silv/catalogo-pintura.git
cd catalogo-pintura
cp .env.example .env
npm install
npm run db:up
npm run db:deploy
npm run dev
```

Acesse **http://localhost:3010**. Configure as variáveis no arquivo `.env` antes de executar as migrações.

### Configurações

| Variável | Finalidade |
| --- | --- |
| `DATABASE_URL` | Conexão PostgreSQL |
| `NEXT_PUBLIC_BRAND_NAME` | Nome exibido da marca |
| `NEXT_PUBLIC_WHATSAPP` | Contato com DDI |
| `NEXT_PUBLIC_GA4_ID` | Integração opcional com Google Analytics |
| `ADMIN_METRICS_TOKEN` | Acesso ao painel de métricas |

**Nunca publique tokens administrativos ou credenciais de banco.** Variáveis `NEXT_PUBLIC_` são destinadas ao navegador e não devem conter segredos.

### Comandos

| Comando | Função |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build e preparação do Prisma |
| `npm run lint` | Verificação com ESLint |
| `npm run db:up` | Inicializa PostgreSQL via Docker |
| `npm run db:deploy` | Aplica migrações existentes |
| `npm run db:migrate` | Desenvolvimento de migrações |

## Implantação

A documentação original orienta publicação na **Vercel** com banco PostgreSQL externo (por exemplo, Neon). Em produção, configure `DATABASE_URL`, `ADMIN_METRICS_TOKEN` e demais variáveis do ambiente antes do deploy. Verifique as migrações e os endpoints em ambiente seguro.

## Autoria

Desenvolvido por **Davi Barbosa da Silva**, fundador da **Evolutiva Tech**.

[GitHub](https://github.com/Davi-silv) · [Portfólio](https://portifolio-future.vercel.app/) · [LinkedIn](https://www.linkedin.com/in/davi-barbosa-silva/)

---

<sub>Projeto de desenvolvimento web, mensuração de eventos e integração com banco de dados.</sub>
