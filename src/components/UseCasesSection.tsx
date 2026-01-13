import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Clock, Users, RefreshCw, CheckCircle2 } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const useCases = [
  {
    icon: TrendingUp,
    title: "Empresas que querem escalar sem aumentar equipe",
  },
  {
    icon: Clock,
    title: "Negócios com processos manuais ou lentos",
  },
  {
    icon: Users,
    title: "Times sobrecarregados com tarefas operacionais",
  },
  {
    icon: RefreshCw,
    title: "Empresas que já testaram IA, mas não viram resultado",
  },
];

export function UseCasesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="use-cases" 
      className="relative pt-24 md:pt-32 pb-12 md:pb-16 bg-background overflow-hidden" 
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
            Para quem é
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6"
          >
            Se encaixa no seu <span className="text-primary">cenário</span>?
          </motion.h2>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <LiquidGlass className="group h-full p-6 rounded-2xl hover:border-primary/50 transition-all duration-300 text-center">
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-5 mx-auto group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <useCase.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <p className="text-foreground font-medium leading-relaxed group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </p>

                {/* Check indicator */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 300 }}
                  className="mt-4 flex justify-center"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors duration-300" />
                </motion.div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
