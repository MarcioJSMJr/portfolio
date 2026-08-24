import { Code2, Database, Layout, Terminal, Cpu, Sparkles } from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: {
    name: string;
    description: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Front-end Moderno',
    icon: Layout,
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
    skills: [
      { name: 'React 19', description: 'Server Components, Hooks, Concurrent Features' },
      { name: 'Next.js (App Router)', description: 'Rotas dinâmicas, SSR, SSG, Turbopack' },
      { name: 'TypeScript', description: 'Tipagem estrita, interfaces, generics' },
      { name: 'Tailwind CSS v4', description: 'Design responsivo, temas dark/light, micro-interações' },
    ],
  },
  {
    title: 'Back-end & Arquitetura',
    icon: Terminal,
    color: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
    skills: [
      { name: 'Node.js', description: 'APIs assíncronas, manipulação de streams e eventos' },
      { name: 'Server Actions', description: 'Mutação de dados segura com revalidação de rotas' },
      { name: 'REST & GraphQL APIs', description: 'Modelagem de endpoints, autenticação e validação' },
      { name: 'Arquitetura Limpa', description: 'Modularidade, escalabilidade e manutenibilidade' },
    ],
  },
  {
    title: 'Banco de Dados & ORM',
    icon: Database,
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    skills: [
      { name: 'PostgreSQL', description: 'Modelagem relacional, queries avançadas e índices' },
      { name: 'Supabase', description: 'BaaS, autenticação, storage e banco gerenciado' },
      { name: 'Prisma ORM v7', description: 'Driver adapters, migrations, tipagem end-to-end' },
      { name: 'Modelagem de Dados', description: 'Normalização, relações 1:N e N:N' },
    ],
  },
  {
    title: 'DevOps & Ferramentas',
    icon: Cpu,
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
    skills: [
      { name: 'Git & GitHub', description: 'Versionamento, pull requests, conventional commits' },
      { name: 'Vercel Deploy', description: 'CI/CD contínuo, variáveis de ambiente e Edge' },
      { name: 'Docker', description: 'Conteinerização de ambientes de desenvolvimento' },
      { name: 'ESLint & Prettier', description: 'Padronização e qualidade de código' },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="habilidades" className="py-20 border-t border-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho da Seção */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tech Stack & Competências</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tecnologias & Habilidades
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto">
            Ferramentas e tecnologias que utilizo diariamente para transformar ideias em aplicações robustas e escaláveis.
          </p>
        </div>

        {/* Grid de Categorias de Habilidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-all hover:bg-neutral-900/70 space-y-5 group"
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.color} border`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                </div>

                {/* Lista de Habilidades */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60 hover:border-neutral-700 transition-colors space-y-1"
                    >
                      <span className="text-sm font-semibold text-neutral-200 block">
                        {skill.name}
                      </span>
                      <p className="text-[12px] text-neutral-400 leading-tight">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
