import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Target, MessageCircle, Brain, Handshake, Check } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const differentials = [
  {
    icon: Sparkles,
    title: "Soluções 100% personalizadas",
  },
  {
    icon: Target,
    title: "Foco em impacto real no negócio",
  },
  {
    icon: MessageCircle,
    title: "Linguagem simples, sem tecnês desnecessário",
  },
  {
    icon: Brain,
    title: "IA aplicada de forma prática e responsável",
  },
  {
    icon: Handshake,
    title: "Parceria de longo prazo, não projeto descartável",
  },
  {
    icon: Check,
    title: "Tecnologia com estratégia, não só código",
  },
];

export function WhyKairusSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" 
      ref={containerRef}
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base font-medium text-primary tracking-wide uppercase mb-4 block"
            >
              Por que Kairus
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6"
            >
              Tecnologia com <span className="text-primary">estratégia</span>,{" "}
              não só código
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Entendemos que tecnologia só faz sentido quando gera resultado real. 
              Por isso, cada projeto é tratado como uma parceria, não como um simples serviço.
            </motion.p>
          </motion.div>

          {/* Right - Differentials Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {differentials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.4 + index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <LiquidGlass className="group p-5 rounded-xl hover:border-primary/50 transition-all duration-300 h-full">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <item.icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <p className="text-foreground font-medium leading-snug group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </p>
                  </div>
                </LiquidGlass>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
