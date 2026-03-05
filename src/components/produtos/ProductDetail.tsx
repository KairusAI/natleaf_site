import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Download, CheckCircle2, FlaskConical, ShieldCheck, Microscope, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { ReactNode, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────
interface TechSpec {
  label: string;
  value: string;
}

interface ProductDetailProps {
  icon: ReactNode;
  name: string;
  tagline: string;
  formula: string;
  description: string;
  benefits: string[];
  specs: TechSpec[];
  themeColor: "emerald" | "yellow" | "violet";
  note?: string;
  coaUrl?: string;
  productImage?: string;
}

// ─── Static color map (no dynamic Tailwind strings) ───────────────────────
const COLOR_CONFIG = {
  emerald: {
    accent: "#16a34a",
    glow: "rgba(22,163,74,0.28)",
    heroBg: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(22,163,74,0.10) 0%, transparent 70%)",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    border: "border-emerald-200/70 dark:border-emerald-800/40",
    cardBg: "bg-emerald-50/60 dark:bg-emerald-950/20",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    checkColor: "#16a34a",
    numColor: "rgba(22,163,74,0.08)",
  },
  yellow: {
    accent: "#ca8a04",
    glow: "rgba(202,138,4,0.28)",
    heroBg: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(202,138,4,0.10) 0%, transparent 70%)",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    border: "border-yellow-300/60 dark:border-yellow-800/40",
    cardBg: "bg-yellow-50/60 dark:bg-yellow-950/20",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    checkColor: "#ca8a04",
    numColor: "rgba(202,138,4,0.08)",
  },
  violet: {
    accent: "#7c3aed",
    glow: "rgba(124,58,237,0.28)",
    heroBg: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(124,58,237,0.10) 0%, transparent 70%)",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    border: "border-violet-200/70 dark:border-violet-800/40",
    cardBg: "bg-violet-50/60 dark:bg-violet-950/20",
    dot: "bg-violet-500",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    checkColor: "#7c3aed",
    numColor: "rgba(124,58,237,0.08)",
  },
} as const;

// ─── Animation variants ───────────────────────────────────────────────────
const heroParent = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const heroChild = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] } },
};

// ─── BenefitCard ─────────────────────────────────────────────────────────
function BenefitCard({
  text,
  index,
  accent,
  numColor,
}: {
  text: string;
  index: number;
  accent: string;
  numColor: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="relative group flex items-start gap-4 p-5 rounded-2xl border border-border/40 bg-background hover:border-border/70 hover:shadow-sm transition-colors duration-200"
    >
      {/* Big number background */}
      <span
        className="absolute right-4 top-2 text-7xl font-black leading-none select-none pointer-events-none"
        style={{ color: numColor }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <span
        className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: accent + "1a" }}
      >
        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: accent }} />
      </span>
      <span className="text-sm text-foreground/85 leading-relaxed relative z-10">{text}</span>
    </motion.div>
  );
}

