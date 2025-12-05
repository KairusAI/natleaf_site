import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logoA10 from "@/assets/logo-a10.png";
import logoVish from "@/assets/logo-vish.png";
import logoRae from "@/assets/logo-rae.png";

const projects = [
  {
    name: "A10 Analytics",
    logo: logoA10,
    description: "Web App para gerenciamento de jogadores profissionais de futebol com análise de dados e métricas comparativas.",
    tags: ["Web App", "Analytics", "Esportes"],
    color: "from-blue-500/10 to-cyan-500/10",
  },
  {
    name: "Vish",
    logo: logoVish,
    description: "Plataforma que usa IA aplicada para solucionar relatos urbanos através de análise de imagens.",
    tags: ["IA", "Computer Vision", "Smart City"],
    color: "from-orange-500/10 to-amber-500/10",
  },
  {
    name: "RAE Nutrition",
    logo: logoRae,
    description: "Sistema de acompanhamento nutricional 100% IA que cria planos alimentares personalizados através de fotos e Q&A.",
    tags: ["IA", "Nutrição", "Automação"],
    color: "from-green-500/10 to-emerald-500/10",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projetos" className="relative py-16 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-base font-medium text-primary tracking-wider uppercase">
            Portfólio
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">
            Projetos em Destaque
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos com tecnologia de ponta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className={`relative h-full rounded-2xl border border-border/50 bg-gradient-to-br ${project.color} backdrop-blur-sm p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5`}>
                {/* Logo Container */}
                <div className="flex items-center justify-center h-32 mb-8">
                  <img
                    src={project.logo}
                    alt={`${project.name} logo`}
                    className="max-h-24 max-w-[180px] object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    {project.name}
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-background/80 text-muted-foreground rounded-full border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
