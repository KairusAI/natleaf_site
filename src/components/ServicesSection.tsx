import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Workflow, Smartphone } from "lucide-react";

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
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-base font-medium text-primary tracking-wide uppercase mb-4 block">
            Serviços
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Soluções que <span className="text-gradient">transformam</span> negócios
          </h2>
          <p className="text-muted-foreground text-lg">
            Combinamos expertise técnica com visão estratégica para entregar
            resultados excepcionais.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className="group h-full p-8 rounded-2xl bg-secondary/50 border-2 border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
