import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Produtos", href: "/produtos" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Conheça o CBD", href: "/conheca-o-cbd" },
  { label: "Para Médicos", href: "/para-medicos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const headerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
        progressRef.current.style.width = `${progress}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".nav-link-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.06, delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileLinksRef.current) return;
    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" }
      );
      gsap.fromTo(
        mobileLinksRef.current.querySelectorAll("a, button"),
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.05 }
      );
    }
  }, [mobileOpen]);

  const handleNavHover = useCallback((el: HTMLElement, enter: boolean) => {
    gsap.to(el, { y: enter ? -2 : 0, duration: 0.2, ease: "power2.out" });
  }, []);

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-transparent pointer-events-none">
        <div ref={progressRef} className="h-full bg-primary transition-none" style={{ width: "0%" }} />
      </div>

      <div
        className={cn(
          "fixed z-50 transition-all duration-500",
          scrolled ? "top-4 left-1/2 -translate-x-1/2 w-fit" : "top-0 left-0 right-0"
        )}
      >
        <div ref={headerRef}>
          <div
            className={cn(
              "flex items-center gap-6 transition-all duration-500",
              scrolled
                ? "w-fit rounded-full border border-border/40 bg-white/80 backdrop-blur-xl shadow-md px-6 py-3"
                : "px-6 md:px-12 py-4 bg-white/95 backdrop-blur-sm border-b border-border/20 w-screen justify-between"
            )}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="/NATLEAF-LOGO.avif"
                alt="Natleaf"
                className={cn("transition-all duration-300 object-contain", scrolled ? "h-7" : "h-10")}
              />
            </Link>

            {/* Desktop nav */}
            <nav className={cn("hidden md:flex items-center gap-1", !scrolled && "flex-1 justify-center")}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "nav-link-item relative px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-200",
                    isActive(link.href)
                      ? "text-primary bg-primary/8"
                      : "text-foreground/70 hover:text-foreground hover:bg-muted/60"
                  )}
                  onMouseEnter={(e) => handleNavHover(e.currentTarget, true)}
                  onMouseLeave={(e) => handleNavHover(e.currentTarget, false)}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </Link>
              ))}
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://wa.me/5521975190000"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block"
              >
                <Button size="sm" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-5">
                  Adquirir
                </Button>
              </a>
              <button
                className="md:hidden p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="md:hidden mt-2 mx-4 rounded-2xl border border-border/40 bg-white/95 backdrop-blur-xl shadow-lg overflow-hidden"
          >
            <div ref={mobileLinksRef} className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-border/30">
                <a href="https://wa.me/5521975190000" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground">
                    Adquirir
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}