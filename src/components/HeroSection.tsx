import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const rotatingWords = [
  "soluções digitais",
  "experiências únicas", 
  "resultados reais",
  "inovação constante",
  "sucesso garantido",
  "produtos incríveis",
  "impacto positivo",
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  // Rotação automática das palavras
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  // GSAP Animations on mount
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Animação do grid de fundo
      if (gridRef.current) {
        gsap.fromTo(gridRef.current,
          { autoAlpha: 0, scale: 1.1 },
          { autoAlpha: 0.02, scale: 1, duration: 2, ease: "power2.out" }
        );
      }

      // Split text animation para headline
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word');
        tl.fromTo(words,
          { y: 80, autoAlpha: 0, filter: "blur(10px)" },
          { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1.4, stagger: 0.15, ease: "power3.out" },
          0.2
        );
      }

      // Subheadline com reveal suave
      if (subheadlineRef.current) {
        tl.fromTo(subheadlineRef.current,
          { y: 40, autoAlpha: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, autoAlpha: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.out" },
          "-=0.6"
        );
      }

      // CTAs com bounce
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(buttons,
          { y: 30, autoAlpha: 0, scale: 0.9 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.5"
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current,
          { autoAlpha: 0, y: -20 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.3"
        );

        gsap.to(scrollIndicatorRef.current, {
          y: 10,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 2,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Efeito magnético nos botões
  useEffect(() => {
    if (!ctaRef.current) return;

    const buttons = ctaRef.current.querySelectorAll('button');
    
    const handlers = Array.from(buttons).map(btn => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
      };

      btn.addEventListener('mousemove', handleMouseMove);
      btn.addEventListener('mouseleave', handleMouseLeave);

      return { btn, handleMouseMove, handleMouseLeave };
    });

    return () => {
      handlers.forEach(({ btn, handleMouseMove, handleMouseLeave }) => {
        btn.removeEventListener('mousemove', handleMouseMove);
        btn.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-visible bg-background"
    >
      {/* Ambient Glow Background */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none gsap-hidden"
        style={{
          background: "radial-gradient(ellipse at center, hsl(210 95% 60% / 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid Pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 gsap-hidden"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Imagem das embalagens no fundo (metade direita da hero) */}
      <div
        className="absolute inset-0 hidden lg:block pointer-events-none z-[1]"
        style={{
          left: "50%",
          backgroundImage: "url(/embalagens%20NatLeaf.svg)",
          backgroundSize: "320% auto",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-32 relative z-10 pointer-events-none overflow-visible"
      >
        <div className="flex flex-col items-center lg:items-start">
          <div className="max-w-4xl w-full text-center lg:text-left pointer-events-auto">
            {/* Headline */}
            <h1
              ref={headlineRef}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6"
              style={{ perspective: "1000px" }}
            >
              <span className="hero-word inline-block">Transformamos</span>{" "}
              <br className="hidden sm:block" />
              <span className="hero-word inline-block">ideias</span>{" "}
              <span className="hero-word inline-block">em</span>{" "}
              <br className="hidden sm:block" />
              <span className="text-primary inline-block min-w-[280px] sm:min-w-[320px] md:min-w-[400px] relative overflow-visible py-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
                    transition={{ 
                      duration: 0.45, 
                      ease: [0.33, 1, 0.68, 1],
                    }}
                    className="inline-block leading-tight"
                    style={{ display: 'inline-block' }}
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed gsap-hidden"
            >
              Automação e inteligência artificial sob medida para resolver problemas reais do seu negócio, do jeito certo, pensado para o seu momento.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 pointer-events-auto"
            >
              <Button 
                size="lg" 
                className="group px-6 sm:px-8 w-full sm:w-auto relative overflow-hidden gsap-hidden"
                onClick={() => window.open('https://wa.me/5521971201512?text=Ol%C3%A1!%20Gostaria%20de%20falar%20com%20um%20especialista.', '_blank')}
              >
                <span className="relative z-10 flex items-center">
                  Falar com um especialista
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group px-6 sm:px-8 w-full sm:w-auto gsap-hidden"
                onClick={(e) => {
                  e.preventDefault();
                  const servicesSection = document.getElementById("process");
                  if (servicesSection) {
                    const navbarHeight = 100;
                    const elementPosition = servicesSection.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - navbarHeight;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                    setTimeout(() => ScrollTrigger.refresh(), 1000);
                  }
                }}
              >
                Ver como funciona
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer gsap-hidden"
        onClick={() => {
          const nextSection = document.getElementById("problem");
          if (nextSection) {
            const navbarHeight = 100;
            const elementPosition = nextSection.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navbarHeight;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            });
            setTimeout(() => ScrollTrigger.refresh(), 1000);
          }
        }}
      >
        <span className="text-xs text-muted-foreground/60 uppercase tracking-widest">Scroll</span>
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
