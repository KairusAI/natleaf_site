import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) setSubmitted(true);
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
            Junte-se à nossa comunidade
          </h2>
          <p className="text-muted-foreground text-lg mb-3">
            Junte-se à nossa comunidade de entusiastas do CBD Natleaf
          </p>
          <p className="text-muted-foreground text-base mb-10">
            Receba dicas de uso, informações sobre dosagem, promoções exclusivas e novidades diretamente no seu e-mail.
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-8 px-6 rounded-2xl bg-primary/5 border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary" />
              <span className="text-foreground font-medium">Obrigado! Você agora faz parte da comunidade Natleaf.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <Input
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 rounded-xl h-12 text-base border-border/60 focus:border-primary"
                required
              />
              <Input
                type="email"
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-xl h-12 text-base border-border/60 focus:border-primary"
                required
              />
              <Button
                type="submit"
                className="rounded-xl h-12 px-6 bg-primary text-primary-foreground hover:bg-primary/90 gap-2 whitespace-nowrap"
              >
                Quero me cadastrar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            Sem spam. Cancele quando quiser. Seus dados estão seguros.
          </p>
        </div>
      </div>
    </section>
  );
}
