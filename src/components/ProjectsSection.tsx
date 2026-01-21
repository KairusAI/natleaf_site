import { useRef, useLayoutEffect, useEffect } from "react";
import logoA10 from "@/assets/logo-a10.png";
import logoVish from "@/assets/logo-vish.png";
import logoRae from "@/assets/logo-rae.png";
import logoGymTrackerHub from "@/assets/LogoGymTrackerHub.svg";
import logoNatileaf from "@/assets/NATILEAF LOGO.avif";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { name: "A10 Analytics", logo: logoA10 },
  { name: "Vish", logo: logoVish },
  { name: "RAE Nutrition", logo: logoRae },
  { name: "GymTrackerHub", logo: logoGymTrackerHub },
  { name: "Natileaf", logo: logoNatileaf },
];

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        const elements = headerRef.current.children;
        gsap.fromTo(elements,
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Carousel container reveal
      if (carouselRef.current) {
        gsap.fromTo(carouselRef.current,
          { 
            autoAlpha: 0, 
            scaleX: 0.9,
            clipPath: "inset(0 50% 0 50%)",
          },
          {
            autoAlpha: 1,
            scaleX: 1,
            clipPath: "inset(0 0% 0 0%)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // GSAP infinite scroll animation with resize handling
  useEffect(() => {
    if (!trackRef.current) return;

    let tween: gsap.core.Tween | null = null;
    
    const setupAnimation = () => {
      const track = trackRef.current;
      if (!track) return;
      
      const items = track.children;
      const totalWidth = Array.from(items).slice(0, projects.length).reduce(
        (acc, item) => acc + (item as HTMLElement).offsetWidth + 64, 0
      );

      // Kill existing tween if any
      if (tween) {
        tween.kill();
      }

      // Create the infinite scroll animation - never pauses
      tween = gsap.to(track, {
        x: -totalWidth,
        duration: 25,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
        }
      });
    };

    // Initial setup
    setupAnimation();

    // Handle resize with debounce
    let resizeTimeout: number;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setupAnimation();
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (tween) {
        tween.kill();
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section id="projects" className="relative pt-12 md:pt-16 pb-24 md:pb-32 bg-background overflow-hidden" ref={containerRef}>
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 mb-16">
          <div
            ref={headerRef}
            className="text-center"
          >
            <span className="text-base font-medium text-primary tracking-wider uppercase block gsap-hidden">
              Quem já confia na Kairus
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight gsap-hidden">
              Empresas que <span className="text-primary">transformaram</span> seus negócios
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto gsap-hidden">
              Conheça algumas das empresas que escolheram a Kairus para impulsionar seus resultados
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="relative overflow-hidden w-full gsap-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
        >
          {/* Carrossel GSAP */}
          <div className="relative py-12">
            <div 
              ref={trackRef}
              className="flex gap-16"
            >
              {/* Duplicate items for seamless loop */}
              {[...projects, ...projects, ...projects].map((project, index) => (
                <div
                  key={`logo-${index}`}
                  className="flex-shrink-0 w-48 h-24 flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-500 cursor-pointer group"
                >
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="max-w-full max-h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Gradientes de fade nas bordas */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background/90 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background/90 to-transparent pointer-events-none z-10" />
        </div>
      </div>
    </section>
  );
};
