# Contexto do Projeto: Portfólio Full Stack

## 🛠️ Stack & Arquitetura
- **Framework:** Next.js (App Router) com TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** PostgreSQL hospedado no Supabase (Região: São Paulo)
- **ORM:** Prisma v7
- **Estrutura de Pastas:** `src/app/` (páginas/rotas) e `src/lib/` (utilitários como `prisma.ts`)

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
- [ ] Conectar o projeto na Vercel e configurar as variáveis de ambiente de produção.