import { motion } from "framer-motion";
import { Linkedin, Github, Twitter } from "lucide-react";
import kairusLogo from "@/assets/kairus_logo.png";

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
    { name: "Consultoria", href: "#" },
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
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="py-16 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="mb-4 block">
              <img 
                src={kairusLogo} 
                alt="Kairus" 
                className="h-28 w-auto"
              />
            </a>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs">
              Transformando o futuro através da tecnologia e inovação.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Serviços</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
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
