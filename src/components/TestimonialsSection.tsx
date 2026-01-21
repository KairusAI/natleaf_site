import { useRef, useLayoutEffect, useCallback } from "react";
import { Star, Quote } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Thiago Bacci",
    role: "CEO",
    company: "A10 PRO",
    content:
      "A Kairus transformou completamente nossa operação com a solução personalizada. O retorno sobre investimento foi impressionante e a equipe sempre disponível para suporte.",
    rating: 5,
    avatar: "TB",
  },
  {
    name: "Cristiane Rocha",
    role: "CEO",
    company: "RAE Nutrition",
    content:
      "A Kairus transformou nosso desafio em uma solução de agentes de IA robusta, viável e totalmente alinhada ao nosso contexto de negócio. O time vai além da entrega, mantendo um suporte ágil e colaborativo que garante evolução contínua da plataforma. Mais do que um fornecedor, a Kairus atua como parceira estratégica na construção de inovação com impacto real.",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "João Magalhães",
    role: "CEO",
    company: "Natleaf",
    content:
      "A automação de processos implementada pela Kairus reduziu nosso tempo de resposta em 70%. Profissionais extremamente competentes e dedicados ao sucesso do cliente.",
    rating: 5,
    avatar: "JM",
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation com split effect
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(elements,
          { 
            y: 50, 
            autoAlpha: 0,
            scale: 0.95,
          },
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

      // Cards animation com efeito 3D
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        
        gsap.fromTo(cards,
          { 
            y: 100, 
            autoAlpha: 0,
            rotateX: -30,
            scale: 0.9,
          },
          {
            y: 0,
            autoAlpha: 1,
            rotateX: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );

        // Stars animation dentro de cada card
        Array.from(cards).forEach((card, i) => {
          const stars = card.querySelectorAll('.star-icon');
          gsap.fromTo(stars,
            { scale: 0, rotate: -180 },
            {
              scale: 1,
              rotate: 0,
              duration: 0.4,
              stagger: 0.08,
              ease: "back.out(3)",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true,
              },
              delay: 0.3 + (i * 0.2),
            }
          );

          // Quote icon animation
          const quoteIcon = card.querySelector('.quote-icon');
          if (quoteIcon) {
            gsap.fromTo(quoteIcon,
              { scale: 0, opacity: 0, rotate: -45 },
              {
                scale: 1,
                opacity: 0.1,
                rotate: 0,
                duration: 0.6,
                ease: "back.out(2)",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  once: true,
                },
                delay: 0.5 + (i * 0.2),
              }
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Hover handlers - separate from GSAP context for proper cleanup
  const handleCardEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const quoteIcon = card.querySelector('.quote-icon');
    
    gsap.to(card, {
      y: -15,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (quoteIcon) {
      gsap.to(quoteIcon, {
        opacity: 0.2,
        scale: 1.1,
        duration: 0.4,
      });
    }
  }, []);

  const handleCardLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const quoteIcon = card.querySelector('.quote-icon');
    
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: "none",
      duration: 0.4,
      ease: "power2.out",
    });
    
    if (quoteIcon) {
      gsap.to(quoteIcon, {
        opacity: 0.1,
        scale: 1,
        duration: 0.4,
      });
    }
  }, []);

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase block mb-4 gsap-hidden">
            Depoimentos
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4 gsap-hidden">
            O que nossos <span className="text-gradient">clientes</span> dizem
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto gsap-hidden">
            Conheça a experiência de quem confia na Kairus para transformar seus negócios
          </p>
        </div>

        {/* Testimonials Grid */}
        <div 
          ref={cardsRef} 
          className="grid md:grid-cols-3 gap-6"
          style={{ perspective: "1000px" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="gsap-hidden"
              style={{ transformStyle: "preserve-3d" }}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <LiquidGlass className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-colors duration-300 relative overflow-hidden cursor-pointer">
                {/* Quote Icon */}
                <div className="quote-icon absolute top-6 right-6 opacity-0">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="star-icon w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-8 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-primary-foreground font-semibold text-sm group-hover:scale-110 transition-transform duration-300">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
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



