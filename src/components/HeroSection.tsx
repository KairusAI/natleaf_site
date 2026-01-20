import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/LogoSimboloKairus3d.png";

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
  const heroImageRef = useRef<HTMLDivElement>(null);
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
          { opacity: 0, scale: 1.1 },
          { opacity: 0.02, scale: 1, duration: 2, ease: "power2.out" }
        );
      }

      // Split text animation para headline
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hero-word');
        tl.fromTo(words,
          { y: 100, opacity: 0, rotationX: -80, transformOrigin: "center bottom" },
          { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.08, ease: "power4.out" },
          0.3
        );
      }

      // Subheadline com reveal suave
      if (subheadlineRef.current) {
        tl.fromTo(subheadlineRef.current,
          { y: 40, opacity: 0, clipPath: "inset(100% 0 0 0)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1, ease: "power3.out" },
          "-=0.6"
        );
      }

      // CTAs com bounce
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('button');
        tl.fromTo(buttons,
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" },
          "-=0.5"
        );
      }

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8 },
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

      // Hero Image animation
      if (heroImageRef.current) {
        tl.fromTo(heroImageRef.current,
          { opacity: 0, scale: 0.8, x: 50, rotate: -10 },
          { opacity: 1, scale: 1, x: 0, rotate: 0, duration: 1.2, ease: "power3.out" },
          "-=1"
        );

        // Floating animation contínua
        gsap.to(heroImageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          delay: 1.5,
        });

        // Subtle rotation animation
        gsap.to(heroImageRef.current.querySelector('img'), {
          rotate: 5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Ambient Glow Background */}
      <div 
        ref={glowRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(210 95% 60% / 0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Grid Pattern */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-0"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-32 relative z-10 pointer-events-none"
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-4xl text-center sm:text-left pointer-events-auto">
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
              <span className="text-primary inline-block min-w-[280px] sm:min-w-[320px] md:min-w-[400px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ y: 40, opacity: 0, rotateX: -90 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -40, opacity: 0, rotateX: 90 }}
                    transition={{ 
                      duration: 0.5, 
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block"
                    style={{ transformOrigin: "center bottom" }}
                  >
                    {rotatingWords[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>

            {/* Subheadline */}
            <p
              ref={subheadlineRef}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto sm:mx-0 mb-8 sm:mb-10 leading-relaxed opacity-0"
            >
              Automação e inteligência artificial sob medida para resolver problemas reais do seu negócio, do jeito certo, pensado para o seu momento.
            </p>

            {/* CTAs */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 sm:gap-4 pointer-events-auto"
            >
              <Button size="lg" className="group px-6 sm:px-8 w-full sm:w-auto relative overflow-hidden opacity-0">
                <span className="relative z-10 flex items-center">
                  Falar com um especialista
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="group px-6 sm:px-8 w-full sm:w-auto opacity-0"
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
                  }
                }}
              >
                Ver como funciona
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div 
            ref={heroImageRef}
            className="relative hidden lg:flex items-center justify-center opacity-0"
          >
            {/* Glow effect behind image */}
            <div 
              className="absolute inset-0 blur-3xl opacity-15"
              style={{
                background: "radial-gradient(ellipse at center, hsl(210 95% 60% / 0.20) 0%, transparent 70%)",
              }}
            />
            <img 
              src={heroImage} 
              alt="Kairus Symbol" 
              className="relative w-full max-w-md xl:max-w-lg drop-shadow-2xl"
              style={{
                filter: "drop-shadow(0 20px 40px rgba(59, 130, 246, 0.05))",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-0"
        onClick={() => {
          const nextSection = document.getElementById("problem");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
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
