import { useState } from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const subjects = [
  "Dúvidas sobre produtos",
  "Autorização ANVISA",
  "Programa Médico",
  "Processo de compra",
  "Outros",
];

export default function Contato() {
  const [submitted, setSubmitted] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });
  const [newsletter, setNewsletter] = useState({ nome: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewsletter({ ...newsletter, [e.target.name]: e.target.value });
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Contato</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Fale com a Natleaf
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Estamos aqui para ajudar. Envie sua mensagem ou entre em contato direto pelos canais abaixo.
          </p>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-8">Envie uma mensagem</h2>
              {submitted ? (
                <div className="flex flex-col items-center gap-4 py-12 text-center">
                  <CheckCircle className="w-12 h-12 text-primary" />
                  <h3 className="text-xl font-semibold text-foreground">Mensagem enviada!</h3>
                  <p className="text-muted-foreground">Retornaremos em até 24 horas úteis.</p>
                  <Button variant="outline" className="rounded-xl mt-2" onClick={() => setSubmitted(false)}>
                    Enviar outra mensagem
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="space-y-5"
                >
                  <div>
                    <Label htmlFor="nome">Nome *</Label>
                    <Input id="nome" name="nome" value={form.nome} onChange={handleChange} className="mt-1.5 rounded-xl" required placeholder="Seu nome" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="mt-1.5 rounded-xl" required placeholder="seu@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="telefone">Telefone / WhatsApp</Label>
                      <Input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="+55 11 99999-9999" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="assunto">Assunto</Label>
                    <select
                      id="assunto"
                      name="assunto"
                      value={form.assunto}
                      onChange={handleChange}
                      className="mt-1.5 w-full h-10 rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Selecione um assunto</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} className="mt-1.5 rounded-xl resize-none" rows={5} required placeholder="Como podemos ajudar você?" />
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                    Enviar mensagem
                  </Button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-foreground">Contato direto</h2>
              <div className="space-y-4">
                <a href="tel:+5521975190000" className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone / WhatsApp</p>
                    <p className="font-semibold text-foreground">+55 21 97519-0000</p>
                  </div>
                </a>
                <a href="mailto:hello@inventedgreen.com.br" className="flex items-center gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-200">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-semibold text-foreground">hello@inventedgreen.com.br</p>
                  </div>
                </a>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-secondary/30 border border-border/50">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Endereço</p>
                    <p className="font-semibold text-foreground">INVENTED GREEN, LLC</p>
                    <p className="text-sm text-muted-foreground">7345 W Sand Lake Rd, Ste 210, Office 2318</p>
                    <p className="text-sm text-muted-foreground">Orlando, FL 32819 — USA</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/5521975190000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-2xl bg-green-50 border border-green-200 hover:bg-green-100 transition-colors group"
              >
                <div>
                  <p className="font-semibold text-green-800">Prefere o WhatsApp?</p>
                  <p className="text-sm text-green-700">Resposta mais rápida pelo WhatsApp</p>
                </div>
                <ArrowRight className="w-5 h-5 text-green-700 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              Junte-se à nossa comunidade
            </h2>
            <p className="text-muted-foreground mb-3">
              Junte-se à nossa comunidade de entusiastas do óleo de CBD Natleaf e receba informações exclusivas sobre os benefícios desse incrível produto.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Ao se cadastrar, você terá acesso a: dicas de uso e modos de administração, informações sobre dosagem, recomendações de produtos complementares e promoções especiais.
            </p>
            {newsletterSubmitted ? (
              <div className="flex items-center justify-center gap-3 py-6">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="text-foreground font-medium">Você agora faz parte da comunidade Natleaf!</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setNewsletterSubmitted(true); }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <Input
                  name="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={newsletter.nome}
                  onChange={handleNewsletterChange}
                  className="flex-1 rounded-xl h-12"
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Seu e-mail"
                  value={newsletter.email}
                  onChange={handleNewsletterChange}
                  className="flex-1 rounded-xl h-12"
                  required
                />
                <Button type="submit" className="rounded-xl h-12 px-6 bg-primary text-primary-foreground whitespace-nowrap">
                  Quero me cadastrar
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
