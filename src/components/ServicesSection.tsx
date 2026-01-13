import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Workflow, Smartphone } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const services = [
  {
    icon: Brain,
    title: "Inteligência Artificial",
    description:
      "Soluções de IA personalizadas para automatizar processos, análise de dados avançada e machine learning aplicado ao seu negócio.",
    features: ["Machine Learning", "NLP", "Visão Computacional"],
  },
  {
    icon: Workflow,
    title: "Automação de Processos",
    description:
      "Automatize tarefas repetitivas, otimize fluxos de trabalho e aumente a eficiência operacional da sua empresa.",
    features: ["RPA", "Integração de APIs", "Workflows Inteligentes"],
  },
  {
    icon: Smartphone,
    title: "Desenvolvimento de Apps",
    description:
      "Aplicativos mobile e web modernos, escaláveis e com experiência de usuário excepcional.",
    features: ["Apps iOS & Android", "Web Apps", "PWA"],
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative pt-24 md:pt-32 pb-24 md:pb-32 bg-background overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-16"
        >
          <LiquidGlass className="p-8 rounded-2xl">
            <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wide uppercase mb-4 block"
          >
            Serviços
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4"
          >
            Soluções que <span className="text-gradient">transformam</span> negócios
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-lg"
          >
            Combinamos expertise técnica com visão estratégica para entregar
            resultados excepcionais.
          </motion.p>
          </LiquidGlass>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <LiquidGlass className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-all duration-300">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                  <service.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary font-medium group-hover:from-primary/20 group-hover:to-primary/10 group-hover:border-primary/30 transition-all duration-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
