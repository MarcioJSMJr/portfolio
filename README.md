# 🚀 Modern Full Stack Portfolio & Linktree Hub

Um portfólio moderno, modular e dinâmico construído com **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Prisma ORM v7** e **PostgreSQL (Supabase)**.

---

## ✨ Principais Funcionalidades

- 🌐 **Hub Central Minimalista (`/`):** Estilo Linktree moderno com perfil dinâmico, botões interativos, links customizados e redes sociais.
- 💼 **Showcase de Projetos (`/projects`):** Listagem dinâmica de projetos com imagens de capa, tags, links para repositório e demonstração online.
- 📖 **Diário Técnico & Artigos (`/journal` & `/journal/[slug]`):** Blog pessoal com tempo estimado de leitura e renderização dinâmica.
- 🔒 **Painel Administrativo Privado (`/admin`):** Protegido por senha mestra e cookie HttpOnly, com abas para gerenciamento completo de:
  - 👤 **Perfil:** Nome, biografia, foto de exibição e links sociais.
  - 🔗 **Links do Hub:** Cadastro, ordenação e destaque de botões.
  - 💼 **Projetos:** Cadastro, validação de tags/URLs e exclusão.
  - 📖 **Diário:** Criação e controle de publicação de artigos.
- 🌓 **Tema Dinâmico (Dark / Light Mode):** Alternador de temas com `next-themes` e cores balanceadas para ambos os modos.

---

## 🛠️ Stack Tecnológica

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) hospedado no [Supabase](https://supabase.com/)
- **ORM:** [Prisma v7](https://www.prisma.io/) com driver adapter `@prisma/adapter-pg`
- **Temas:** [`next-themes`](https://github.com/pacocoursey/next-themes)
- **Ícones:** [`lucide-react`](https://lucide.dev/)

---

## 🚀 Como Executar Localmente

### 1. Clone o repositório e instale as dependências:

```bash
git clone https://github.com/MarcioJSMJr/portfolio.git
cd portfolio
npm install
```

### 2. Configure as Variáveis de Ambiente:

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:

```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
ADMIN_PASSWORD="sua_senha_aqui"
```

### 3. Sincronize o Banco de Dados com o Prisma:

```bash
npx prisma db push
npx prisma generate
```

### 4. Inicie o Servidor de Desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📜 Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Executa o build de produção com validação de tipos.
- `npm run start`: Inicia o servidor em modo de produção.
- `npm run lint`: Executa a verificação do ESLint.

---

## 📄 Licença

Distribuído sob a licença MIT. Sinta-se livre para utilizar e customizar para o seu próprio portfólio!
