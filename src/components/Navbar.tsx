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
  const prevScrolled = useRef(false);

  const outerRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
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

  // Entry animation
  useGSAP(() => {
    if (!outerRef.current) return;
    gsap.fromTo(
      outerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      ".nav-link-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.06, delay: 0.5 }
    );
  }, []);

  // Scroll state transition — fully GSAP driven, no CSS transition conflicts
  useEffect(() => {
    if (!outerRef.current || !pillRef.current) return;
    if (prevScrolled.current === scrolled) return;
    prevScrolled.current = scrolled;

    const dur = 0.6;
    const ease = "power3.inOut";

    if (scrolled) {
      gsap.to(outerRef.current, {
        paddingTop: 16, paddingLeft: 16, paddingRight: 16,
        duration: dur, ease,
      });
      gsap.to(pillRef.current, {
        borderRadius: 9999,
        boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
        backgroundColor: "rgba(255,255,255,0.70)",
        paddingTop: 10, paddingBottom: 10,
        duration: dur, ease,
      });
      if (logoRef.current) {
        gsap.to(logoRef.current, { height: 28, duration: dur * 0.85, ease });
      }
    } else {
      gsap.to(outerRef.current, {
        paddingTop: 0, paddingLeft: 0, paddingRight: 0,
        duration: dur, ease,
      });
      gsap.to(pillRef.current, {
        borderRadius: 0,
        boxShadow: "none",
        backgroundColor: "rgba(255,255,255,0.97)",
        paddingTop: 16, paddingBottom: 16,
        duration: dur, ease,
      });
      if (logoRef.current) {
        gsap.to(logoRef.current, { height: 40, duration: dur * 0.85, ease });
      }
    }
  }, [scrolled]);

  // Mobile menu animation
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

      {/* Outer wrapper: always full-width fixed strip; GSAP animates padding to create pill inset */}
      <div ref={outerRef} className="fixed top-0 left-0 right-0 z-50">
        {/* Pill bar: GSAP animates borderRadius, bg, shadow, vertical padding */}
        <div
          ref={pillRef}
          className={cn(
            "flex items-center gap-6 backdrop-blur-xl border-border/40",
            scrolled ? "px-6 justify-between border" : "px-6 md:px-12 justify-between border-b"
          )}
          style={{ backgroundColor: "rgba(255,255,255,0.97)", paddingTop: 16, paddingBottom: 16 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              ref={logoRef}
              src="/NATLEAF-LOGO.avif"
              alt="Natleaf"
              className="object-contain"
              style={{ height: 40 }}
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