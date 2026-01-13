import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Target, Cog } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { optimizedTransitions } from "@/hooks/use-optimized-animation";

const benefits = [
  {
    icon: Cog,
    title: "Sistemas sob medida",
    description: "Criamos a partir do seu processo, não de templates genéricos.",
  },
  {
    icon: Target,
    title: "Foco em resultados",
    description: "Cada automação tem um propósito claro e mensurável.",
  },
  {
    icon: Sparkles,
    title: "IA que funciona",
    description: "Inteligência artificial integrada ao seu fluxo real de trabalho.",
  },
];

export function SolutionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Aumentando margem para iniciar animação mais cedo
  const isInView = useInView(containerRef, { once: true, margin: "-50px", amount: 0.1 });

  return (
    <section 
      id="solution" 
      className="relative py-24 md:py-32 bg-background overflow-hidden" 
      ref={containerRef}
    >
      {/* Background sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content - Animações simplificadas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={optimizedTransitions.default}
          >
            <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block">
              A Solução
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6">
              IA personalizada, construída para o{" "}
              <span className="text-primary">seu fluxo real</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg">
              <p>
                Na Kairus, <strong className="text-foreground">não vendemos ferramentas prontas</strong>.
              </p>
              <p>
                Criamos sistemas inteligentes sob medida, pensados a partir do seu processo, 
                do seu time e dos seus objetivos.
              </p>
              <p className="text-primary font-medium">
                Cada projeto é único. Cada automação tem um propósito claro.
              </p>
            </div>
          </motion.div>

          {/* Benefits Cards - Animações otimizadas */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + index * 0.08,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <LiquidGlass className="group p-6 rounded-2xl hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                      <benefit.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
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
