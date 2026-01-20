import { useRef, useLayoutEffect } from "react";
import { Workflow, Smartphone, Bot, Link2, ArrowRight } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Workflow,
    title: "Automação de processos",
    description:
      "Elimine tarefas manuais e repetitivas com fluxos inteligentes que trabalham 24/7.",
    features: ["RPA", "Workflows", "Bots"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Bot,
    title: "Agentes e assistentes de IA",
    description:
      "IA treinada para atender, analisar dados, vender ou dar suporte ao seu cliente.",
    features: ["Chatbots", "NLP", "Machine Learning"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Link2,
    title: "Integrações entre sistemas",
    description:
      "Conectamos APIs, CRMs, ERPs, WhatsApp, e-mail e muito mais em um só lugar.",
    features: ["APIs", "Webhooks", "Sync"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Smartphone,
    title: "Softwares personalizados",
    description:
      "Aplicações web e mobile feitas sob medida para resolver exatamente o que você precisa.",
    features: ["Web Apps", "Mobile", "PWA"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
];

export function ServicesSection() {
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
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reset",
            },
          }
        );
      }

      // Cards animation com efeitos avançados
      if (gridRef.current) {
        const cards = gridRef.current.children;
        
        // Entrance animation
        gsap.fromTo(cards,
          { 
            y: 60, 
            opacity: 0,
            scale: 0.95,
          },
          {
            y: 0,
            opacity: 1,
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
              toggleActions: "play none none reset",
            },
          }
        );

        // Setup hover interactions for each card
        Array.from(cards).forEach((card) => {
          const iconContainer = card.querySelector('.service-icon');
          const arrow = card.querySelector('.service-arrow');
          const features = card.querySelectorAll('.service-feature');
          const title = card.querySelector('.service-title');

          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              y: -8,
              scale: 1.02,
              duration: 0.4,
              ease: "power2.out",
            });
            
            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1.15,
                rotate: 5,
                duration: 0.4,
                ease: "back.out(2)",
              });
            }

            if (arrow) {
              gsap.to(arrow, {
                x: 5,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }

            gsap.to(features, {
              scale: 1.05,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            });

            if (title) {
              gsap.to(title, {
                color: "hsl(var(--primary))",
                duration: 0.3,
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
            
            if (iconContainer) {
              gsap.to(iconContainer, {
                scale: 1,
                rotate: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }

            if (arrow) {
              gsap.to(arrow, {
                x: -8,
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
              });
            }

            gsap.to(features, {
              scale: 1,
              duration: 0.3,
              stagger: 0.05,
              ease: "power2.out",
            });

            if (title) {
              gsap.to(title, {
                color: "hsl(var(--foreground))",
                duration: 0.3,
              });
            }
          });
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block opacity-0">
            O que fazemos
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 opacity-0">
            Soluções que <span className="text-primary">impulsionam</span> resultados
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl opacity-0">
            Tecnologia de ponta aplicada ao seu negócio de forma prática e estratégica.
          </p>
        </div>

        {/* Services Grid - 2x2 */}
        <div ref={gridRef} className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="opacity-0"
            >
              <LiquidGlass className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 cursor-pointer">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`service-icon w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 transition-colors duration-300`}>
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="service-title text-xl font-semibold text-foreground transition-colors duration-300 mb-2 flex items-center gap-2">
                      {service.title}
                      <ArrowRight className="service-arrow w-4 h-4 opacity-0 -translate-x-2" />
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="service-feature text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
