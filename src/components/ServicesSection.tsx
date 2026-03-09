import { useRef, useLayoutEffect, useCallback } from "react";
import { BookOpenCheck, FileText, Pill, ArrowRight, Check } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: BookOpenCheck,
    title: "Embasamento científico por caso",
    description:
      "Disponibilizamos literatura clínica atualizada e resumos por patologia para que você prescreva com confiança e respaldo científico.",
    features: ["Literatura clínica", "Resumos por patologia"],
    color: "from-emerald-500/20 to-emerald-600/10",
    hoverColor: "from-emerald-500/30 to-emerald-600/20",
  },
  {
    icon: FileText,
    title: "Documentação sem fricção",
    description:
      "Orientamos e gerenciamos toda a papelada exigida pela ANVISA — você assina a prescrição, nós resolvemos o resto.",
    features: ["Modelos de prescrição", "Adequação ANVISA"],
    color: "from-emerald-500/20 to-emerald-600/10",
    hoverColor: "from-emerald-500/30 to-emerald-600/20",
  },
  {
    icon: Pill,
    title: "Protocolos de dosagem prontos",
    description:
      "Fornecemos protocolos de dosagem baseados em evidências para as principais indicações, facilitando sua tomada de decisão clínica.",
    features: ["Protocolos prontos", "Titulação segura"],
    color: "from-emerald-500/20 to-emerald-600/10",
    hoverColor: "from-emerald-500/30 to-emerald-600/20",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bigCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(elements,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
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

      // Cards animation com efeitos avançados
      if (gridRef.current) {
        const cards = gridRef.current.children;
        // Set initial hover-related states to avoid fighting Tailwind transforms/transitions
        gsap.set(gridRef.current.querySelectorAll(".service-arrow"), {
          x: -8,
          opacity: 0,
        });
        
        // Entrance animation
        gsap.fromTo(cards,
          { 
            y: 60, 
            autoAlpha: 0,
            scale: 0.95,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.7,
            stagger: {
              each: 0.12,
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

      // Big card (O que você recebe) – entrada ao entrar na view
      if (bigCardRef.current) {
        gsap.fromTo(bigCardRef.current,
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: bigCardRef.current,
              start: "top 88%",
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
    const iconContainer = card.querySelector('.service-icon');
    const arrow = card.querySelector('.service-arrow');
    const features = card.querySelectorAll('.service-feature');
    const title = card.querySelector('.service-title');

    // Avoid tween accumulation/jank when moving mouse quickly
    gsap.killTweensOf(card);
    if (iconContainer) gsap.killTweensOf(iconContainer);
    if (arrow) gsap.killTweensOf(arrow);
    if (features?.length) gsap.killTweensOf(features);
    if (title) gsap.killTweensOf(title);

    gsap.to(card, {
      y: -8,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1.15,
        rotate: 5,
        duration: 0.4,
        ease: "back.out(2)",
        overwrite: "auto",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: 5,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    gsap.to(features, {
      scale: 1.05,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (title) {
      gsap.to(title, {
        color: "hsl(var(--primary))",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const iconContainer = card.querySelector('.service-icon');
    const arrow = card.querySelector('.service-arrow');
    const features = card.querySelectorAll('.service-feature');
    const title = card.querySelector('.service-title');

    gsap.killTweensOf(card);
    if (iconContainer) gsap.killTweensOf(iconContainer);
    if (arrow) gsap.killTweensOf(arrow);
    if (features?.length) gsap.killTweensOf(features);
    if (title) gsap.killTweensOf(title);

    gsap.to(card, {
      y: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
    
    if (iconContainer) {
      gsap.to(iconContainer, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    if (arrow) {
      gsap.to(arrow, {
        x: -8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    }

    gsap.to(features, {
      scale: 1,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
      overwrite: "auto",
    });

    if (title) {
      gsap.to(title, {
        color: "hsl(var(--foreground))",
        duration: 0.3,
        overwrite: "auto",
      });
    }
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.3fr)] lg:items-start lg:gap-10">
          {/* Header à esquerda */}
          <div
            ref={headerRef}
            className="max-w-3xl mb-12 lg:mb-0 text-left lg:mx-0 mx-auto space-y-6"
          >
            <div>
              <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block">
                Para médicos
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-4">
                Quer começar a <span className="text-primary">prescrever CBD?</span> A gente te apoia.
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl">
                Você não precisa ser especialista em cannabis medicinal para prescrever. A Natleaf oferece suporte
                técnico e operacional completo para que você indique com segurança, embasamento e sem burocracia.
              </p>
            </div>

            {/* Tópicos principais (antes eram 3 cards) */}
            <div ref={gridRef} className="space-y-6">
              {services.map((service) => (
                <div key={service.title} className="gsap-hidden">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 text-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cards / CTA à direita */}
          <div className="space-y-8">
            {/* Big card – O que você recebe ao trabalhar com a Natleaf */}
            <div ref={bigCardRef} className="max-w-3xl mx-auto mt-12 md:mt-16">
              <LiquidGlass className="p-8 md:p-10 rounded-3xl hover:border-primary/50 transition-colors duration-300">
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
                    O que você recebe ao trabalhar com a Natleaf:
                  </h3>
                  <ul className="space-y-4 text-left max-w-2xl mb-8 w-full text-base md:text-lg text-foreground font-medium leading-relaxed">
                    {[
                      "Resumos científicos por indicação clínica",
                      "Modelos de prescrição adequados à ANVISA",
                      "Protocolos de dosagem e titulação",
                      "Suporte nos aspectos legais e regulatórios",
                      "Canal direto para dúvidas a qualquer momento",
                      "Atualizações contínuas sobre novas evidências",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                          <Check className="h-4 w-4" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="lg"
                    className="h-12 px-10 text-base w-full sm:w-auto [&_svg]:w-5 [&_svg]:h-5"
                    onClick={() =>
                      window.open(
                        "https://wa.me/5521971201512?text=Ol%C3%A1!%20Gostaria%20de%20come%C3%A7ar%20a%20prescrever%20CBD%20com%20a%20Natleaf.",
                        "_blank"
                      )
                    }
                  >
                    Quero começar a prescrever
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </LiquidGlass>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
