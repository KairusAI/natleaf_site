import { useRef, useLayoutEffect, useCallback, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Store original title text to prevent innerHTML corruption
const ORIGINAL_TITLE = "Pronto para transformar sua operação?";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Card entrance with scale and rotation
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { 
            y: 80, 
            autoAlpha: 0, 
            scale: 0.9,
            rotateX: 10,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Background pattern animation
      if (patternRef.current) {
        gsap.fromTo(patternRef.current,
          { opacity: 0, scale: 1.2 },
          {
            opacity: 0.1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Subtle continuous movement
        gsap.to(patternRef.current, {
          backgroundPosition: "100px 100px",
          duration: 20,
          repeat: -1,
          ease: "none",
        });
      }

      // Title word-by-word animation - use stored original text
      if (titleRef.current && !hasAnimatedRef.current) {
        hasAnimatedRef.current = true;
        const words = ORIGINAL_TITLE.split(' ');
        titleRef.current.innerHTML = words
          .map(word => `<span class="inline-block overflow-hidden"><span class="cta-word inline-block">${word}</span></span>`)
          .join(' ');

        const wordSpans = titleRef.current.querySelectorAll('.cta-word');
        gsap.fromTo(wordSpans,
          { 
            y: 80, 
            opacity: 0,
            rotateX: -90,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              once: true,
            },
            delay: 0.3,
          }
        );
      }

      // Subtitle animation
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { 
            y: 30, 
            autoAlpha: 0,
            clipPath: "inset(0 0 100% 0)",
          },
          {
            y: 0,
            autoAlpha: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 90%",
              once: true,
            },
            delay: 0.6,
          }
        );
      }

      // Button animation with bounce
      if (buttonRef.current) {
        const button = buttonRef.current.querySelector('button');
        gsap.fromTo(button,
          { 
            y: 40, 
            autoAlpha: 0,
            scale: 0.8,
          },
          {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: buttonRef.current,
              start: "top 90%",
              once: true,
            },
            delay: 0.8,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Button hover handlers - separate from GSAP context for proper cleanup
  const handleButtonEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  const handleButtonLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  const handleButtonMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  // Card hover handlers
  const handleCardEnter = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: "0 0 60px 10px rgba(59, 130, 246, 0.2)",
        duration: 0.4,
      });
    }
  }, []);

  const handleCardLeave = useCallback(() => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        boxShadow: "none",
        duration: 0.4,
      });
    }
  }, []);

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-3xl bg-gradient-accent p-12 md:p-16 gsap-hidden"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          onMouseEnter={handleCardEnter}
          onMouseLeave={handleCardLeave}
        >
          {/* Background Pattern */}
          <div 
            ref={patternRef}
            className="absolute inset-0 opacity-0"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Animated gradient overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            style={{
              animation: "shimmer 3s ease-in-out infinite",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground tracking-tight mb-6"
              style={{ perspective: "500px" }}
            >
              Pronto para transformar sua operação?
            </h2>

            <p
              ref={subtitleRef}
              className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto gsap-hidden"
            >
              Vamos desenhar juntos uma solução inteligente para o seu negócio.
            </p>

            <div ref={buttonRef}>
              <Button
                size="lg"
                variant="secondary"
                className="group px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 gsap-hidden"
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
                onMouseMove={handleButtonMove}
                onClick={() => window.open('https://wa.me/5521971201512?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20reuni%C3%A3o.', '_blank')}
              >
                Agendar reunião
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-2 duration-300" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
