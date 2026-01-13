import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazySplineViewer } from "@/components/SplineViewer";

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
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Usando transform para animações mais suaves (GPU accelerated)
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Abstract Blue Light Waves Background - DESATIVADO TEMPORARIAMENTE */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large wave - top right - animated across screen */}
        {/* <motion.div 
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
        /> */}
        
        {/* Large wave - bottom left - animated across screen */}
        {/* <motion.div 
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
        /> */}
        
        {/* Accent glow - center - animated across screen */}
        {/* <motion.div 
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
        /> */}
      {/* </div> */}

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Spline 3D Element - Hidden on mobile for performance */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden hidden sm:flex items-center justify-end pr-0">
        <div className="w-full h-full max-w-[90%] sm:max-w-[85%] translate-x-16 sm:translate-x-28 md:translate-x-40 lg:translate-x-56">
          <LazySplineViewer 
            url="https://prod.spline.design/jVyIAtikjF45UXh9/scene.splinecode"
            className="w-full h-full"
            scale={1.0}
            hueRotate={0}
            brightness={1}
            saturation={1}
            renderOnDemand={true}
          />
        </div>
      </div>

      <motion.div
        style={{ y, opacity, scale }}
        className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-20 sm:py-24 md:py-32 relative z-10 pointer-events-none"
      >
        <div className="max-w-4xl text-center sm:text-left pointer-events-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-foreground leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6"
          >
            Transformamos{" "}
            <br className="hidden sm:block" />
            ideias em{" "}
            <br className="hidden sm:block" />
            <span className="text-primary inline-block min-w-[280px] sm:min-w-[320px] md:min-w-[400px] relative">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentWordIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                  }}
                  className="inline-block"
                >
                  {rotatingWords[currentWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto sm:mx-0 mb-8 sm:mb-10 leading-relaxed"
          >
            Automação e inteligência artificial sob medida para resolver problemas reais do seu negócio, do jeito certo, pensado para o seu momento.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-3 sm:gap-4 pointer-events-auto"
          >
            <Button size="lg" className="group px-6 sm:px-8 w-full sm:w-auto">
              Falar com um especialista
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="group px-6 sm:px-8 w-full sm:w-auto"
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
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
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
