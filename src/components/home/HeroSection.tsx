import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/3 blur-3xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Product packaging image — right half, desktop only */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none z-[1]"
        style={{
          left: "50%",
          backgroundImage: "url(/embalagens%20NatLeaf.svg)",
          backgroundSize: "320% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-24 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8">
            <Leaf className="w-4 h-4" />
            Invented Green LLC — Orlando, FL
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight mb-6 leading-[1.1]">
            Natleaf
            <span className="block text-gradient">Elevating Your Health</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 max-w-2xl">
            A principal marca de CBD da Invented Green — empresa americana dedicada à medicina fitoterápica de alta qualidade.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xl">
            Extração inovadora sem solventes, produtos 100% orgânicos e testados em laboratório. Whole Spectrum para o máximo efeito entourage.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/produtos">
              <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base gap-2">
                Conheça nossos produtos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/conheca-o-cbd#como-adquirir">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-border/60 hover:border-primary/40 hover:bg-primary/5">
                Como funciona?
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-6 mt-12 pt-8 border-t border-border/30">
            {["100% Orgânico", "Testado em Lab", "Tecnologia TDC™", "Certificação GMP"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
