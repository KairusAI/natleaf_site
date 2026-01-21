import { useRef, useLayoutEffect, useCallback } from "react";
import { Sparkles, Target, Cog } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Cog,
    title: "Sistemas sob medida",
    description: "Criamos a partir do seu processo, não de templates genéricos.",
  },
  {
    icon: Target,
    title: "Foco em resultados",
    description: "Cada automação tem um propósito claro e mensurável.",
  },
  {
    icon: Sparkles,
    title: "IA que funciona",
    description: "Inteligência artificial integrada ao seu fluxo real de trabalho.",
  },
];

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation (lado esquerdo)
      if (contentRef.current) {
        const elements = contentRef.current.children;
        gsap.fromTo(elements,
          { 
            x: -80, 
            autoAlpha: 0,
          },
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Cards animation (lado direito) com efeito cascata
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        gsap.fromTo(cards,
          { 
            x: 80, 
            autoAlpha: 0,
            scale: 0.95,
          },
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers - separate from GSAP context for proper cleanup
  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.solution-icon');
    
    gsap.to(card, {
      x: 10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1.15,
        rotate: 360,
        duration: 0.6,
        ease: "back.out(2)",
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.solution-icon');
    
    gsap.to(card, {
      x: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section 
      id="solution" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div ref={contentRef}>
            <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block gsap-hidden">
              A Solução
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 gsap-hidden">
              IA personalizada, construída para o{" "}
              <span className="text-primary">seu fluxo real</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg gsap-hidden">
              <p>
                Na Kairus, <strong className="text-foreground">não vendemos ferramentas prontas</strong>.
              </p>
              <p>
                Criamos sistemas inteligentes sob medida, pensados a partir do seu processo, 
                do seu time e dos seus objetivos.
              </p>
              <p className="text-primary font-medium">
                Cada projeto é único. Cada automação tem um propósito claro.
              </p>
            </div>
          </div>

          {/* Benefits Cards */}
          <div ref={cardsRef} className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="gsap-hidden"
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <LiquidGlass className="group p-6 rounded-2xl hover:border-primary/50 transition-colors duration-300 cursor-pointer">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="solution-icon w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </LiquidGlass>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
