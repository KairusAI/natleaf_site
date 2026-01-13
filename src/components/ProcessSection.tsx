import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Search, PenTool, Code, Rocket } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

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
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="process" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wide uppercase mb-4 block"
          >
            Como Funciona
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6"
          >
            Simples, transparente e{" "}
            <span className="text-primary">focado em resultado</span>
          </motion.h2>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0" />
              )}

              <LiquidGlass className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 relative z-10">
                {/* Number */}
                <div className="text-5xl font-bold text-primary/20 mb-4 group-hover:text-primary/30 transition-colors duration-300">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-4 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <step.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
