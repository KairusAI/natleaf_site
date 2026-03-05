import { useLayoutEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PageLayout } from "@/components/shared/PageLayout";
import {
  Leaf, FlaskConical, Award, Building, Phone, Mail, MapPin,
  CheckCircle2, ShieldCheck, Zap, Microscope, ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Variants ─────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const staggerParent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

// ─── AnimatedCounter ──────────────────────────────────────────────────────
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useLayoutEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };
    gsap.fromTo(
      obj,
      { val: 0 },
      { val: target, duration: 1.6, ease: "power2.out",
        onUpdate: function () { el.textContent = Math.round(obj.val) + suffix; }
      }
    );
  }, [inView, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── Data ─────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Transparência",
    description: "Informações claras sobre CBD, seus benefícios e aplicações. Suporte personalizado em cada etapa do tratamento.",
    accent: "#16a34a",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  {
    icon: FlaskConical,
    title: "Qualidade",
    description: "Tecnologia proprietária TDC™, testada em até 8 etapas de fabricação com COA emitidos por laboratórios independentes.",
    accent: "#2563eb",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    icon: Leaf,
    title: "Acessibilidade",
    description: "Facilitamos a importação de CBD no Brasil, garantindo orientação completa desde a prescrição até a entrega.",
    accent: "#7c3aed",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
];

const TDC_FEATURES = [
  "Captura mais de 99% dos canabinoides e terpenos da planta",
  "Extração totalmente livre de solventes e produtos químicos",
  "Sem necessidade de temperaturas ou pressões extremas",
  "Moléculas em tamanho nano para biodisponibilidade superior",
  "Ação rápida, suave, potente e altamente eficaz",
  "Intensidade superior a qualquer extração convencional",
];

const CERTS = [
  {
    abbr: "GAP",
    name: "Boas Práticas Agrícolas",
    description: "Plantas cultivadas com rigorosos padrões agrícolas. 100% orgânicas, sem pesticidas ou agrotóxicos.",
    accent: "#16a34a",
    glow: "rgba(22,163,74,0.12)",
    border: "border-emerald-200/70 dark:border-emerald-800/40",
  },
  {
    abbr: "GMP",
    name: "Boas Práticas de Fabricação",
    description: "Certificação que garante consciência ambiental, social e segurança em cada etapa da produção.",
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.12)",
    border: "border-blue-200/70 dark:border-blue-800/40",
  },
  {
    abbr: "COA",
    name: "Certificados de Análise",
    description: "Até 8 testes realizados desde o cultivo até o produto final, por laboratórios terceirizados independentes.",
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.12)",
    border: "border-violet-200/70 dark:border-violet-800/40",
  },
];

const STATS = [
  { value: 99, suffix: "%", label: "dos canabinoides extraídos pela TDC™" },
  { value: 5, suffix: "×", label: "mais absorção que óleos convencionais" },
  { value: 8, suffix: "", label: "etapas de teste por produto" },
  { value: 3, suffix: "", label: "fórmulas exclusivas desenvolvidas" },
];

