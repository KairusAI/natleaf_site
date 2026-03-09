import { useRef, useLayoutEffect, useCallback } from "react";
import { FileCheck, Activity, Package, RefreshCw, Check, ArrowRight } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const differentials = [
  {
    icon: FileCheck,
    number: "01",
    title: "Protocolo ANVISA",
    description:
      "Reunimos, revisamos e protocolamos toda a documentação exigida para a autorização de importação.",
  },
  {
    icon: Activity,
    number: "02",
    title: "Acompanhamento do processo",
    description:
      "Monitoramos o andamento junto à ANVISA e respondemos a eventuais exigências em tempo hábil.",
  },
  {
    icon: Package,
    number: "03",
    title: "Importação e logística",
    description:
      "Após a autorização, cuidamos da importação do produto, desembaraço aduaneiro e entrega ao paciente.",
  },
  {
    icon: RefreshCw,
    number: "04",
    title: "Renovações futuras",
    description:
      "Gerenciamos as renovações periódicas da autorização para que seu tratamento nunca seja interrompido.",
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
            autoAlpha: 0,
            scale: 0.95,
          },
          {
            x: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftContentRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Differentials grid animation (apenas os 4 cards, não o botão)
      if (gridRef.current) {
        const cards = Array.from(gridRef.current.children).filter(
          (el) => el.classList.contains("differential-card")
        );
        gsap.fromTo(cards,
          { 
            y: 50, 
            autoAlpha: 0,
            scale: 0.9,
            rotateY: -20,
          },
          {
            y: 0,
            autoAlpha: 1,
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
    const iconContainer = card.querySelector('.differential-icon');
    
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
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.differential-icon');
    
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
    <section 
      id="about" 
      className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={leftContentRef}>
            <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block gsap-hidden">
              Nossa promessa
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 gsap-hidden">
              Você não deveria <span className="text-primary">lutar</span> para começar um tratamento.
            </h2>
            {/* CTA em tópicos */}
            <div className="gsap-hidden space-y-8">
              <h3 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
                A gente cuida de tudo. Você só cuida de se tratar.
              </h3>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                Muitas pessoas desistem do tratamento antes mesmo de começar, pela complexidade dos trâmites. A Natleaf existe para isso não acontecer mais.
              </p>
              <ul className="space-y-4 text-left max-w-2xl w-full text-base md:text-lg text-foreground font-medium leading-relaxed">
                {[
                  "Sem papelada para você resolver",
                  "Sem ficar aguardando retorno da ANVISA sozinho",
                  "Sem dúvidas sem resposta",
                  "Com suporte real em cada etapa",
                  "Com transparência total do processo",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <Check className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right - Differentials Grid + botão embaixo */}
          <div className="flex flex-col items-center gap-8 w-full">
            <div
              ref={gridRef}
              className="grid grid-cols-2 gap-x-4 gap-y-6 w-full"
              style={{ perspective: "1000px" }}
            >
              {differentials.map((item) => (
                <div
                  key={item.title}
                  className="differential-card gsap-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={handleCardEnter}
                  onMouseLeave={handleCardLeave}
                >
                  <LiquidGlass className="group p-5 rounded-xl hover:border-primary/50 transition-colors duration-300 h-full cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="differential-icon w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-foreground font-semibold leading-snug group-hover:text-primary transition-colors duration-300 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </LiquidGlass>
                </div>
              ))}
            </div>
            <Button
              size="lg"
              className="h-12 px-10 text-base w-full sm:w-auto [&_svg]:w-5 [&_svg]:h-5"
              onClick={() =>
                window.open(
                  "https://wa.me/5521971201512?text=Ol%C3%A1!%20Quero%20essa%20ajuda%20agora.",
                  "_blank"
                )
              }
            >
              Quero essa ajuda agora
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
