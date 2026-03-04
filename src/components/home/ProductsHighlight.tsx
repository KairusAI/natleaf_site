import { Link } from "react-router-dom";
import { ArrowRight, Brain, Moon, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    href: "/produtos/wellness",
    icon: Leaf,
    image: "/assets/wellness.avif",
    name: "Natleaf Wellness",
    focus: "Bem-estar geral e equilíbrio diário",
    formula: "Whole Spectrum CBD",
    tagline: "Transforme sua rotina diária com equilíbrio e harmonia",
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-500/20",
    badge: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/produtos/brain",
    icon: Brain,
    image: "/assets/brain.avif",
    name: "Natleaf Brain",
    focus: "Concentração, clareza mental e cognição",
    formula: "CBD + CBG (Canabigerol)",
    tagline: "Clareza mental, energia cerebral e foco maximizados",
    color: "from-yellow-500/10 to-pink-600/5",
    border: "border-yellow-500/20",
    badge: "bg-yellow-50 text-yellow-700",
  },
  {
    href: "/produtos/sleep",
    icon: Moon,
    image: "/assets/sleep.avif",
    name: "Natleaf Sleep",
    focus: "Qualidade do sono e descanso profundo",
    formula: "CBD + CBN + Melatonina (6mg)",
    tagline: "Noites de sono profundo e revigorantes",
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-500/20",
    badge: "bg-violet-50 text-violet-700",
  },
];

export function ProductsHighlight() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Nossa Linha</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Produtos Natleaf
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Três fórmulas exclusivas desenvolvidas com tecnologia de extração proprietária TDC™ para atender diferentes necessidades terapêuticas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.href}
                className={`relative group rounded-3xl border ${p.border} bg-gradient-to-b ${p.color} p-8 flex flex-col hover:shadow-lg hover:scale-[1.02] transition-all duration-300`}
              >
                {/* Product image */}
                <div className="flex justify-center mb-6">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-32 h-32 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${p.badge}`}>
                  <Icon className="w-3.5 h-3.5" />
                  {p.formula}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{p.focus}</p>
                <p className="text-foreground/80 text-base italic mb-8 flex-1">"{p.tagline}"</p>

                <Link to={p.href}>
                  <Button
                    variant="outline"
                    className={`w-full rounded-xl border-current gap-2 group-hover:bg-foreground/5 transition-colors`}
                  >
                    Saiba mais
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/produtos">
            <Button variant="ghost" className="text-primary hover:text-primary/80 gap-1">
              Ver linha completa <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
