import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Brain, Moon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";

const products = [
  {
    href: "/produtos/wellness",
    icon: Leaf,
    image: "/assets/wellness.avif",
    name: "Natleaf Wellness",
    tagline: "Descubra uma nova maneira de cuidar do seu bem-estar",
    focus: "Equilíbrio diário e bem-estar geral",
    formula: "Whole Spectrum CBD",
    benefits: ["Equilíbrio e harmonia na rotina diária", "Propriedades anti-inflamatórias", "Suporte ao sistema imune", "Seguro para crianças e idosos"],
    color: "from-emerald-500/10 to-emerald-600/5",
    border: "border-emerald-200",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    badgeBg: "bg-emerald-100 text-emerald-700",
  },
  {
    href: "/produtos/brain",
    icon: Brain,
    image: "/assets/brain.avif",
    name: "Natleaf Brain",
    tagline: "Aprimore sua vida ativa e aumente sua concentração",
    focus: "Cognição, foco e saúde neurológica",
    formula: "CBD + CBG (Canabigerol)",
    benefits: ["Melhora da clareza mental e foco", "Propriedades neuroprotetoras (CBG)", "Aumento da energia cerebral", "Suporte à função cognitiva"],
    color: "from-yellow-500/10 to-pink-600/5",
    border: "border-yellow-500/20",
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-50",
    badgeBg: "bg-yellow-50 text-yellow-700",
  },
  {
    href: "/produtos/sleep",
    icon: Moon,
    image: "/assets/sleep.avif",
    name: "Natleaf Sleep",
    tagline: "Uma noite de descanso profundo e renovador",
    focus: "Qualidade do sono e descanso",
    formula: "CBD (1000mg) + CBN (500mg) + Melatonina (6mg)",
    benefits: ["Sono mais profundo e reparador", "Regulação do ritmo circadiano", "Redução do estresse e ansiedade", "Alívio da dor que dificulta o sono"],
    color: "from-violet-500/10 to-violet-600/5",
    border: "border-violet-200",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    badgeBg: "bg-violet-100 text-violet-700",
  },
];

export default function Produtos() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Nossa Linha</span>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Produtos Natleaf
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Três fórmulas exclusivas desenvolvidas com a Tecnologia de Desconstrução Celular™ (TDC) para atender diferentes necessidades terapêuticas com máxima eficácia.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 space-y-12">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.href}
                className={`rounded-3xl border ${p.border} bg-gradient-to-br ${p.color} p-8 md:p-12`}
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-12 h-12 rounded-xl ${p.iconBg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${p.iconColor}`} />
                      </div>
                      <div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.badgeBg}`}>{p.formula}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{p.name}</h2>
                    <p className="text-primary font-medium italic mb-4">"{p.tagline}"</p>
                    <p className="text-muted-foreground mb-6">{p.focus}</p>

                    <ul className="space-y-2 mb-8">
                      {p.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-foreground/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-3">
                      <Link to={p.href}>
                        <Button className="rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                          Ver detalhes completos
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" className="rounded-xl gap-2 border-border/60">
                        <Download className="w-4 h-4" />
                        Laudo COA
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Product image */}
                    <div className={`flex items-center justify-center rounded-2xl ${p.iconBg} py-6`}>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-40 h-40 object-contain drop-shadow-lg"
                      />
                    </div>

                    <div className="p-5 rounded-2xl bg-white/70 border border-white/50 backdrop-blur-sm">
                      <h3 className="text-sm font-semibold text-foreground mb-3">Informações Técnicas</h3>
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-border/30">
                          <tr>
                            <td className="py-2 text-muted-foreground">Tipo</td>
                            <td className="py-2 text-right font-medium text-foreground">Whole Spectrum</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">Extração</td>
                            <td className="py-2 text-right font-medium text-foreground">TDC™</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">Fórmula</td>
                            <td className="py-2 text-right font-medium text-foreground">{p.formula}</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">Administração</td>
                            <td className="py-2 text-right font-medium text-foreground">Sublingual</td>
                          </tr>
                          <tr>
                            <td className="py-2 text-muted-foreground">COA</td>
                            <td className="py-2 text-right">
                              <span className="text-primary font-medium cursor-pointer hover:underline">Download</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 text-xs text-muted-foreground">
                      Uso conforme prescrição médica individualizada. Consulte always um médico antes de iniciar ou alterar o tratamento.
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ProcessSteps title="Como Adquirir os Produtos" subtitle="Três passos simples para iniciar seu tratamento com CBD no Brasil" />
        </div>
      </section>
    </PageLayout>
  );
}
