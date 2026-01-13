import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Workflow, Smartphone, Bot, Link2, ArrowRight } from "lucide-react";
import { LiquidGlass } from "@/components/ui/liquid-glass";

const services = [
  {
    icon: Workflow,
    title: "Automação de processos",
    description:
      "Elimine tarefas manuais e repetitivas com fluxos inteligentes que trabalham 24/7.",
    features: ["RPA", "Workflows", "Bots"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Bot,
    title: "Agentes e assistentes de IA",
    description:
      "IA treinada para atender, analisar dados, vender ou dar suporte ao seu cliente.",
    features: ["Chatbots", "NLP", "Machine Learning"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Link2,
    title: "Integrações entre sistemas",
    description:
      "Conectamos APIs, CRMs, ERPs, WhatsApp, e-mail e muito mais em um só lugar.",
    features: ["APIs", "Webhooks", "Sync"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
  {
    icon: Smartphone,
    title: "Softwares personalizados",
    description:
      "Aplicações web e mobile feitas sob medida para resolver exatamente o que você precisa.",
    features: ["Web Apps", "Mobile", "PWA"],
    color: "from-blue-500/20 to-blue-600/10",
    hoverColor: "from-blue-500/30 to-blue-600/20",
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wide uppercase mb-4 block"
          >
            O que fazemos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight mb-6"
          >
            Soluções que <span className="text-primary">impulsionam</span> resultados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-lg md:text-xl"
          >
            Tecnologia de ponta aplicada ao seu negócio de forma prática e estratégica.
          </motion.p>
        </motion.div>

        {/* Services Grid - 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.3 + index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <LiquidGlass className="group h-full p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <div className="flex items-start gap-5">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center flex-shrink-0 group-hover:${service.hoverColor} transition-all duration-300`}>
                    <service.icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-2 flex items-center gap-2">
                      {service.title}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium group-hover:bg-primary/20 transition-all duration-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
