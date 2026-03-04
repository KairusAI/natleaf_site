import { Leaf, FlaskConical, Zap, Award } from "lucide-react";

const pillars = [
  {
    icon: Leaf,
    title: "100% Orgânico",
    description:
      "Plantas cultivadas com Boas Práticas Agrícolas (GAP). Sem pesticidas ou agrotóxicos em nenhuma etapa do cultivo.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: FlaskConical,
    title: "Testado em Laboratório",
    description:
      "Realizamos até 8 testes, desde o cultivo até o produto final. Certificados de Análise (COA) emitidos por laboratórios terceirizados independentes.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Tecnologia TDC™",
    description:
      "Tecnologia de Desconstrução Celular™ — extração sem solventes e sem produtos químicos, preservando todos os canabinoides, terpenos e flavonoides.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Award,
    title: "Certificação GMP",
    description:
      "Boas Práticas de Fabricação que garantem consciência ambiental, social e segurança em cada etapa do processo de produção.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

export function DifferentialsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Nossos Pilares</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Por que escolher a Natleaf?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Cada produto é desenvolvido com rigor científico e compromisso com a qualidade em todas as etapas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div
                key={i}
                className="flex flex-col items-start p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
              >
                <div className={`w-12 h-12 rounded-xl ${pillar.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${pillar.color}`} />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-3">{pillar.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
