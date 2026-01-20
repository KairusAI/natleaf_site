import { useRef, useLayoutEffect, useCallback } from "react";
import { Check, Zap, Shield, Clock, Users, Code } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Metodologias ágeis para resultados em tempo recorde.",
  },
  {
    icon: Shield,
    title: "Código Seguro",
    description: "Segurança como prioridade em cada linha de código.",
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Equipe dedicada disponível quando você precisar.",
  },
  {
    icon: Users,
    title: "Time Especialista",
    description: "Profissionais com experiência em grandes projetos.",
  },
  {
    icon: Code,
    title: "Código Limpo",
    description: "Manutenção simples e escalabilidade garantida.",
  },
  {
    icon: Check,
    title: "Qualidade Total",
    description: "Testes rigorosos e controle de qualidade em cada etapa.",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const yearsCountRef = useRef<HTMLDivElement>(null);
  const hoursCountRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left content animation
      if (leftContentRef.current) {
        const elements = leftContentRef.current.children;
        gsap.fromTo(elements,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftContentRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      // Stats animation com contador
      if (statsRef.current && yearsCountRef.current && hoursCountRef.current) {
        gsap.fromTo(statsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );

        // Animated counter for years
        const yearsCounter = { value: 0 };
        gsap.to(yearsCounter, {
          value: 10,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: yearsCountRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            if (yearsCountRef.current) {
              yearsCountRef.current.textContent = `${Math.round(yearsCounter.value)}+`;
            }
          },
        });

        // Animated counter for hours
        const hoursCounter = { value: 0 };
        gsap.to(hoursCounter, {
          value: 24,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: hoursCountRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          onUpdate: () => {
            if (hoursCountRef.current) {
              hoursCountRef.current.textContent = `${Math.round(hoursCounter.value)}h`;
            }
          },
        });
      }

      // Features grid animation
      if (gridRef.current) {
        const cards = gridRef.current.children;
        
        gsap.fromTo(cards,
          { 
            y: 60, 
            opacity: 0,
            scale: 0.9,
            rotateZ: -3,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers separados do GSAP context
  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.feature-icon');
    
    gsap.to(card, {
      y: -8,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1.2,
        rotate: 10,
        duration: 0.4,
        ease: "back.out(2)",
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.feature-icon');
    
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block opacity-0">
              Por que nos escolher
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6 opacity-0">
              Tecnologia de ponta com{" "}
              <span className="text-gradient">excelência</span> em cada detalhe
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed opacity-0">
              Há mais de uma década entregamos soluções que combinam inovação
              tecnológica com resultados mensuráveis. Nossa abordagem centrada no
              cliente garante que cada projeto supere expectativas.
            </p>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex gap-12 opacity-0"
            >
              <div>
                <div 
                  ref={yearsCountRef}
                  className="text-4xl font-semibold text-foreground"
                >
                  0+
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Anos de experiência
                </div>
              </div>
              <div>
                <div 
                  ref={hoursCountRef}
                  className="text-4xl font-semibold text-foreground"
                >
                  0h
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tempo de resposta
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Features Grid */}
          <div ref={gridRef} className="grid sm:grid-cols-2 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="opacity-0"
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <LiquidGlass className="p-5 rounded-xl hover:border-primary/20 transition-colors duration-300 cursor-pointer">
                  <div className="feature-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-all duration-300">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </LiquidGlass>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
