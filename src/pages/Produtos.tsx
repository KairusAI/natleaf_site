import { useState, useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Brain, Moon, Download, CheckCircle2, FlaskConical, Microscope, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Dados ──────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "wellness",
    href: "/produtos/wellness",
    icon: Leaf,
    image: "/assets/wellness.avif",
    name: "Natleaf Wellness",
    label: "Wellness",
    tagline: "Equilíbrio diário e bem-estar integral",
    description:
      "Formulado para quem busca equilíbrio e qualidade de vida no dia a dia. O Whole Spectrum CBD potencializa o sistema endocanabinoide de forma suave e contínua.",
    formula: "Whole Spectrum CBD",
    specs: [
      { key: "Concentração", value: "1000mg CBD" },
      { key: "Extração", value: "TDC™ sem solventes" },
      { key: "Tipo", value: "Whole Spectrum" },
      { key: "Volume", value: "30ml" },
      { key: "Administração", value: "Sublingual" },
    ],
    benefits: [
      "Equilíbrio e harmonia na rotina diária",
      "Propriedades anti-inflamatórias naturais",
      "Suporte ao sistema imunológico",
      "Seguro para crianças e idosos",
    ],
    color: {
      accent: "#16a34a",
      glow: "rgba(22,163,74,0.22)",
      bg: "from-emerald-50/80 to-emerald-100/20 dark:from-emerald-950/30 dark:to-emerald-900/10",
      border: "border-emerald-200/60 dark:border-emerald-800/40",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
      tab: "data-[active=true]:bg-emerald-600 data-[active=true]:text-white",
      dot: "bg-emerald-500",
      text: "text-emerald-700 dark:text-emerald-400",
      highlight: "bg-emerald-500",
    },
  },
  {
    id: "brain",
    href: "/produtos/brain",
    icon: Brain,
    image: "/assets/brain.avif",
    name: "Natleaf Brain",
    label: "Brain",
    tagline: "Clareza mental e foco inabalável",
    description:
      "Combina CBD com CBG (Canabigerol), o canabinóide que atua diretamente na saúde neurológica, proporcionando foco excepcional e proteção cognitiva.",
    formula: "CBD + CBG (Canabigerol)",
    specs: [
      { key: "CBD", value: "750mg" },
      { key: "CBG", value: "250mg" },
      { key: "Extração", value: "TDC™ sem solventes" },
      { key: "Volume", value: "30ml" },
      { key: "Administração", value: "Sublingual" },
    ],
    benefits: [
      "Clareza mental e foco aprimorado",
      "Propriedades neuroprotetoras do CBG",
      "Aumento da energia cerebral",
      "Suporte à função cognitiva de longo prazo",
    ],
    color: {
      accent: "#ca8a04",
      glow: "rgba(202,138,4,0.22)",
      bg: "from-yellow-50/80 to-amber-100/20 dark:from-yellow-950/30 dark:to-amber-900/10",
      border: "border-yellow-300/60 dark:border-yellow-800/40",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
      tab: "data-[active=true]:bg-amber-500 data-[active=true]:text-white",
      dot: "bg-amber-500",
      text: "text-amber-700 dark:text-amber-400",
      highlight: "bg-amber-500",
    },
  },
  {
    id: "sleep",
    href: "/produtos/sleep",
    icon: Moon,
    image: "/assets/sleep.avif",
    name: "Natleaf Sleep",
    label: "Sleep",
    tagline: "Sono profundo. Despertar renovado.",
    description:
      "Triple fórmula exclusiva com CBD, CBN e Melatonina. CBN é o canabinóide do sono — juntos sincronizam seu ritmo circadiano para um descanso verdadeiro.",
    formula: "CBD + CBN + Melatonina",
    specs: [
      { key: "CBD", value: "1000mg" },
      { key: "CBN", value: "500mg" },
      { key: "Melatonina", value: "6mg" },
      { key: "Volume", value: "30ml" },
      { key: "Administração", value: "Sublingual (noite)" },
    ],
    benefits: [
      "Sono mais profundo e reparador",
      "Regulação do ritmo circadiano",
      "Redução do estresse e ansiedade noturna",
      "Alívio da dor que dificulta o sono",
    ],
    color: {
      accent: "#7c3aed",
      glow: "rgba(124,58,237,0.22)",
      bg: "from-violet-50/80 to-violet-100/20 dark:from-violet-950/30 dark:to-violet-900/10",
      border: "border-violet-200/60 dark:border-violet-800/40",
      badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
      tab: "data-[active=true]:bg-violet-600 data-[active=true]:text-white",
      dot: "bg-violet-500",
      text: "text-violet-700 dark:text-violet-400",
      highlight: "bg-violet-500",
    },
  },
] as const;

