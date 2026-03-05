import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { Link } from "react-router-dom";
import {
  ArrowRight, Activity, Wind, Brain, FlaskConical, Microscope,
  HeartPulse, Zap, Lightbulb, Sparkles, Heart, Users, ShieldPlus,
  Target, CheckCircle2, Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const benefits = [
  { title: "Alívio da Dor", desc: "O CBD pode ajudar a aliviar a dor crônica, incluindo dores articulares, musculares, enxaquecas e dores relacionadas a condições como artrite.", icon: Activity, accent: "#16a34a" },
  { title: "Ansiedade e Estresse", desc: "Muitas pessoas relatam que o CBD ajuda a reduzir os sintomas de ansiedade e estresse, e pode melhorar a qualidade do sono.", icon: Wind, accent: "#2563eb" },
  { title: "Bem-estar Mental", desc: "O CBD tem sido associado à melhora do humor, redução dos sintomas de depressão e ansiedade, e pode ter efeitos neuroprotetores.", icon: Brain, accent: "#7c3aed" },
  { title: "Anti-inflamatório", desc: "O CBD possui propriedades anti-inflamatórias úteis no alívio de inflamações relacionadas à artrite e doenças inflamatórias intestinais.", icon: FlaskConical, accent: "#0891b2" },
  { title: "Esquizofrenia", desc: "Potencial para reduzir os sintomas psicóticos. Auxilia no equilíbrio do humor e na melhoria da cognição.", icon: Microscope, accent: "#d97706" },
  { title: "Mal de Parkinson", desc: "Alívio dos tremores e da rigidez muscular. Possui propriedades neuroprotetoras que auxiliam na proteção das células cerebrais.", icon: HeartPulse, accent: "#dc2626" },
  { title: "Epilepsia", desc: "Eficaz no controle de convulsões em certos tipos de epilepsia, sendo uma das indicações com mais evidências científicas disponíveis.", icon: Zap, accent: "#7c3aed" },
  { title: "Alzheimer", desc: "Propriedades neuroprotetoras e anti-inflamatórias que podem ajudar a retardar a progressão da doença. Potencial para melhora da cognição.", icon: Lightbulb, accent: "#0891b2" },
  { title: "Enxaqueca", desc: "Reduz a intensidade e a frequência das enxaquecas, oferecendo alívio para quem sofre com crises recorrentes.", icon: Sparkles, accent: "#16a34a" },
  { title: "Hipertensão", desc: "Potencial para reduzir a pressão arterial elevada. Possui propriedades antioxidantes e anti-inflamatórias benéficas para a saúde cardiovascular.", icon: Heart, accent: "#dc2626" },
  { title: "Transtorno do Espectro Autista", desc: "Pode ajudar a reduzir comportamentos repetitivos e melhorar a comunicação social. Auxilia na redução da ansiedade e na melhoria do sono.", icon: Users, accent: "#d97706" },
  { title: "Fibromialgia", desc: "Alívio da dor crônica e dos sintomas relacionados à fibromialgia. Auxilia no relaxamento muscular e no alívio da inflamação.", icon: ShieldPlus, accent: "#2563eb" },
  { title: "TDAH", desc: "Pode ajudar a melhorar a concentração, reduzir a hiperatividade e promover um estado de calma em pacientes com TDAH.", icon: Target, accent: "#16a34a" },
];

const spectrumRows = [
  {
    type: "Isolado",
    composition: "Apenas CBD puro, sem outros canabinoides ou terpenos",
    thc: "Sem THC",
    entourage: "Sem efeito entourage",
    highlight: false,
    accent: "#6b7280",
    glow: "rgba(107,114,128,0.08)",
    border: "border-border/40",
  },
  {
    type: "Broad Spectrum",
    composition: "CBD + Outros canabinoides, alguns terpenos",
    thc: "Sem THC",
    entourage: "Efeito entourage parcial",
    highlight: false,
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.08)",
    border: "border-blue-200/50 dark:border-blue-800/30",
  },
  {
    type: "Full Spectrum",
    composition: "CBD + Outros canabinoides, alguns terpenos",
    thc: "THC incluído (<0,3%)",
    entourage: "Efeito entourage presente",
    highlight: false,
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.08)",
    border: "border-violet-200/50 dark:border-violet-800/30",
  },
  {
    type: "Whole Spectrum",
    composition: "CBD + Todos os canabinoides, terpenos e flavonoides",
    thc: "THC incluído (<0,3%)",
    entourage: "Máximo — efeito entourage completo",
    highlight: true,
    accent: "#16a34a",
    glow: "rgba(22,163,74,0.12)",
    border: "border-emerald-300/60 dark:border-emerald-700/50",
  },
];

