import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import kairusLogo from "@/assets/LogoKairusVector.svg";
import kairusLogoDark from "@/assets/LogoKairusVectorDark.svg";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "@/hooks/use-theme";

const navLinks = [
  { name: "Serviços", href: "#services" },
  { name: "Projetos", href: "#projects" },
  { name: "Sobre", href: "#about" },
  { name: "Depoimentos", href: "#testimonials" },
  { name: "Contato", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("");
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        
        setIsScrolled(currentScrollY > 50);
        
        // Calcula o progresso do scroll
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollableHeight = documentHeight - windowHeight;
        const progress = scrollableHeight > 0 ? (currentScrollY / scrollableHeight) * 100 : 0;
        
        setScrollProgress(Math.min(100, Math.max(0, progress)));
        ticking = false;
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
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
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Scroll Progress Indicator - Sempre visível */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-border/30 overflow-hidden z-[60]">
        <motion.div
          className="h-full bg-gradient-to-r from-primary via-primary to-primary"
          style={{
            width: `${scrollProgress}%`,
          }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Header Container - Centraliza quando scrollado */}
      <div className={`fixed top-0 left-0 right-0 z-50 flex transition-all duration-500 ${
        isScrolled ? "justify-center pt-3" : "justify-start"
      }`}>
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
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
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative transition-colors duration-200 group cursor-pointer ${
                      isScrolled ? "text-sm" : "text-base"
                    } ${
                      isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
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
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`fixed z-40 md:hidden transition-all duration-500 ${
              isScrolled 
                ? "top-20 left-1/2 -translate-x-1/2 rounded-2xl border border-white/20 shadow-lg"
                : "top-24 left-0 right-0 border-b border-border"
            }`}
            style={{
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
