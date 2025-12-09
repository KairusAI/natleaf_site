import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.8, 1], [0, 80, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 0.99, 0.97]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY;
      
      // Verifica se está na HeroSection e se está rolando para baixo
      if (containerRef.current) {
        const heroBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
        const isInHero = currentScrollY < heroBottom;
        
        if (isInHero && scrollDelta > 0 && !isScrolling) {
          // Detecta scroll para baixo e faz scroll automático para serviços
          setIsScrolling(true);
          clearTimeout(scrollTimeout);
          
          scrollTimeout = setTimeout(() => {
            const servicesSection = document.getElementById("services");
            if (servicesSection) {
              servicesSection.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
              });
              
              // Permite scroll novamente após 1 segundo
              setTimeout(() => {
                setIsScrolling(false);
              }, 1000);
            } else {
              setIsScrolling(false);
            }
          }, 100);
        }
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isScrolling]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Abstract Blue Light Waves Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large wave - top right - animated across screen */}
        <motion.div 
          className="absolute top-[15%] right-[10%] w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(210 95% 60% / 0.65) 0%, hsl(210 90% 55% / 0.4) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -300, 200, -150, 0],
            y: [0, 150, -100, 200, 0],
            scale: [1, 1.3, 0.9, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Large wave - bottom left - animated across screen */}
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-[550px] h-[550px] rounded-full"
          style={{
            background: "radial-gradient(circle at center, hsl(210 95% 55% / 0.7) 0%, hsl(210 90% 60% / 0.4) 45%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [0, 250, -200, 300, 0],
            y: [0, -200, 150, -100, 0],
            scale: [1, 1.2, 0.95, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Accent glow - center - animated across screen */}
        <motion.div 
          className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background: "radial-gradient(ellipse at center, hsl(210 95% 60% / 0.35) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
          animate={{
            x: [0, 200, -250, 150, -100, 0],
            y: [0, -150, 200, -100, 180, 0],
            scale: [1, 1.2, 0.9, 1.15, 1.05, 1],
            opacity: [0.6, 1, 0.7, 0.9, 0.8, 0.6],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-6 py-32 relative z-10"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.1] mb-6"
          >
            Transformamos ideias em{" "}
            <span className="text-gradient">soluções digitais</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Desenvolvemos software inteligente com IA, automação e aplicativos
            que impulsionam o crescimento do seu negócio.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="group px-8">
              Iniciar projeto
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-8"
              onClick={(e) => {
                e.preventDefault();
                const servicesSection = document.getElementById("services");
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
              Serviços
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
