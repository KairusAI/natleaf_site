import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

const footerLinks = {
  produtos: [
    { name: "Natleaf Wellness", href: "/produtos/wellness" },
    { name: "Natleaf Brain", href: "/produtos/brain" },
    { name: "Natleaf Sleep", href: "/produtos/sleep" },
    { name: "Ver todos os produtos", href: "/produtos" },
  ],
  institucional: [
    { name: "Quem Somos", href: "/quem-somos" },
    { name: "Conheça o CBD", href: "/conheca-o-cbd" },
    { name: "Para Médicos", href: "/para-medicos" },
    { name: "Blog", href: "/blog" },
  ],
  suporte: [
    { name: "Contato", href: "/contato" },
    { name: "Processo de Compra", href: "/conheca-o-cbd#como-adquirir" },
    { name: "Autorização ANVISA", href: "/conheca-o-cbd#como-adquirir" },
    { name: "WhatsApp", href: "https://wa.me/5521975190000" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-secondary/20 border-t border-border">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 block">
              <img src="/NATLEAF-LOGO.avif" alt="Natleaf" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground mb-2 font-medium italic">
              "Elevating Your Health"
            </p>
            <p className="text-sm text-muted-foreground mb-6 max-w-xs leading-relaxed">
              Principal produto da Invented Green LLC — empresa americana dedicada à medicina fitoterápica de alta qualidade.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="tel:+5521975190000" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                +55 21 97519-0000
              </a>
              <a href="mailto:hello@inventedgreen.com.br" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                hello@inventedgreen.com.br
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>7345 W Sand Lake Rd, Ste 210 — Orlando, FL 32819 — USA</span>
              </span>
            </div>
          </div>

          {/* Produtos */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Produtos</h4>
            <ul className="space-y-3">
              {footerLinks.produtos.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Institucional</h4>
            <ul className="space-y-3">
              {footerLinks.institucional.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("http") ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="mb-8 p-4 rounded-xl bg-muted/40 border border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong className="text-foreground/70">Aviso legal:</strong> Os produtos Natleaf não foram avaliados pela ANVISA para diagnóstico, tratamento, cura ou prevenção de doenças. A comercialização no Brasil requer receita médica e autorização de importação da ANVISA. Consulte sempre um médico antes de iniciar qualquer tratamento.
          </p>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Natleaf · Invented Green, LLC. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/5521975190000" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/natleaf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://facebook.com/natleaf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}