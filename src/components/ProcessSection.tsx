import { useRef, useLayoutEffect } from "react";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos seu negócio, seus gargalos e objetivos.",
  },
  {
    icon: PenTool,
    number: "02",
    title: "Arquitetura da solução",
    description: "Desenhamos o sistema ideal usando IA e automação.",
  },
  {
    icon: Code,
    number: "03",
    title: "Desenvolvimento",
    description: "Construímos, testamos e ajustamos cada detalhe.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Entrega e evolução",
    description: "Colocamos no ar e seguimos evoluindo junto com você.",
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const headerElements = headerRef.current.children;
        gsap.fromTo(headerElements,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
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

      // Set initial states - all steps start hidden
      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        const dot = step.querySelector('.timeline-dot');
        const content = contentRefs.current[index];
        const title = content?.querySelector('.step-title');
        const description = content?.querySelector('.step-description');
        const icon = step.querySelector('.step-icon');
        const badge = content?.querySelector('.step-badge');

        gsap.set(dot, { scale: 0, opacity: 0 });
        gsap.set(icon, { opacity: 0, scale: 0.5 });
        gsap.set(badge, { opacity: 0, y: -10 });
        gsap.set(title, { opacity: 0, y: 20 });
        gsap.set(description, { opacity: 0, y: 20 });
      });

      // Progress line starts at 0
      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      // Main timeline animation - triggers when section enters viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reset",
        },
      });

      // Animate each step sequentially with automatic timing
      steps.forEach((_, index) => {
        const step = stepRefs.current[index];
        const content = contentRefs.current[index];

        if (!step || !content) return;

        const dot = step.querySelector('.timeline-dot');
        const icon = step.querySelector('.step-icon');
        const title = content.querySelector('.step-title');
        const description = content.querySelector('.step-description');
        const badge = content.querySelector('.step-badge');

        const stepDelay = index * 0.4; // Delay between each step

        // Progress line grows to this dot
        if (index > 0) {
          tl.to(progressLineRef.current, {
            scaleX: index / (steps.length - 1),
            duration: 0.4,
            ease: "power2.inOut",
          }, stepDelay);
        }

        // Dot appears with bounce
        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => dot?.classList.add('active'),
        }, stepDelay);

        // Icon fades in
        tl.to(icon, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
        }, stepDelay + 0.1);

        // Badge appears
        tl.to(badge, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        }, stepDelay + 0.2);

        // Title slides up
        tl.to(title, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, stepDelay + 0.25);

        // Description slides up
        tl.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, stepDelay + 0.35);
      });

      // Final progress line completion
      tl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      }, steps.length * 0.4);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="process" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block opacity-0">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6 opacity-0">
            Simples, transparente e{" "}
            <span className="text-primary">focado em resultado</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto w-full">
          {/* Timeline Base Line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-muted/30 hidden md:block" />
          
          {/* Timeline Progress Line */}
          <div 
            ref={progressLineRef}
            className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary hidden md:block"
            style={{ transformOrigin: "left center" }}
          />

          {/* Timeline Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.title}
                ref={(el) => (stepRefs.current[index] = el)}
                className="relative flex flex-col items-center text-center"
              >
                {/* Dot */}
                <div className="timeline-dot w-16 h-16 rounded-full bg-muted border-4 border-background shadow-lg flex items-center justify-center mb-6 relative z-10 transition-colors duration-300 [&.active]:bg-primary">
                  <step.icon className="step-icon w-6 h-6 text-primary [.timeline-dot.active_&]:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Content */}
                <div 
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="flex flex-col items-center"
                >
                  {/* Number Badge */}
                  <span className="step-badge text-xs font-bold text-primary/60 mb-2">
                    PASSO {step.number}
                  </span>

                  {/* Title */}
                  <h3 className="step-title text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="step-description text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