// ─── Variantes de animação ────────────────────────────────────────────────
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
const heroChild = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

const switchVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 60 : -60,
    scale: 0.97,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -60 : 60,
    scale: 0.97,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// ─── Comparação ───────────────────────────────────────────────────────────
const COMPARE_ROWS = [
  { feature: "CBD Full Spectrum", wellness: true, brain: true, sleep: true },
  { feature: "CBG (Canabigerol)", wellness: false, brain: true, sleep: false },
  { feature: "CBN (Canabidinol)", wellness: false, brain: false, sleep: true },
  { feature: "Melatonina", wellness: false, brain: false, sleep: true },
  { feature: "Anti-inflamatório", wellness: true, brain: true, sleep: true },
  { feature: "Suporte imunológico", wellness: true, brain: false, sleep: false },
  { feature: "Foco & cognição", wellness: false, brain: true, sleep: false },
  { feature: "Qualidade do sono", wellness: false, brain: false, sleep: true },
  { feature: "Uso diurno", wellness: true, brain: true, sleep: false },
  { feature: "Uso noturno", wellness: true, brain: false, sleep: true },
];

// ─── Comp ─────────────────────────────────────────────────────────────────
function CompareRow({
  row,
  index,
}: {
  row: (typeof COMPARE_ROWS)[0];
  index: number;
}) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group border-b border-border/30 last:border-0"
    >
      <td className="py-3.5 pr-4 text-sm text-foreground font-medium">{row.feature}</td>
      {(["wellness", "brain", "sleep"] as const).map((pid) => (
        <td key={pid} className="py-3.5 text-center">
          {row[pid] ? (
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            </span>
          ) : (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-border mx-auto" />
          )}
        </td>
      ))}
    </motion.tr>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────
