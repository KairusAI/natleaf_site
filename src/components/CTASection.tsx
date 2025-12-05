import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const fullText = "Pronto para transformar tempo em oportunidade?";

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-accent p-12 md:p-16"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: "32px 32px",
              }}
            />
          </div>

          {/* Animated Waves */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {/* Wave 1 - Center */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, hsl(210 80% 60% / 0.3) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
              animate={{
                scale: [1, 3, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            
            {/* Wave 2 - Center with delay */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: "200px",
                height: "200px",
                background: "radial-gradient(circle, hsl(210 75% 55% / 0.25) 0%, transparent 70%)",
                filter: "blur(25px)",
              }}
              animate={{
                scale: [1, 3.5, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1,
              }}
            />
            
            {/* Wave 3 - Top left */}
            <motion.div
              className="absolute top-[20%] left-[20%] rounded-full"
              style={{
                width: "150px",
                height: "150px",
                background: "radial-gradient(circle, hsl(210 85% 60% / 0.2) 0%, transparent 70%)",
                filter: "blur(15px)",
              }}
              animate={{
                scale: [1, 2.5, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.5,
              }}
            />
            
            {/* Wave 4 - Bottom right */}
            <motion.div
              className="absolute bottom-[20%] right-[20%] rounded-full"
              style={{
                width: "150px",
                height: "150px",
                background: "radial-gradient(circle, hsl(210 80% 55% / 0.2) 0%, transparent 70%)",
                filter: "blur(15px)",
              }}
              animate={{
                scale: [1, 2.8, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1.5,
              }}
            />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(20px)" }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground tracking-tight mb-6"
            >
              {fullText}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto"
            >
              Entre em contato e descubra como podemos criar soluções
              personalizadas para impulsionar seu crescimento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                variant="secondary"
                className="group px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Agendar reunião
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="group px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Fale conosco
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
