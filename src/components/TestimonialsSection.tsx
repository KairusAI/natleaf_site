import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "CEO",
    company: "TechCorp Solutions",
    content:
      "A Kairus transformou completamente nossa operação com soluções de IA personalizadas. O retorno sobre investimento foi impressionante e a equipe sempre disponível para suporte.",
    rating: 5,
    avatar: "CS",
  },
  {
    name: "Ana Paula Santos",
    role: "Diretora de Inovação",
    company: "InnovaTech",
    content:
      "Trabalhar com a Kairus foi uma experiência excepcional. Eles entenderam perfeitamente nossas necessidades e entregaram uma solução que superou todas as expectativas.",
    rating: 5,
    avatar: "AS",
  },
  {
    name: "Roberto Mendes",
    role: "CTO",
    company: "Digital Ventures",
    content:
      "A automação de processos implementada pela Kairus reduziu nosso tempo de resposta em 70%. Profissionais extremamente competentes e dedicados ao sucesso do cliente.",
    rating: 5,
    avatar: "RM",
  },
];

export function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative py-24 md:py-32 bg-secondary/30 overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wide uppercase block mb-4"
          >
            Depoimentos
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4"
          >
            O que nossos <span className="text-gradient">clientes</span> dizem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Conheça a experiência de quem confia na Kairus para transformar seus negócios
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="group h-full p-8 rounded-2xl bg-background border-2 border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 relative overflow-hidden">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-16 h-16 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-8 leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


