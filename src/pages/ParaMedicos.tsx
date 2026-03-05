import { useState, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2, BookOpen, Microscope, Users, Gift,
  Phone, Mail, Stethoscope, ArrowRight, ShieldCheck, ClipboardList,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const staggerParent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const benefits = [
  {
    icon: BookOpen,
    title: "Informações técnicas completas",
    description: "Acesso a dados técnicos sobre composição, mecanismos de ação e indicações terapêuticas de cada produto.",
    accent: "#16a34a",
  },
  {
    icon: Microscope,
    title: "Dosagens por perfil clínico",
    description: "Orientações de dosagem por peso, condição, faixa etária e sensibilidade ao CBD, com embasamento científico.",
    accent: "#2563eb",
  },
  {
    icon: Users,
    title: "Suporte técnico e científico",
    description: "Suporte direto com especialistas da Natleaf para esclarecimento de dúvidas clínicas e científicas.",
    accent: "#7c3aed",
  },
  {
    icon: Gift,
    title: "Amostras para avaliação",
    description: "Amostras para experimentação própria ou para pacientes selecionados, mediante cadastro aprovado.",
    accent: "#0891b2",
  },
];

const dosageItems = [
  { text: "Utilizar **conforme prescrição médica individualizada** — não existe dose universal." },
  { text: "Produto administrado por via **sublingual** para melhor absorção e biodisponibilidade." },
  { text: "**Respeitar dosagem e periodicidade** prescrita pelo médico responsável." },
  { text: "**Ajustes de dose** devem ser realizados apenas em consulta médica, com monitoramento clínico." },
  { text: "Iniciar com **doses baixas** e aumentar progressivamente conforme resposta clínica do paciente." },
];

export default function ParaMedicos() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nome: "", crm: "", estado: "", especialidade: "", email: "", telefone: "", mensagem: "",
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!blobRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[72vh] flex items-center overflow-hidden bg-background py-20"
      >
        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "54px 54px",
          }}
        />
        {/* Blobs */}
        <div
          ref={blobRef}
          className="pointer-events-none absolute -right-40 -top-20 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.16) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div variants={staggerParent} initial="hidden" animate="visible" className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              Para médicos
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            >
              Programa de<br />
              <span className="text-gradient">Prescrição Natleaf</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              A Natleaf valoriza a importância da orientação médica na prescrição do CBD. Oferecemos um processo simples para que médicos se cadastrem em nosso programa e tenham acesso a dados técnicos, suporte especializado e amostras.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a
                href="#cadastro"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Solicitar cadastro <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#posologia"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/50 transition-colors"
              >
                Ver posologia
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Benefícios</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              O que você recebe ao se cadastrar
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.09, ease }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl bg-background border border-border/40 p-6 flex flex-col gap-4"
                >
                  {/* accent stripe */}
                  <span
                    className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl"
                    style={{ background: `linear-gradient(180deg, ${b.accent} 0%, ${b.accent}40 100%)` }}
                  />
                  {/* hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse 100% 80% at 5% 50%, ${b.accent}0e, transparent)` }}
                  />
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${b.accent}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: b.accent }} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-foreground mb-2 leading-snug">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Registration form ────────────────────────────────────────── */}
      <section id="cadastro" className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-14 items-start">

            {/* Left info */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
              className="lg:col-span-2"
            >
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Cadastro médico</span>
              <h2 className="mt-2 text-3xl font-bold text-foreground tracking-tight mb-5">
                Solicitar acesso ao programa
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Preencha o formulário e nossa equipe confirmará seus dados e ativará o cadastro em até 24 horas úteis.
              </p>

              <div className="space-y-4">
                {[
                  { icon: ShieldCheck, label: "Dados protegidos e confidenciais" },
                  { icon: ClipboardList, label: "Resposta em até 24 horas úteis" },
                  { icon: Users, label: "Suporte contínuo da equipe técnica" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-foreground/80">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="lg:col-span-3"
            >
              {submitted ? (
                <div className="flex flex-col items-center gap-5 py-14 px-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Solicitação recebida!</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                      Nossa equipe entrará em contato em breve para confirmar seus dados e ativar o cadastro.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-border/50 bg-background p-7 space-y-5 shadow-sm"
                >
                  <div>
                    <Label htmlFor="nome" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome completo *</Label>
                    <Input id="nome" name="nome" value={form.nome} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="Dr. João Silva" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="crm" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">CRM *</Label>
                      <Input id="crm" name="crm" value={form.crm} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="12345" required />
                    </div>
                    <div>
                      <Label htmlFor="estado" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado *</Label>
                      <Input id="estado" name="estado" value={form.estado} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="SP" required />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="especialidade" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Especialidade *</Label>
                    <Input id="especialidade" name="especialidade" value={form.especialidade} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="Neurologista, Clínico Geral…" required />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">E-mail profissional *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="medico@clinica.com.br" required />
                  </div>
                  <div>
                    <Label htmlFor="telefone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Telefone / WhatsApp *</Label>
                    <Input id="telefone" name="telefone" value={form.telefone} onChange={handleChange} className="mt-1.5 rounded-xl" placeholder="+55 11 99999-9999" required />
                  </div>
                  <div>
                    <Label htmlFor="mensagem" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Mensagem (opcional)</Label>
                    <Textarea id="mensagem" name="mensagem" value={form.mensagem} onChange={handleChange} className="mt-1.5 rounded-xl resize-none" rows={3} placeholder="Conte-nos mais sobre sua prática médica ou dúvidas sobre o programa…" />
                  </div>
                  <Button type="submit" className="w-full rounded-xl h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-semibold gap-2">
                    Solicitar Cadastro
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Dosage ───────────────────────────────────────────────────── */}
      <section id="posologia" className="relative py-20 bg-secondary/15 overflow-hidden">
        {/* Leaf decoration */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none z-[1]"
          style={{
            left: "60%",
            right: 0,
            backgroundImage: "url(/imagemfolha.svg)",
            backgroundSize: "110% auto",
            backgroundPosition: "10% 50%",
            backgroundRepeat: "no-repeat",
            opacity: 0.45,
          }}
          aria-hidden
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Posologia</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-8">
                Orientações de Dosagem
              </h2>

              <div className="space-y-3">
                {dosageItems.map(({ text }, i) => {
                  const parts = text.split("**");
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: i * 0.08, ease }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/40"
                    >
                      <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {parts.map((part, j) =>
                          j % 2 === 1
                            ? <strong key={j} className="text-foreground font-semibold">{part}</strong>
                            : part
                        )}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.4, ease }}
                className="relative overflow-hidden rounded-2xl bg-primary/5 border border-primary/20 p-6 mt-6"
              >
                <div
                  className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full blur-2xl"
                  style={{ background: "rgba(22,163,74,0.2)" }}
                />
                <span className="block text-5xl font-black text-primary/10 leading-none mb-3 select-none" aria-hidden>"</span>
                <p className="text-sm text-foreground/80 italic leading-relaxed relative z-10">
                  Na Natleaf, estamos comprometidos em fornecer os melhores produtos de CBD do mercado, sempre com a orientação médica adequada para garantir a segurança e eficácia.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Direct contact ───────────────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Contato direto</span>
            <h2 className="mt-2 text-2xl font-bold text-foreground mb-6">Canal exclusivo para médicos</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:+5521975190000"
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone / WhatsApp</p>
                  <p className="text-sm font-semibold text-foreground">+55 21 97519-0000</p>
                </div>
              </a>
              <a
                href="mailto:hello@inventedgreen.com.br"
                className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="text-sm font-semibold text-foreground">hello@inventedgreen.com.br</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
}