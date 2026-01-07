import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import logoA10 from "@/assets/logo-a10.png";
import logoVish from "@/assets/logo-vish.png";
import logoRae from "@/assets/logo-rae.png";
import logoGymTrackerHub from "@/assets/LogoGymTrackerHub.svg";
import logoNatileaf from "@/assets/NATILEAF LOGO.avif";

const projects = [
  { name: "A10 Analytics", logo: logoA10 },
  { name: "Vish", logo: logoVish },
  { name: "RAE Nutrition", logo: logoRae },
  { name: "GymTrackerHub", logo: logoGymTrackerHub },
  { name: "Natileaf", logo: logoNatileaf },
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 md:py-32 bg-background overflow-hidden" ref={containerRef}>
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.span
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base font-medium text-primary tracking-wider uppercase block"
          >
            Portfólio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-4 text-4xl md:text-5xl font-bold text-foreground"
          >
            Projetos em Destaque
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Empresas que confiam nas nossas soluções
          </motion.p>
        </motion.div>
        </div>

        {/* Liquid Glass Container - Full Width */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-hidden w-full"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >

          {/* Carrossel infinito */}
          <div className="relative py-12">
            <div className="flex gap-16 animate-scroll">
              {/* Primeiro conjunto */}
              {projects.map((project, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
                >
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              ))}
              {/* Segundo conjunto para loop infinito */}
              {projects.map((project, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500"
                >
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes de fade nas bordas */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background/80 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};
