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
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
              animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-primary-foreground tracking-tight mb-6"
            >
              {fullText}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-primary-foreground/80 mb-10 max-w-xl mx-auto"
            >
              Entre em contato e descubra como podemos criar soluções
              personalizadas para impulsionar seu crescimento.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