// ─── Page ─────────────────────────────────────────────────────────────────
export default function QuemSomos() {
  const heroRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  // GSAP parallax blob
  useLayoutEffect(() => {
    if (!blobRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(blobRef.current, {
        yPercent: 35,
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

  return (
    <PageLayout>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[80vh] flex items-center overflow-hidden bg-background py-20"
      >
        {/* Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "54px 54px",
          }}
        />
        {/* Parallax blob */}
        <div
          ref={blobRef}
          className="pointer-events-none absolute -right-40 -top-20 w-[700px] h-[700px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.18) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.10) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Text block */}
            <motion.div
              variants={staggerParent}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
              >
                <Leaf className="w-3.5 h-3.5" />
                Quem somos
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-5"
              >
                Natleaf
                <br />
                <span className="text-gradient">Elevating Your Health</span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-lg">
                Somos a Natleaf, principal produto da empresa{" "}
                <strong className="text-foreground font-semibold">Invented Green</strong> — empresa americana dedicada ao desenvolvimento de produtos à base de medicina fitoterápica (CBD), comprometida com alta qualidade e inovação tecnológica.
              </motion.p>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed max-w-lg">
                Acreditamos no poder transformador do CBD. Nosso objetivo é tornar o acesso à cannabis medicinal mais simples, seguro e compreensível para todos os brasileiros.
              </motion.p>

              <motion.div variants={fadeUp} className="flex items-center gap-3 mt-8">
                <a
                  href="/produtos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Conheça nossos produtos
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1, ease }}
                  className="group relative overflow-hidden rounded-2xl bg-background border border-border/50 p-6 flex flex-col gap-2"
                >
                  {/* accent top-left stripe */}
                  <span
                    className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                    style={{ background: "linear-gradient(180deg, hsl(var(--primary)) 0%, hsl(var(--primary)/0.3) 100%)" }}
                  />
                  {/* Subtle hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 10% 50%, rgba(22,163,74,0.07), transparent)" }}
                  />

                  <p className="text-5xl font-black text-foreground tracking-tight leading-none">
                    <AnimatedCounter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[13px] text-muted-foreground leading-snug pl-2">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Nosso compromisso</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Comprometidos com o paciente
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Estaremos com você em cada etapa — desde a obtenção da prescrição médica até a importação dos produtos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {PILLARS.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl border border-border/40 bg-background p-7"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 0% 100%, ${p.accent}10, transparent)` }}
                  />
                  <div
                    className={`w-11 h-11 rounded-xl ${p.bg} flex items-center justify-center mb-5`}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Natleaf ───────────────────────────────────────────────── */}
      <section className="py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Superioridade técnica</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5">
                Por que a Natleaf é superior?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Os métodos tradicionais de extração capturam entre 50% e 70% das moléculas da planta. Com o nosso processo TDC™, extraímos mais de{" "}
                <strong className="text-foreground">99% dessas moléculas</strong> — resultando em efeito entourage superior.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Nossos produtos utilizam nanotecnologia que aumenta a absorção corporal em até{" "}
                <strong className="text-foreground">5 vezes</strong> vs. óleos convencionais. Doses menores, resultados iguais ou superiores.
              </p>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerParent}
                className="space-y-3"
              >
                {[
                  "Economia de custos no longo prazo",
                  "Menor probabilidade de interações medicamentosas",
                  "Redução de efeitos colaterais",
                  "Seguro para uso por crianças e idosos",
                ].map((item) => (
                  <motion.li
                    key={item}
                    variants={fadeUp}
                    className="flex items-center gap-3 text-sm text-foreground/80"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Quote card */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1, ease }}
              className="relative overflow-hidden rounded-3xl bg-primary/5 border border-primary/20 p-8 lg:p-10"
            >
              <div
                className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl"
                style={{ background: "rgba(22,163,74,0.2)" }}
              />
              <span
                className="block text-7xl font-black text-primary/10 leading-none select-none mb-4"
                aria-hidden
              >
                "
              </span>
              <p className="text-foreground/85 text-lg leading-relaxed italic relative z-10">
                Nossa missão é descomplicar a cannabis medicinal no Brasil, tornando o acesso a tratamentos de qualidade mais simples, seguro e acessível para todos os pacientes.
              </p>
              <div className="mt-8 pt-6 border-t border-primary/15 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Building className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Invented Green, LLC</p>
                  <p className="text-xs text-muted-foreground">Orlando, FL — EUA</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TDC Technology ────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Tecnologia proprietária</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Tecnologia de Desconstrução Celular™
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Um diferencial competitivo fundamental que nos separa de qualquer outro produto no mercado — extração limpa e completa em cada frasco.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TDC_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-background"
              >
                {/* bg number */}
                <span className="absolute right-3 bottom-1 text-6xl font-black leading-none select-none pointer-events-none text-primary/5">
                  {i + 1}
                </span>
                <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground/80 leading-relaxed relative z-10">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Qualidade</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Certificações e controle de qualidade
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.abbr}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.12, ease }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl border ${cert.border} bg-background p-8 text-center`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${cert.glow}, transparent)` }}
                />
                <p
                  className="text-5xl font-black mb-3 relative z-10 tracking-tight"
                  style={{ color: cert.accent }}
                >
                  {cert.abbr}
                </p>
                <h3 className="text-sm font-semibold text-foreground mb-3 relative z-10">{cert.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Institutional ─────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Building className="w-4 h-4 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Dados Institucionais</h2>
            </div>

            {[
              {
                icon: Building,
                label: "Empresa",
                content: <p className="text-sm text-muted-foreground">Invented Green, LLC</p>,
              },
              {
                icon: MapPin,
                label: "Sede",
                content: <p className="text-sm text-muted-foreground">7345 W Sand Lake Rd, Ste 210, Office 2318 — Orlando, FL 32819 — USA</p>,
              },
              {
                icon: Phone,
                label: "Telefone",
                content: <a href="tel:+5521975190000" className="text-sm text-primary hover:underline">+55 21 97519-0000</a>,
              },
              {
                icon: Mail,
                label: "E-mail",
                content: (
                  <div className="flex flex-col gap-1">
                    <a href="mailto:hello@inventedgreen.com.br" className="text-sm text-primary hover:underline">hello@inventedgreen.com.br</a>
                    <a href="mailto:info@inventedgreen.com.br" className="text-sm text-primary hover:underline">info@inventedgreen.com.br</a>
                  </div>
                ),
              },
            ].map(({ icon: Icon, label, content }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07, ease }}
                className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/40 mb-3 last:mb-0"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
                  {content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </PageLayout>
  );
}


