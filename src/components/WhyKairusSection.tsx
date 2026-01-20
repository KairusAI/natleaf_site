import { useRef, useLayoutEffect } from "react";
import { Sparkles, Target, MessageCircle, Brain, Handshake, Check } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const differentials = [
  {
    icon: Sparkles,
    title: "Soluções 100% personalizadas",
  },
  {
    icon: Target,
    title: "Foco em impacto real no negócio",
  },
  {
    icon: MessageCircle,
    title: "Linguagem simples, sem tecnês desnecessário",
  },
  {
    icon: Brain,
    title: "IA aplicada de forma prática e responsável",
  },
  {
    icon: Handshake,
    title: "Parceria de longo prazo, não projeto descartável",
  },
  {
    icon: Check,
    title: "Tecnologia com estratégia, não só código",
  },
];

export function WhyKairusSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Left content animation
      if (leftContentRef.current) {
        const elements = leftContentRef.current.children;
        gsap.fromTo(elements,
          { 
            x: -80, 
            opacity: 0,
            scale: 0.95,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
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

      // Differentials grid animation
      if (gridRef.current) {
        const cards = gridRef.current.children;
        
        gsap.fromTo(cards,
          { 
            y: 50, 
            opacity: 0,
            scale: 0.9,
            rotateY: -20,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 0.7,
            stagger: {
              each: 0.1,
              from: "start",
            },
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );

        // Hover effects
        Array.from(cards).forEach((card) => {
          const iconContainer = card.querySelector('.differential-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -5,
              scale: 1.03,
              duration: 0.3,
              ease: "power2.out",
            });
            
            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1.2,
                rotate: 15,
                duration: 0.4,
                ease: "back.out(2)",
              });
            }
          });

          card.addEventListener('mouseleave', () => {
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
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block opacity-0">
              Por que Kairus
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 opacity-0">
              Tecnologia com <span className="text-primary">estratégia</span>,{" "}
              não só código
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed opacity-0">
              Entendemos que tecnologia só faz sentido quando gera resultado real. 
              Por isso, cada projeto é tratado como uma parceria, não como um simples serviço.
            </p>
          </div>

          {/* Right - Differentials Grid */}
          <div 
            ref={gridRef} 
            className="grid sm:grid-cols-2 gap-4"
            style={{ perspective: "1000px" }}
          >
            {differentials.map((item) => (
              <div
                key={item.title}
                className="opacity-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                <LiquidGlass className="group p-5 rounded-xl hover:border-primary/50 transition-colors duration-300 h-full cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="differential-icon w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-foreground font-medium leading-snug group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </p>
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
