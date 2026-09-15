# Contexto do Projeto: Portfólio Full Stack

## 🛠️ Stack & Arquitetura
- **Framework:** Next.js (App Router) com TypeScript
- **Estilização:** Tailwind CSS v4 (tokens em `src/app/globals.css` via `@theme`)
- **Banco de Dados:** PostgreSQL hospedado no Supabase (Região: São Paulo)
- **ORM:** Prisma v7
- **Tema:** `next-themes` (claro/escuro)
- **Estrutura de Pastas:**
  - `src/app/` — páginas/rotas (Hub `/`, Projetos, Diário, Admin, redirect `/links` → `/`)
  - `src/components/ui/` — primitivos compartilhados (`PageShell`, `Container`, `PageHeader`, `EmptyState`, `Tag`, `SocialIconLink`)
  - `src/components/hub/` — UI do Hub Linktree (`HubPage`, `HubProfile`, `HubLinkCard`, `HubSocials`)
  - `src/components/` — Navbar, Footer, explorers públicos, `ShareButton`, tema
  - `src/lib/` — utilitários (`prisma.ts`, auth)
  - `src/actions/` — server actions (perfil, links, projetos, posts, GitHub sync)

## 🗄️ Esquema do Banco de Dados
- **`Profile`**: `id` ("me"), `name`, `bio`, `avatar`, `email`, `github`, `linkedin`, `twitter`
- **`QuickLink`**: `id`, `title`, `url`, `icon`, `highlight` (Boolean), `order` (Int)
- **`Project`**: `id`, `githubId` (Int? @unique), `title`, `description`, `tags`, `repoUrl`, `liveUrl`, `imageUrl`, `stars` (Int), `isCustom` (Boolean), `published` (Boolean), `createdAt`, `updatedAt`
- **`Post`**: `id`, `title`, `slug` (unique), `content` (Text), `published` (Boolean), `createdAt`, `updatedAt`

## 📌 Configurações de Conexão & Segurança
- Arquivo de configuração: `prisma.config.ts` (Prisma 7 usa `datasource: { url: process.env.DIRECT_URL }` para migrações).
- As credenciais de banco ficam no `.env` (`DATABASE_URL` e `DIRECT_URL`).
- Proteção da rota administrativa via `ADMIN_PASSWORD` no `.env` (com cookie HttpOnly `admin_session`).
- O Prisma Client Singleton está instanciado em `src/lib/prisma.ts` utilizando o driver adapter `@prisma/adapter-pg` e o cliente gerado em `src/generated/prisma`.
- Páginas públicas (Hub, Projetos, Diário) degradam com `.catch()` / empty state / 404 quando o banco estiver offline — não devem retornar 500.

## 🎨 Hub & Páginas Públicas
- A home (`/`) é um **Hub estilo Linktree**: card-painel glass (`max-w-xl` centralizado), kicker de disponibilidade, monograma quando não há avatar, stats (projetos/posts), `HubLinkCard` unificado e redes sociais. **O Hub permanece estreito de propósito** — não usa o Container full-bleed.
- Fundo compartilhado via `PageShell` (grade + glow azul/roxo); tema/compartilhar ficam **dentro** do painel do Hub.
- Demais páginas públicas (`/projects`, `/journal`, Navbar, Footer) usam `Container` com `size="full"` (`max-w-none` + padding lateral) para ocupar a largura da tela. Artigo individual (`/journal/[slug]`) fica em `size="lg"` para leitura confortável.
- Navbar sticky com logo **Marcio Tech** (`/brand/marcio-tech-logo.png`), menu segmentado **centralizado** (via `absolute left-1/2 -translate-x-1/2`) e estado ativo via `usePathname`. Favicon em `/favicon.ico` + `/icon.png`.
- Em Projetos, busca compacta (`max-w-md`) e filtros de stack ficam **na mesma linha**; no Diário a busca compacta fica ao lado do contador.
- `/links` apenas redireciona para `/` (clone removido; `ShareButton` vive em `src/components/`).

## 🎯 Progresso & Próximos Passos
- [x] Correção de tipagem e configuração do Prisma v7 com driver adapter `@prisma/adapter-pg`.
- [x] Reestruturação da Raiz (`src/app/page.tsx`) como Hub / Linktree moderno com botões dinâmicos e dados de `Profile`.
- [x] Criação da rota dedicada para projetos (`src/app/projects/page.tsx`).
- [x] Criação do Módulo de Diário / Posts (`src/app/journal/page.tsx` e `src/app/journal/[slug]/page.tsx`).
- [x] Painel Admin (`/admin`) completo e protegido com abas para Perfil, Links do Hub, Projetos e Diário.
- [x] Suporte a Tema Dinâmico Claro/Escuro (Dark/Light mode via `next-themes` com `ThemeToggle` na Navbar, Hub e Admin).
- [x] Auditoria de dinamismo total no Hub, Projetos, Diário e Links (100% integrados ao Supabase via Prisma).
- [x] Integração com `@vercel/speed-insights` e `@vercel/analytics` no RootLayout para métricas de performance e tráfego.
- [x] Sincronização Automática com API do GitHub (`src/actions/github-sync.ts`) com upsert, estrelas, tags e toggle de visibilidade.
- [x] Vitrines Públicas Interativas (`/projects` e `/journal`) com busca instantânea, filtro por tags/stack e paginação.
- [x] Painel Analítico de Visão Geral no Admin (`/admin`) com KPIs, gráfico de distribuição de stack e feed de atividades.
- [x] Gerenciamento de Projetos via Modais Elegantes (Criação, Edição, Alternância de Visibilidade e Confirmação de Exclusão).
- [x] Hub mais presente (card-painel, monograma, stats, fundo grade+glow) e primitivos UI compartilhados (`src/components/ui/` + `src/components/hub/`).
- [x] Limpeza de código morto: seções de landing órfãs, clone `/links`, forms admin substituídos por modais; degradê graceful sem banco.
- [x] Layout full-bleed nas vitrines/Navbar/Footer (Hub continua centralizado); Navbar redesenhada (marca terminal + nav segmentada).
- [x] Branding Marcio Tech na Navbar + favicon; menu centralizado; busca/filtros em linha nas vitrines.
- [ ] Reorganizar pastas do Admin por domínio (profile / projects / posts / analytics) — próximo passo.
- [ ] Conectar o projeto na Vercel e configurar as variáveis de ambiente de produção.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