export default function ConhecaOCBD() {
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

  return (
    <PageLayout>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center overflow-hidden bg-background py-20"
      >
        {/* Grid overlay */}
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
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.16) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-0 w-[500px] h-[500px] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(22,163,74,0.09) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10 max-w-3xl">
          <motion.div variants={staggerParent} initial="hidden" animate="visible">
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6"
            >
              <Leaf className="w-3.5 h-3.5" />
              Educação
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            >
              Conheça o{" "}
              <span className="text-gradient">CBD</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed mb-4">
              O CBD (canabidiol) é um dos principais compostos da <em>Cannabis sativa</em>, conhecido por suas propriedades terapêuticas e amplamente utilizado para promover o bem-estar físico e emocional.
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-10">
              <strong className="text-foreground">Diferentemente do THC</strong>, o CBD{" "}
              <strong className="text-foreground">não causa efeitos psicoativos</strong>. Pesquisas científicas extensas demonstram resultados promissores em diversas áreas da saúde.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <a href="#beneficios" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                Ver benefícios <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#como-adquirir" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border text-foreground text-sm font-semibold hover:bg-muted/50 transition-colors">
                Como adquirir
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits ──────────────────────────────────────────────── */}
      <section id="beneficios" className="py-24 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="max-w-2xl mb-14"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Aplicações terapêuticas</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Benefícios Comprovados<br className="hidden sm:block" /> e Estudados
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Revisão das principais condições em que o CBD demonstrou resultados promissores em pesquisas científicas publicadas.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.07, ease }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl bg-background border border-border/40 p-5 flex flex-col gap-3"
                >
                  {/* Accent left stripe */}
                  <span
                    className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl transition-opacity"
                    style={{ background: `linear-gradient(180deg, ${b.accent} 0%, ${b.accent}40 100%)` }}
                  />
                  {/* Hover glow */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                    style={{ background: `radial-gradient(ellipse 100% 80% at 5% 50%, ${b.accent}0f, transparent)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${b.accent}18` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: b.accent }} />
                  </div>

                  {/* Text */}
                  <div className="relative z-10">
                    <h3 className="text-sm font-semibold text-foreground mb-1.5 leading-snug">{b.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{b.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex items-start gap-3 max-w-2xl"
          >
            <span className="shrink-0 w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground mt-0.5">i</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              As informações acima são baseadas em pesquisas científicas em andamento. Consulte sempre um médico para orientação individualizada sobre o uso do CBD para condições de saúde específicas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Spectrum ──────────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Tipos de extração</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Entendendo os Espectros do CBD
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              O <strong className="text-foreground">Efeito Entourage</strong> ocorre quando todos os compostos da planta trabalham juntos, potencializando os benefícios terapêuticos. O Whole Spectrum é o único tipo que maximiza esse efeito.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {spectrumRows.map((row, i) => (
              <motion.div
                key={row.type}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative overflow-hidden rounded-2xl border ${row.border} bg-background p-6 flex flex-col gap-3 ${row.highlight ? "ring-1 ring-primary/30" : ""}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${row.glow}, transparent)` }}
                />
                <div className="flex items-center justify-between relative z-10">
                  <p className="text-xl font-black tracking-tight" style={{ color: row.accent }}>
                    {row.type}
                  </p>
                  {row.highlight && (
                    <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                      Natleaf
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed relative z-10">{row.composition}</p>
                <div className="mt-auto pt-3 border-t border-border/30 relative z-10 space-y-1">
                  <p className="text-[11px] text-muted-foreground">{row.thc}</p>
                  <p className="text-[11px] font-medium" style={{ color: row.accent }}>{row.entourage}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Natleaf Different ─────────────────────────────────── */}
      <section className="relative py-20 bg-secondary/15 overflow-hidden">
        {/* Leaf decoration — right corner */}
        <div
          className="absolute inset-0 hidden lg:block pointer-events-none z-[1] -rotate-45"
          style={{
            left: "58%",
            right: 0,
            backgroundImage: "url(/imagemfolha.svg)",
            backgroundSize: "110% auto",
            backgroundPosition: "10% 50%",
            backgroundRepeat: "no-repeat",
            opacity: 0.5,
          }}
          aria-hidden
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="text-xs font-semibold text-primary tracking-widest uppercase">Diferencial</span>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-5">
                O Óleo Natleaf — Por Que é Diferente?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                O óleo Natleaf utiliza extração pura TDC™, sem resíduos de solventes ou químicos. O resultado é um produto de biodisponibilidade superior, com doses menores e efeitos mais completos.
              </p>

              <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerParent}
                className="space-y-3 mb-10"
              >
                {[
                  "Maior eficiência no ativo — menos quantidade para os mesmos resultados",
                  "Menor dosagem necessária, reduzindo o risco de efeitos colaterais",
                  "Seguro para uso por crianças e idosos",
                  "Melhora a condição clínica e o bem-estar geral",
                  "Aumenta a disposição para tarefas diárias",
                  "Melhora significativa na qualidade do sono",
                ].map((item) => (
                  <motion.li key={item} variants={fadeUp} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <Link to="/produtos">
                <Button className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Ver nossos produtos
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>

            {/* TDC card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="relative overflow-hidden rounded-2xl bg-primary/5 border border-primary/20 p-7 mt-8"
            >
              <div
                className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl"
                style={{ background: "rgba(22,163,74,0.2)" }}
              />
              <h3 className="text-base font-semibold text-foreground mb-3 relative z-10">Extração TDC™</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">
                A Tecnologia de Desconstrução Celular™ captura virtualmente todos os canabinoides e terpenos disponíveis na planta, sem solventes ou químicos, preservando a integridade molecular de cada composto.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {["Sem solventes", "Sem químicos", "Nano-moléculas", "Alta biodisponibilidade", "Máximo entourage"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How to acquire ───────────────────────────────────────── */}
      <section className="py-20 bg-background" id="como-adquirir">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ProcessSteps
            title="Como Adquirir CBD no Brasil"
            subtitle="Entenda o processo completo — da consulta médica até a entrega em sua residência"
          />
        </div>
      </section>

    </PageLayout>
  );
}
