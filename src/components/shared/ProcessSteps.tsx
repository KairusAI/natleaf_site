import { useRef, useLayoutEffect } from "react";
import { ClipboardEdit, Send, Pipette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardEdit,
    number: "01",
    title: "Preencha seus dados",
    description: "Preencha os seus dados para pedido médico.",
  },
  {
    icon: Send,
    number: "02",
    title: "Envio do pedido",
    description: "O pedido será enviado para os EUA, o produto chegará em sua residência.",
  },
  {
    icon: Pipette,
    number: "03",
    title: "Siga a posologia",
    description: "Respeite a posologia indicada na sua receita.",
  },
];

interface ProcessStepsProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function ProcessSteps({
  title = "Como Adquirir",
  subtitle = "Três passos simples para começar seu tratamento com CBD",
  ctaLabel = "Preencha seus dados aqui",
  ctaHref = "/contato",
}: ProcessStepsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
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

      // Set initial states
      stepRefs.current.forEach((step, index) => {
        if (!step) return;
        const dot = step.querySelector(".timeline-dot");
        const content = contentRefs.current[index];
        gsap.set(dot, { scale: 0, opacity: 0 });
        gsap.set(step.querySelector(".step-icon"), { opacity: 0, scale: 0.5 });
        gsap.set(content?.querySelector(".step-badge"), { opacity: 0, y: -10 });
        gsap.set(content?.querySelector(".step-title"), { opacity: 0, y: 20 });
        gsap.set(content?.querySelector(".step-description"), { opacity: 0, y: 20 });
      });

      gsap.set(progressLineRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          once: true,
        },
      });
      animationRef.current = tl;

      steps.forEach((_, index) => {
        const step = stepRefs.current[index];
        const content = contentRefs.current[index];
        if (!step || !content) return;

        const dot = step.querySelector(".timeline-dot");
        const icon = step.querySelector(".step-icon");
        const title = content.querySelector(".step-title");
        const description = content.querySelector(".step-description");
        const badge = content.querySelector(".step-badge");
        const stepDelay = index * 0.4;

        if (index > 0) {
          tl.to(progressLineRef.current, {
            scaleX: index / (steps.length - 1),
            duration: 0.4,
            ease: "power2.inOut",
          }, stepDelay);
        }

        tl.to(dot, {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          onComplete: () => dot?.classList.add("active"),
          onReverseComplete: () => dot?.classList.remove("active"),
        }, stepDelay);

        tl.to(icon, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, stepDelay + 0.1);
        tl.to(badge, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, stepDelay + 0.2);
        tl.to(title, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, stepDelay + 0.25);
        tl.to(description, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, stepDelay + 0.35);
      });

      tl.to(progressLineRef.current, {
        scaleX: 1,
        duration: 0.3,
        ease: "power2.out",
      }, steps.length * 0.4);
    }, containerRef);

    return () => {
      animationRef.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-24 md:py-32 bg-background">
      {/* Leaf decoration — left side, desktop only */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none z-[1]"
        style={{
          right: "70%",
          left: 0,
          backgroundImage: "url(/imagemfolha2.svg)",
          backgroundSize: "130% auto",
          backgroundPosition: "100% 25%",
          backgroundRepeat: "no-repeat",
          transform: "scaleX(-1)",
        }}
        aria-hidden
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block">
            Como Funciona
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg">{subtitle}</p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto w-full">
          {/* Base line */}
          <div className="absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-muted/30 hidden md:block" />
          {/* Progress line */}
          <div
            ref={progressLineRef}
            className="absolute top-8 left-[16.5%] right-[16.5%] h-0.5 bg-primary hidden md:block"
            style={{ transformOrigin: "left center" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4">
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
                <div ref={(el) => (contentRefs.current[index] = el)} className="flex flex-col items-center">
                  <span className="step-badge text-xs font-bold text-primary/60 mb-2">
                    PASSO {step.number}
                  </span>
                  <h3 className="step-title text-lg font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="step-description text-sm text-muted-foreground leading-relaxed max-w-[220px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA button */}
        <div className="flex justify-center mt-14">
          <Link to={ctaHref}>
            <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-10 text-base">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
