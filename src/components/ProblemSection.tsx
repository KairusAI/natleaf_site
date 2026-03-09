import { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { FileCheck, UserCheck, ShieldCheck } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const brasilCards = [
  {
    icon: FileCheck,
    title: "Resolução ANVISA RDC 327/2019",
    description:
      "A resolução autoriza a importação de produtos de cannabis para fins medicinais mediante prescrição médica e autorização da agência.",
  },
  {
    icon: UserCheck,
    title: "Qualquer médico pode prescrever",
    description:
      "Médico registrado no CRM pode solicitar autorização de importação junto à ANVISA para seus pacientes. Não é necessário especialista.",
  },
  {
    icon: ShieldCheck,
    title: "Processo 100% legalizado",
    description:
      "Com a documentação correta, o paciente recebe autorização para importar o produto, que chega diretamente em casa, com total segurança jurídica.",
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
            autoAlpha: 0,
            clipPath: "inset(0 100% 0 0)",
          },
          {
            x: 0,
            autoAlpha: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
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
            autoAlpha: 0,
            scale: 0.9,
          },
          {
            y: 0,
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
    const iconContainer = card.querySelector('.problem-icon');
    
    gsap.to(card, {
      y: -8,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        keyframes: [
          { rotate: -5, duration: 0.1 },
          { rotate: 5, duration: 0.1 },
          { rotate: -5, duration: 0.1 },
          { rotate: 5, duration: 0.1 },
          { rotate: 0, duration: 0.1 },
        ],
        ease: "power2.out",
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    
    gsap.to(card, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
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
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block gsap-hidden">
            Regulamentação
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight mb-6 gsap-hidden">
            No Brasil, é possível —{" "}
            <span className="text-primary">e é legal.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl gsap-hidden">
            Desde 2019, a ANVISA regulamentou o uso de produtos à base de cannabis para fins medicinais. Com o processo correto, qualquer paciente pode ter acesso ao tratamento de forma legal e segura.
          </p>
        </div>

        {/* No Brasil - Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6">
          {brasilCards.map((problem) => (
            <div
              key={problem.title}
              className="gsap-hidden"
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
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
