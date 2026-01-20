import { useRef, useLayoutEffect } from "react";
import { AlertCircle, Puzzle, Brain } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  {
    icon: Puzzle,
    title: "Soluções genéricas",
    description: "Ferramentas prontas que não se adaptam às particularidades do seu negócio.",
  },
  {
    icon: AlertCircle,
    title: "Complexidade excessiva",
    description: "Sistemas tão complicados que seu time nunca consegue usar de verdade.",
  },
  {
    icon: Brain,
    title: "IA sem resultado",
    description: "Promessas de inteligência artificial que nunca viram resultado prático.",
  },
];

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation com texto revelando da esquerda
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(elements,
          { 
            x: -60, 
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      // Cards animation com shake sutil para indicar "problema"
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        gsap.fromTo(cards,
          { 
            y: 60, 
            opacity: 0,
            scale: 0.9,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );

        // Hover effects
        Array.from(cards).forEach((card) => {
          const iconContainer = card.querySelector('.problem-icon');
          
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });
            
            // Shake do ícone no hover
            if (iconContainer) {
              gsap.to(iconContainer, {
                rotate: [0, -5, 5, -5, 5, 0],
                duration: 0.5,
                ease: "power2.out",
              });
            }
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="problem" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="max-w-3xl mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block opacity-0">
            O Problema
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 opacity-0">
            Empresas sabem que precisam de{" "}
            <span className="text-primary">automação e IA</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl opacity-0">
            O problema é quase sempre o mesmo:
          </p>
        </div>

        {/* Problems Grid */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="opacity-0"
            >
              <LiquidGlass 
                className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 cursor-pointer"
              >
                {/* Icon */}
                <div className="problem-icon w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 transition-all duration-300">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </LiquidGlass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
