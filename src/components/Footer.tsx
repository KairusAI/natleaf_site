import { useRef, useLayoutEffect } from "react";
import { Linkedin, Github, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import kairusLogo from "@/assets/LogoKairusVector.svg";
import kairusLogoDark from "@/assets/LogoKairusVectorDark.svg";
import { useTheme } from "@/hooks/use-theme";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  company: [
    { name: "Sobre nós", href: "#about" },
    { name: "Carreiras", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contato", href: "#contact" },
  ],
  services: [
    { name: "Inteligência Artificial", href: "#services" },
    { name: "Automação", href: "#services" },
    { name: "Desenvolvimento", href: "#services" },
    { name: "Consultoria", href: "#services" },
  ],
  legal: [
    { name: "Privacidade", href: "#" },
    { name: "Termos", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  const { resolvedTheme } = useTheme();
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Columns stagger animation
      gsap.fromTo(columnsRef.current,
        { 
          y: 50, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reset",
          }
        }
      );

      // Social icons bounce in
      gsap.fromTo(socialRef.current,
        { 
          scale: 0,
          rotation: -180,
          opacity: 0 
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none reset",
          },
          delay: 0.3
        }
      );

      // Bottom line reveal
      gsap.fromTo(bottomRef.current,
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reset",
          },
          delay: 0.5
        }
      );

      // Social hover effect listeners
      socialRef.current.forEach((el) => {
        if (!el) return;
        
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.2,
            y: -3,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="py-16 bg-secondary/30 border-t border-border"
    >
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div 
            ref={(el) => { columnsRef.current[0] = el; }}
            className="col-span-2 md:col-span-1"
          >
            <a href="#" className="mb-4 block">
              <img 
                src={resolvedTheme === "dark" ? kairusLogoDark : kairusLogo} 
                alt="Kairus" 
                className="h-28 w-auto"
              />
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Transformando o futuro através da tecnologia e inovação.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  ref={(el) => { socialRef.current[index] = el; }}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-hover"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div ref={(el) => { columnsRef.current[1] = el; }}>
            <h4 className="text-sm font-medium text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div ref={(el) => { columnsRef.current[2] = el; }}>
            <h4 className="text-sm font-medium text-foreground mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div ref={(el) => { columnsRef.current[3] = el; }}>
            <h4 className="text-sm font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div 
          ref={bottomRef}
          className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kairus. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com precisão no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
