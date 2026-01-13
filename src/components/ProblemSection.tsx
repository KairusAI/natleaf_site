import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertCircle, Puzzle, Brain } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const problems = [
  {
    icon: Puzzle,
    title: "Soluções genéricas",
    description: "Ferramentas prontas que não se adaptam às particularidades do seu negócio.",
  },
  {
    icon: AlertCircle,
    title: "Complexidade excessiva",
    description: "Sistemas tão complicados que seu time nunca consegue usar de verdade.",
  },
  {
    icon: Brain,
    title: "IA sem resultado",
    description: "Promessas de inteligência artificial que nunca viram resultado prático.",
  },
];

export function ProblemSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="problem" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wide uppercase mb-4 block"
          >
            O Problema
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6"
          >
            Empresas sabem que precisam de{" "}
            <span className="text-primary">automação e IA</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl"
          >
            O problema é quase sempre o mesmo:
          </motion.p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.4 + index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <LiquidGlass 
                className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <problem.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
