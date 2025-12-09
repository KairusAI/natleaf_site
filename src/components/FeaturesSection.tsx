import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Zap, Shield, Clock, Users, Code } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Entrega Rápida",
    description: "Metodologias ágeis para resultados em tempo recorde.",
  },
  {
    icon: Shield,
    title: "Código Seguro",
    description: "Segurança como prioridade em cada linha de código.",
  },
  {
    icon: Clock,
    title: "Suporte 24/7",
    description: "Equipe dedicada disponível quando você precisar.",
  },
  {
    icon: Users,
    title: "Time Especialista",
    description: "Profissionais com experiência em grandes projetos.",
  },
  {
    icon: Code,
    title: "Código Limpo",
    description: "Manutenção simples e escalabilidade garantida.",
  },
  {
    icon: Check,
    title: "Qualidade Total",
    description: "Testes rigorosos e controle de qualidade em cada etapa.",
  },
];

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
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
              Por que nos escolher
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-6"
            >
              Tecnologia de ponta com{" "}
              <span className="text-gradient">excelência</span> em cada detalhe
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-muted-foreground text-lg mb-8 leading-relaxed"
            >
              Há mais de uma década entregamos soluções que combinam inovação
              tecnológica com resultados mensuráveis. Nossa abordagem centrada no
              cliente garante que cada projeto supere expectativas.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex gap-12"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-semibold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Anos de experiência
                </div>
              </motion.div>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <div className="text-4xl font-semibold text-foreground">24h</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Tempo de resposta
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Content - Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50, scale: 0.9, rotateZ: -2 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateZ: 0 } : {}}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + (index * 0.1),
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="p-5 rounded-xl bg-background border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-foreground mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
