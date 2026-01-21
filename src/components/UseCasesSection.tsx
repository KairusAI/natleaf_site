import { useRef, useLayoutEffect, useCallback } from "react";
import { TrendingUp, Clock, Users, RefreshCw, CheckCircle2 } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    icon: TrendingUp,
    title: "Empresas que querem escalar sem aumentar equipe",
  },
  {
    icon: Clock,
    title: "Negócios com processos manuais ou lentos",
  },
  {
    icon: Users,
    title: "Times sobrecarregados com tarefas operacionais",
  },
  {
    icon: RefreshCw,
    title: "Empresas que já testaram IA, mas não viram resultado",
  },
];

export function UseCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(elements,
          { y: 50, autoAlpha: 0, scale: 0.95 },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.children;
        
        gsap.fromTo(cards,
          { 
            y: 80, 
            autoAlpha: 0,
            scale: 0.85,
            rotateX: -30,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Check icon animation
        const checks = gridRef.current.querySelectorAll('.check-icon');
        gsap.fromTo(checks,
          { scale: 0, rotate: -180 },
          {
            scale: 1,
            rotate: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              once: true,
            },
            delay: 0.5,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers - separate from GSAP context for proper cleanup
  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.usecase-icon');
    const checkIcon = card.querySelector('.check-icon');
    
    gsap.to(card, {
      y: -10,
      scale: 1.05,
      duration: 0.4,
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
    
    if (checkIcon) {
      gsap.to(checkIcon, {
        scale: 1.3,
        color: "hsl(var(--primary))",
        duration: 0.3,
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.usecase-icon');
    const checkIcon = card.querySelector('.check-icon');
    
    gsap.to(card, {
      y: 0,
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
    
    if (checkIcon) {
      gsap.to(checkIcon, {
        scale: 1,
        color: "hsl(var(--primary) / 0.5)",
        duration: 0.3,
      });
    }
  }, []);

  return (
    <section 
      id="use-cases" 
      className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-background overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block gsap-hidden">
            Para quem é
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 gsap-hidden">
            Se encaixa no seu <span className="text-primary">cenário</span>?
          </h2>
        </div>

        {/* Use Cases Grid */}
        <div 
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="gsap-hidden"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <LiquidGlass className="group h-full p-6 rounded-2xl hover:border-primary/50 transition-colors duration-300 text-center cursor-pointer">
                {/* Icon */}
                <div className="usecase-icon w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 mx-auto transition-all duration-300">
                  <useCase.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Title */}
                <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </p>

                {/* Check indicator */}
                <div className="mt-4 flex justify-center">
                  <CheckCircle2 className="check-icon w-5 h-5 text-primary/50 transition-all duration-300" />
                </div>
              </LiquidGlass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
