import { useState } from "react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle, BookOpen, Microscope, Users, Gift, Phone, Mail } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Acesso a informações detalhadas",
    description: "Acesso completo a informações técnicas sobre nossos produtos, composição, mecanismos de ação e indicações terapêuticas.",
  },
  {
    icon: Microscope,
    title: "Dosagens recomendadas",
    description: "Orientações de dosagem recomendadas por perfil de paciente — por peso, condição, faixa etária e sensibilidade ao CBD.",
  },
  {
    icon: Users,
    title: "Suporte técnico e científico",
    description: "Suporte direto com a equipe especialista em CBD da Natleaf para esclarecimento de dúvidas clínicas e científicas.",
  },
  {
    icon: Gift,
    title: "Amostras para avaliação",
    description: "Amostras dos produtos para experimentação própria ou para pacientes selecionados, mediante cadastro aprovado.",
  },
];

export default function ParaMedicos() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "", crm: "", estado: "", especialidade: "", email: "", telefone: "", mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Para Médicos</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Programa de<br />
              <span className="text-gradient">Prescrição Natleaf</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A Natleaf valoriza a importância da orientação médica na prescrição do CBD para seus pacientes. Por isso, oferecemos um processo simples e fácil para que os médicos possam se cadastrar em nosso programa de prescrição de CBD.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Benefícios</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              O que você recebe ao se cadastrar
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2">{b.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Cadastro</span>
              <h2 className="mt-3 text-3xl font-semibold text-foreground tracking-tight">
                Solicitar Cadastro Médico
              </h2>
              <p className="mt-3 text-muted-foreground">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas úteis.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-12 px-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                <CheckCircle className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-semibold text-foreground">Solicitação recebida!</h3>
                <p className="text-muted-foreground">Nossa equipe entrará em contato em breve para confirmar seus dados e ativar o cadastro.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="nome">Nome completo *</Label>
                  <Input id="nome" name="nome" value={form.nome} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="Dr. João Silva" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="crm">CRM *</Label>
                    <Input id="crm" name="crm" value={form.crm} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="12345" required />
                  </div>
                  <div>
                    <Label htmlFor="estado">Estado *</Label>
                    <Input id="estado" name="estado" value={form.estado} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="SP" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="especialidade">Especialidade médica *</Label>
                  <Input id="especialidade" name="especialidade" value={form.especialidade} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="Neurologista, Clínico Geral, etc." required />
                </div>
                <div>
                  <Label htmlFor="email">E-mail profissional *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="medico@clinica.com.br" required />
                </div>
                <div>
                  <Label htmlFor="telefone">Telefone / WhatsApp *</Label>
                  <Input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="+55 11 99999-9999" required />
                </div>
                <div>
                  <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                  <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} className="mt-1.5 rounded-xl resize-none" rows={4} placeholder="Conte-nos mais sobre sua prática médica ou dúvidas sobre o programa..." />
                </div>
                <Button type="submit" className="w-full rounded-xl h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-base">
                  Solicitar Cadastro
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Dosage */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Posologia</span>
            <h2 className="mt-3 text-3xl font-semibold text-foreground tracking-tight mb-6">
              Orientações de Dosagem
            </h2>
            <div className="space-y-4">
              {[
                "Utilizar **conforme prescrição médica individualizada** — não existe dose universal.",
                "Produto administrado por via **sublingual** (embaixo da língua) para melhor absorção e biodisponibilidade.",
                "**Respeitar dosagem e periodicidade** prescrita pelo médico responsável.",
                "**Ajustes de dose** devem ser realizados apenas em consulta médica, com monitoramento clínico.",
                "Iniciar com **doses baixas** e aumentar progressivamente conforme resposta clínica do paciente.",
              ].map((item, i) => {
                const parts = item.split("**");
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {parts.map((part, j) =>
                        j % 2 === 1 ? <strong key={j} className="text-foreground">{part}</strong> : part
                      )}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-5 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-foreground/80 italic">
                "Na Natleaf, estamos comprometidos em fornecer os melhores produtos de CBD do mercado, sempre com a orientação médica adequada para garantir a segurança e eficácia dos nossos produtos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Direct contact */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-lg mx-auto text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Contato Direto para Médicos</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+5521975190000" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors">
                <Phone className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">+55 21 97519-0000</span>
              </a>
              <a href="mailto:hello@inventedgreen.com.br" className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">hello@inventedgreen.com.br</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