// ─── SpecRow ──────────────────────────────────────────────────────────────
function SpecRow({ label, value, index }: { label: string; value: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────
export function ProductDetail({
  name,
  tagline,
  formula,
  description,
  benefits,
  specs,
  themeColor,
  note,
  coaUrl,
  productImage,
}: ProductDetailProps) {
  const c = COLOR_CONFIG[themeColor] ?? COLOR_CONFIG.emerald;
  const bgRef = useRef<HTMLDivElement>(null);

  // GSAP parallax on hero bg blob
  useLayoutEffect(() => {
    if (!bgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
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
      {/* ── Back nav ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-20 z-20"
      >
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-3 flex items-center justify-between">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-150" />
            Todos os produtos
          </Link>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${c.badge}`}
          >
            {formula}
          </span>
        </div>
      </motion.div>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-background py-16">
        {/* Decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "52px 52px",
          }}
        />

        {/* Parallax color blob */}
        <div
          ref={bgRef}
          className="pointer-events-none absolute -right-32 top-0 w-[640px] h-[640px] rounded-full blur-3xl"
          style={{ background: c.glow, opacity: 0.35 }}
        />

        <div className="container mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-5 gap-10 items-center">

            {/* Left: text */}
            <motion.div
              variants={heroParent}
              initial="hidden"
              animate="visible"
              className="lg:col-span-3"
            >
              <motion.div variants={heroChild} className="flex items-center gap-3 mb-6">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${c.badge}`}>
                  <FlaskConical className="w-3 h-3" />
                  {formula}
                </span>
              </motion.div>

              <motion.h1
                variants={heroChild}
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.05] mb-4"
              >
                {name}
              </motion.h1>

              <motion.p
                variants={heroChild}
                className="text-xl font-semibold mb-5"
                style={{ color: c.accent }}
              >
                {tagline}
              </motion.p>

              <motion.p
                variants={heroChild}
                className="text-muted-foreground text-base leading-relaxed mb-10 max-w-xl"
              >
                {description}
              </motion.p>

              {/* Quick-stat row */}
              <motion.div
                variants={heroChild}
                className="flex flex-wrap gap-4 mb-10 py-5 border-y border-border/30"
              >
                {[
                  { icon: ShieldCheck, text: "100% Orgânico" },
                  { icon: Microscope, text: "Tecnologia TDC™" },
                  { icon: FlaskConical, text: "Testado em laboratório" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon className="w-4 h-4" style={{ color: c.accent }} />
                    {text}
                  </div>
                ))}
              </motion.div>

              <motion.div variants={heroChild} className="flex flex-wrap gap-3">
                <a href="https://wa.me/5521975190000" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="rounded-full gap-2 text-white shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: c.accent }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Como adquirir
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
                {coaUrl ? (
                  <a href={coaUrl} target="_blank" rel="noopener noreferrer" download>
                    <Button size="lg" variant="outline" className="rounded-full gap-2 border-border/50">
                      <Download className="w-4 h-4" />
                      Laudo COA
                    </Button>
                  </a>
                ) : (
                  <Button size="lg" variant="outline" className="rounded-full gap-2 border-border/50" disabled>
                    <Download className="w-4 h-4" />
                    Laudo COA
                  </Button>
                )}
              </motion.div>
            </motion.div>

            {/* Right: product image */}
            {productImage && (
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-full max-w-sm aspect-square">
                  {/* Glow ring */}
                  <div
                    className="absolute inset-8 rounded-full blur-3xl"
                    style={{ backgroundColor: c.glow, opacity: 0.6 }}
                  />
                  {/* Rotating ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border border-dashed"
                    style={{ borderColor: c.accent + "30" }}
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-8 rounded-full border border-dashed"
                    style={{ borderColor: c.accent + "20" }}
                  />

                  {/* Product image */}
                  <motion.img
                    src={productImage}
                    alt={name}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, y: [0, -12, 0] }}
                    transition={{
                      scale: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
                      opacity: { duration: 0.7 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.7 },
                    }}
                    className="relative z-10 w-24 h-24 md:w-48 md:h-48 object-contain"
                    style={{ filter: `drop-shadow(0 24px 48px ${c.glow})` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Body: benefits + sidebar ──────────────────────────────────── */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Benefits grid */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                className="mb-8"
              >
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: c.accent }}
                >
                  Benefícios
                </span>
                <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  O que {name} faz por você
                </h2>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b, i) => (
                  <BenefitCard
                    key={i}
                    text={b}
                    index={i}
                    accent={c.accent}
                    numColor={c.numColor}
                  />
                ))}
              </div>
            </div>

            {/* Sticky sidebar: specs + actions */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 flex flex-col gap-4">

                {/* Specs card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className={`rounded-2xl border ${c.border} ${c.cardBg} p-6`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Microscope className="w-4 h-4" style={{ color: c.accent }} />
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Composição
                    </h3>
                  </div>
                  <div>
                    {specs.map((s, i) => (
                      <SpecRow key={s.label} label={s.label} value={s.value} index={i} />
                    ))}
                  </div>
                </motion.div>

                {/* Action card */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
                  className="rounded-2xl border border-border/40 bg-background p-6 flex flex-col gap-3"
                >
                  <p className="text-sm font-semibold text-foreground">Pronto para começar?</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Acesso mediante prescrição médica. Entre em contato pelo WhatsApp para saber como adquirir.
                  </p>
                  <a href="https://wa.me/5521975190000" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button
                      className="w-full rounded-xl gap-2 text-white"
                      style={{ backgroundColor: c.accent }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Fale conosco
                    </Button>
                  </a>
                  {coaUrl && (
                    <a href={coaUrl} target="_blank" rel="noopener noreferrer" download className="w-full">
                      <Button variant="outline" className="w-full rounded-xl gap-2 border-border/50">
                        <Download className="w-4 h-4" />
                        Baixar Laudo COA
                      </Button>
                    </a>
                  )}
                </motion.div>

                {/* Legal note */}
                {note && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="rounded-xl bg-muted/50 border border-border/30 p-4"
                  >
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{note}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-secondary/15">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <ProcessSteps />
        </div>
      </section>
    </PageLayout>
  );
}
