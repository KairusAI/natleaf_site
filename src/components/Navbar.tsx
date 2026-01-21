import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kairusLogo from "@/assets/LogoKairusVector.svg";
import kairusLogoDark from "@/assets/LogoKairusVectorDark.svg";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/hooks/use-theme";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Serviços", href: "#services" },
  { name: "Sobre", href: "#about" },
  { name: "Projetos", href: "#projects" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Contato", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const { resolvedTheme } = useTheme();
  
  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // GSAP entrance animation
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power3.out",
          delay: 0.2
        }
      );

      // Nav links stagger entrance (filter out null refs)
      const navEls = Array.isArray(navLinksRef.current)
        ? navLinksRef.current.filter(Boolean)
        : navLinksRef.current;
      gsap.fromTo(navEls,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5
        }
      );
    });

    return () => ctx.revert();
  }, []);

  // Mobile menu animation
  useLayoutEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (isMobileMenuOpen) {
      gsap.fromTo(mobileMenuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
      
      // Animate links inside
      const links = mobileMenuRef.current.querySelectorAll('a');
      gsap.fromTo(links,
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
      );
    }
  }, [isMobileMenuOpen]);

  // Progress bar animation with GSAP
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${scrollProgress}%`,
        duration: 0.1,
        ease: "none"
      });
    }
  }, [scrollProgress]);

  useEffect(() => {
    let ticking = false;

    const updateFrom = (scrollY: number) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(scrollY > 50);

        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;

        setScrollProgress(Math.min(100, Math.max(0, progress)));
        // Determine active section from current scroll position (supports virtual scroll like Lenis)
        try {
          const navbarHeight = headerRef.current ? headerRef.current.offsetHeight : 100;
          const sectionEls = navLinks
            .map(link => document.getElementById(link.href.replace('#', '')))
            .filter((el): el is HTMLElement => el !== null);

          let foundActive = '';
          for (const el of sectionEls) {
            const top = el.getBoundingClientRect().top + window.pageYOffset;
            if (top <= scrollY + navbarHeight + 20) {
              foundActive = `#${el.id}`;
            }
          }

          // If nothing matched and we're above first section, clear active
          if (!foundActive) {
            // If near top, clear; otherwise set to first
            if (scrollY > (sectionEls[0]?.getBoundingClientRect().top + window.pageYOffset - navbarHeight)) {
              foundActive = `#${sectionEls[0]?.id}` || '';
            } else {
              foundActive = '';
            }
          }

          if (foundActive !== activeSection) setActiveSection(foundActive);
        } catch (err) {
          // ignore
        }
        ticking = false;
      });
    };

    // native scroll listener (fallback)
    const onWindowScroll = () => updateFrom(window.scrollY);

    // Lenis virtual scroll listener — dispatched by `useSmoothScroll`
    const onLenisScroll = (e: Event) => {
      const detail: any = (e as CustomEvent).detail;
      const scrollY = detail && typeof detail.scrollY === 'number' ? detail.scrollY : window.scrollY;
      updateFrom(scrollY);
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener('lenis:scroll', onLenisScroll as EventListener);

    // run once to sync initial state
    updateFrom(window.scrollY);

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener('lenis:scroll', onLenisScroll as EventListener);
    };
  }, []);

  // Detecta a seção ativa usando Intersection Observer
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace("#", ""));
    
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Considera ativa quando está no topo da viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 100; // Altura aproximada da navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        // Refresh ScrollTrigger after scroll animation
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 1000);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator - Sempre visível */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-border/30 overflow-hidden z-[60]">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-primary via-primary to-primary"
          style={{ width: 0 }}
        />
      </div>

      {/* Header Container - Centraliza quando scrollado */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex transition-all duration-500 ${
        isScrolled ? "justify-center pt-3" : "justify-start"
      }`}>
        <header
          ref={headerRef}
          className={`transition-all duration-500 ${
            isScrolled
              ? "bg-background/60 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/5 rounded-full px-6"
              : "bg-transparent w-full"
          }`}
          style={isScrolled ? {
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          } : {}}
        >
          <nav className={`flex items-center transition-all duration-500 ${
            isScrolled 
              ? "px-2 py-2 gap-6" 
              : "container mx-auto px-6 md:px-8 lg:px-12 py-0 justify-between"
          }`}>
            <a href="#" className="flex items-center">
              <img 
                src={resolvedTheme === "dark" ? kairusLogoDark : kairusLogo} 
                alt="Kairus" 
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? "h-12" : "h-24"
                }`}
              />
            </a>

            {/* Desktop Navigation */}
            <div className={`hidden md:flex items-center transition-all duration-500 ${
              isScrolled ? "gap-4" : "gap-8"
            }`}>
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    ref={(el) => { navLinksRef.current[index] = el; }}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative transition-colors duration-200 group cursor-pointer cursor-hover ${
                      isScrolled ? "text-sm" : "text-base"
                    } ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, {
                        y: -2,
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        duration: 0.2,
                        ease: "power2.out"
                      });
                    }}
                  >
                    {link.name}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}></span>
                  </a>
                );
              })}
              <ThemeToggle />
            </div>

            {/* Mobile Theme Toggle & Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <button
                className="p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-foreground" />
                ) : (
                  <Menu className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className={`fixed z-40 md:hidden transition-all duration-500 ${
            isScrolled 
              ? "top-20 left-1/2 -translate-x-1/2 rounded-2xl border border-white/20 shadow-lg"
              : "top-24 left-0 right-0 border-b border-border"
          }`}
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            opacity: 0
          }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative text-base transition-colors py-2 group cursor-pointer ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