export default function Produtos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  const active = PRODUCTS[activeIndex];

  function selectProduct(index: number) {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  // GSAP: badges section
  useLayoutEffect(() => {
    if (!badgesRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        badgesRef.current!.children,
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: badgesRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <PageLayout>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[52vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-8 pb-16"
      >
        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "56px 56px",
          }}
        />
        {/* Radial glow */}
        <div className="pointer-events-none absolute -top-32 right-0 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-primary/4 blur-3xl" />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.div variants={heroChild} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-semibold tracking-wider uppercase mb-6">
              <Leaf className="w-3.5 h-3.5" />
              Nossa linha completa
            </motion.div>

            <motion.h1
              variants={heroChild}
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-5"
            >
              Três fórmulas.
              <br />
              <span className="text-gradient">Um propósito.</span>
            </motion.h1>

            <motion.p
              variants={heroChild}
              className="text-lg text-muted-foreground leading-relaxed max-w-xl"
            >
              Desenvolvidas com Tecnologia de Desconstrução Celular™ — extração
              100% sem solventes que preserva cada canabinóide na sua forma mais
              pura e biodisponível.
            </motion.p>

            {/* Floating product pills */}
            <motion.div variants={heroChild} className="flex flex-wrap gap-3 mt-8">
              {PRODUCTS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      selectProduct(i);
                      document.getElementById("product-showcase")?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="group flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/60 backdrop-blur-sm text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {p.label}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  </button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Product Showcase ─────────────────────────────────────────── */}
      <section id="product-showcase" className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">

          {/* Tab selector */}
          <div className="flex items-center justify-center mb-14">
            <div className="inline-flex p-1 rounded-2xl bg-muted/60 border border-border/40 gap-1">
              {PRODUCTS.map((p, i) => {
                const Icon = p.icon;
                const isActive = i === activeIndex;
                return (
                  <button
                    key={p.id}
                    onClick={() => selectProduct(i)}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "text-white shadow-md"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    style={isActive ? { backgroundColor: p.color.accent } : {}}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="tab-bg"
                        className="absolute inset-0 rounded-xl"
                        style={{ backgroundColor: p.color.accent }}
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active product */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.id}
              custom={direction}
              variants={switchVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className={`rounded-3xl border ${active.color.border} bg-gradient-to-br ${active.color.bg} overflow-hidden`}
            >
              <div className="grid lg:grid-cols-5 gap-0">

                {/* Left: product visual */}
                <div className="lg:col-span-2 relative flex flex-col items-center justify-center p-10 lg:p-14 min-h-[380px]">
                  {/* glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${active.color.glow}, transparent)`,
                    }}
                  />

                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10"
                  >
                    <motion.img
                      key={active.id + "-img"}
                      src={active.image}
                      alt={active.name}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-40 h-40 lg:w-24 lg:h-24 object-contain drop-shadow-2xl"
                      style={{ filter: `drop-shadow(0 20px 40px ${active.color.glow})` }}
                    />
                  </motion.div>
                </div>

                {/* Right: info */}
                <div className="lg:col-span-3 p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-border/30">
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${active.color.badge} mb-4`}
                  >
                    <FlaskConical className="w-3 h-3" />
                    {active.formula}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-2"
                  >
                    {active.name}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="text-base font-semibold mb-3"
                    style={{ color: active.color.accent }}
                  >
                    {active.tagline}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-muted-foreground leading-relaxed mb-8 max-w-md"
                  >
                    {active.description}
                  </motion.p>

                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 mb-8">
                    {/* Benefits */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Benefícios
                      </p>
                      <motion.ul
                        key={active.id + "-ben"}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2.5"
                      >
                        {active.benefits.map((b) => (
                          <motion.li
                            key={b}
                            variants={staggerItem}
                            className="flex items-start gap-2.5 text-sm text-foreground/85"
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${active.color.dot}`}
                            />
                            {b}
                          </motion.li>
                        ))}
                      </motion.ul>
                    </div>

                    {/* Specs */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Microscope className="w-3.5 h-3.5" />
                        Composição
                      </p>
                      <motion.dl
                        key={active.id + "-specs"}
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="space-y-2"
                      >
                        {active.specs.map((s) => (
                          <motion.div
                            key={s.key}
                            variants={staggerItem}
                            className="flex justify-between text-sm border-b border-border/25 pb-2 last:border-0 last:pb-0"
                          >
                            <dt className="text-muted-foreground">{s.key}</dt>
                            <dd className="font-medium text-foreground">{s.value}</dd>
                          </motion.div>
                        ))}
                      </motion.dl>
                    </div>
                  </div>

                  {/* CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-wrap gap-3"
                  >
                    <Link to={active.href}>
                      <Button
                        className="rounded-full gap-2 text-white shadow-md hover:shadow-lg transition-shadow"
                        style={{ backgroundColor: active.color.accent }}
                      >
                        Ver produto completo
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" className="rounded-full gap-2 border-border/50 hover:border-border">
                      <Download className="w-4 h-4" />
                      Laudo COA
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Trust badges ─────────────────────────────────────────────── */}
      <section className="py-12 border-y border-border/30 bg-muted/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div ref={badgesRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, label: "100% Orgânico", sub: "Matéria-prima certificada" },
              { icon: FlaskConical, label: "Testado em lab", sub: "Laudos COA disponíveis" },
              { icon: Microscope, label: "Tecnologia TDC™", sub: "Extração sem solventes" },
              { icon: Leaf, label: "Whole Spectrum", sub: "Efeito entourage completo" },
            ].map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex flex-col items-center text-center gap-2 p-5 rounded-2xl bg-background border border-border/40 hover:border-primary/30 hover:shadow-sm transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table ─────────────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <span className="text-xs font-semibold text-primary tracking-widest uppercase">Comparativo</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              Qual é o certo para você?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
              Cada fórmula é desenhada para um objetivo específico. Veja as diferenças de composição e escolha o seu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-x-auto overflow-y-hidden rounded-2xl border border-border/40 bg-card"
          >
            <table className="w-full min-w-[540px]">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-4 pl-6 pr-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-1/2">
                    Característica
                  </th>
                  {PRODUCTS.map((p) => {
                    const Icon = p.icon;
                    return (
                      <th key={p.id} className="py-4 text-center text-xs font-semibold uppercase tracking-wider w-[16.6%]">
                        <span className="inline-flex flex-col items-center gap-1">
                          <Icon className="w-4 h-4" style={{ color: p.color.accent }} />
                          <span style={{ color: p.color.accent }}>{p.label}</span>
                        </span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="px-4">
                {COMPARE_ROWS.map((row, i) => (
                  <CompareRow key={row.feature} row={row} index={i} />
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Quick-select CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mt-8"
          >
            {PRODUCTS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Link key={p.id} to={p.href}>
                  <Button
                    variant="outline"
                    className="rounded-full gap-2 border-border/50 hover:border-opacity-80 transition-all"
                    style={{ "--hover-color": p.color.accent } as React.CSSProperties}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: p.color.accent }} />
                    <span>{p.name}</span>
                    <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  </Button>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ProcessSteps
            title="Como Adquirir os Produtos"
            subtitle="Três passos simples para iniciar seu tratamento com CBD no Brasil"
          />
        </div>
      </section>
    </PageLayout>
  );
}
