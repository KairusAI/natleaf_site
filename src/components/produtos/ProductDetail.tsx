import { Link } from "react-router-dom";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { ReactNode } from "react";

interface TechSpec {
  label: string;
  value: string;
}

interface ProductDetailProps {
  icon: ReactNode;
  name: string;
  tagline: string;
  formula: string;
  description: string;
  benefits: string[];
  specs: TechSpec[];
  themeColor: string; // Tailwind color prefix e.g. "emerald"
  note?: string;
  coaUrl?: string;
  productImage?: string;
}

export function ProductDetail({
  icon,
  name,
  tagline,
  formula,
  description,
  benefits,
  specs,
  themeColor,
  note,
  coaUrl,
  productImage,
}: ProductDetailProps) {
  const colorMap: Record<string, { bg: string; text: string; border: string; badgeBg: string; badgeText: string }> = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", badgeBg: "bg-emerald-100", badgeText: "text-emerald-700" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-600", border: "border-yellow-200", badgeBg: "bg-yellow-50", badgeText: "text-yellow-700" },
    blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-200", badgeBg: "bg-blue-100", badgeText: "text-blue-700" },
    violet: { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200", badgeBg: "bg-violet-100", badgeText: "text-violet-700" },
  };
  const c = colorMap[themeColor] ?? colorMap.emerald;

  return (
    <PageLayout>
      {/* Back nav */}
      <div className="border-b border-border/30 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
          <Link to="/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar para Produtos
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className={`py-20 bg-gradient-to-br from-${themeColor}-50/50 to-background`}>
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                {!productImage && (
                  <div className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center`}>
                    <span className={c.text}>{icon}</span>
                  </div>
                )}
                <span className={`text-sm font-medium px-3 py-1.5 rounded-full ${c.badgeBg} ${c.badgeText}`}>
                  {formula}
                </span>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold text-foreground tracking-tight mb-3`}>{name}</h1>
              <p className="text-lg text-primary font-medium italic mb-6">"{tagline}"</p>
              <p className="text-muted-foreground text-base leading-relaxed mb-8">{description}</p>

              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/5521975190000" target="_blank" rel="noopener noreferrer">
                  <Button className="rounded-xl gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Como adquirir
                  </Button>
                </a>
                {coaUrl ? (
                  <a href={coaUrl} target="_blank" rel="noopener noreferrer" download>
                    <Button variant="outline" className="rounded-xl gap-2 border-border/60">
                      <Download className="w-4 h-4" />
                      Baixar COA
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" className="rounded-xl gap-2 border-border/60" disabled>
                    <Download className="w-4 h-4" />
                    Baixar COA
                  </Button>
                )}
              </div>
            </div>

            {/* Right column: image + specs */}
            <div className="flex flex-col gap-6">
              {productImage && (
                <div className={`relative flex items-center justify-center rounded-3xl p-8 overflow-hidden`}>
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `radial-gradient(ellipse at 60% 40%, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
                    }}
                  />
                  <img
                    src={productImage}
                    alt={name}
                    className="relative z-10 w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-xl"
                  />
                </div>
              )}

              {/* Specs */}
              <div className={`p-8 rounded-3xl ${c.border} border bg-white/80`}>
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-5">Informações Técnicas</h2>
              <div className="divide-y divide-border/40">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-3">
                    <span className="text-sm text-muted-foreground">{s.label}</span>
                    <span className="text-sm font-medium text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
              </div>{/* end specs */}
            </div>{/* end right column */}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Benefícios</span>
            <h2 className="mt-3 text-3xl font-semibold text-foreground tracking-tight mb-8">
              O que o {name} pode fazer por você
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 border border-border/40">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal note */}
      {note && (
        <div className="bg-secondary/20 border-y border-border/30">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{note}</p>
          </div>
        </div>
      )}

      {/* Process */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ProcessSteps />
        </div>
      </section>
    </PageLayout>
  );
}
