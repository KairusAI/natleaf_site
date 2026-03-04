import { PageLayout } from "@/components/shared/PageLayout";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  {
    title: "Alívio da Dor",
    desc: "O CBD pode ajudar a aliviar a dor crônica, incluindo dores articulares e musculares, enxaquecas e dores relacionadas a condições como artrite.",
    icon: "🩹",
  },
  {
    title: "Ansiedade e Estresse",
    desc: "Muitas pessoas relatam que o CBD ajuda a reduzir os sintomas de ansiedade e estresse, e pode melhorar a qualidade do sono.",
    icon: "🧘",
  },
  {
    title: "Bem-estar Mental",
    desc: "O CBD tem sido associado à melhora do humor, redução dos sintomas de depressão e ansiedade, e pode ter efeitos neuroprotetores.",
    icon: "🧠",
  },
  {
    title: "Propriedades Anti-inflamatórias",
    desc: "O CBD possui propriedades anti-inflamatórias úteis no alívio de inflamações relacionadas à artrite e doenças inflamatórias intestinais.",
    icon: "💊",
  },
  {
    title: "Esquizofrenia",
    desc: "Potencial para reduzir os sintomas psicóticos. Auxilia no equilíbrio do humor e na melhoria da cognição.",
    icon: "🔬",
  },
  {
    title: "Mal de Parkinson",
    desc: "Alívio dos tremores e da rigidez muscular. Possui propriedades neuroprotetoras que auxiliam na proteção das células cerebrais.",
    icon: "⚕️",
  },
  {
    title: "Epilepsia",
    desc: "Eficaz no controle de convulsões em certos tipos de epilepsia, sendo uma das indicações com mais evidências científicas disponíveis.",
    icon: "⚡",
  },
  {
    title: "Alzheimer",
    desc: "Propriedades neuroprotetoras e anti-inflamatórias que podem ajudar a retardar a progressão da doença. Potencial para melhora da cognição.",
    icon: "🌿",
  },
  {
    title: "Enxaqueca",
    desc: "Reduz a intensidade e a frequência das enxaquecas, oferecendo alívio para quem sofre com crises recorrentes.",
    icon: "💫",
  },
  {
    title: "Hipertensão",
    desc: "Potencial para reduzir a pressão arterial elevada. Possui propriedades antioxidantes e anti-inflamatórias benéficas para a saúde cardiovascular.",
    icon: "❤️",
  },
  {
    title: "Transtorno do Espectro Autista",
    desc: "Pode ajudar a reduzir comportamentos repetitivos e a melhorar a comunicação social. Auxilia na redução da ansiedade e na melhoria do sono em indivíduos autistas.",
    icon: "🌈",
  },
  {
    title: "Fibromialgia",
    desc: "Alívio da dor crônica e dos sintomas relacionados à fibromialgia. Auxilia no relaxamento muscular e no alívio da inflamação.",
    icon: "🩺",
  },
  {
    title: "TDAH",
    desc: "Pode ajudar a melhorar a concentração, reduzir a hiperatividade e promover um estado de calma em pacientes com Transtorno do Déficit de Atenção com Hiperatividade.",
    icon: "🎯",
  },
];

const spectrumRows = [
  {
    type: "Isolado",
    composition: "Apenas CBD, sem outros canabinoides ou terpenos",
    thc: "Sem THC",
    entourage: "Sem efeito entourage",
    highlight: false,
  },
  {
    type: "Broad Spectrum",
    composition: "CBD + Outros canabinoides, alguns terpenos",
    thc: "Sem THC",
    entourage: "Parcial",
    highlight: false,
  },
  {
    type: "Full Spectrum",
    composition: "CBD + Outros canabinoides, alguns terpenos",
    thc: "THC incluído (<0,3%)",
    entourage: "Sim — efeito entourage presente",
    highlight: false,
  },
  {
    type: "Whole Spectrum",
    composition: "CBD + Todos os canabinoides disponíveis, mais terpenos e flavonoides",
    thc: "THC incluído (<0,3%)",
    entourage: "Máximo — efeito entourage completo",
    highlight: true,
  },
];

export default function ConhecaOCBD() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-3xl">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Educação</span>
          <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
            Conheça o CBD
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            O CBD, ou canabidiol, é um dos muitos compostos encontrados na planta <em>Cannabis sativa</em>. É conhecido por suas propriedades terapêuticas e amplamente utilizado para promover o bem-estar físico e emocional.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Diferentemente do THC</strong>, o principal composto psicoativo da cannabis, o CBD <strong className="text-foreground">não causa efeitos psicoativos</strong>. O CBD tem sido objeto de extensas pesquisas científicas e demonstrado resultados promissores em diversas áreas de cuidados de saúde.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Aplicações Terapêuticas</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Benefícios Comprovados e Estudados
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Revisão das principais condições em que o CBD demonstrou resultados promissores em pesquisas científicas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b.title} className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="text-base font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
            * As informações acima são baseadas em pesquisas científicas em andamento. Consulte sempre um médico para orientação individualizada sobre o uso do CBD para condições de saúde específicas.
          </p>
        </div>
      </section>

      {/* Spectrum table */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Tipos de Extração</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Entendendo os Espectros do CBD
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              O <strong className="text-foreground">Efeito Entourage</strong> ocorre quando todos os compostos da planta trabalham juntos, potencializando os benefícios terapêuticos de cada um. O Whole Spectrum é o único tipo que maximiza esse efeito.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/40 border-b border-border/60">
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Tipo</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground hidden md:table-cell">Composição</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground hidden sm:table-cell">THC</th>
                  <th className="text-left px-6 py-4 font-semibold text-foreground">Efeito Entourage</th>
                </tr>
              </thead>
              <tbody>
                {spectrumRows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-border/40 last:border-0 ${
                      row.highlight ? "bg-primary/5 border-l-4 border-l-primary" : "hover:bg-muted/10"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                        {row.type}
                        {row.highlight && (
                          <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-normal">Natleaf</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">{row.composition}</td>
                    <td className="px-6 py-4 text-muted-foreground hidden sm:table-cell">{row.thc}</td>
                    <td className={`px-6 py-4 font-medium ${row.highlight ? "text-primary" : "text-muted-foreground"}`}>{row.entourage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why Natleaf is different */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Diferencial</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                O Óleo Natleaf — Por Que é Diferente?
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                O óleo Natleaf é um produto com extração pura TDC™ e sem resíduos, que oferece:
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  "Maior eficiência no ativo — menos quantidade para os mesmos resultados",
                  "Menor dosagem necessária — reduzindo o risco de efeitos colaterais",
                  "Seguro para uso por crianças e idosos",
                  "Melhora a condição clínica e o bem-estar geral",
                  "Aumenta a disposição para tarefas diárias",
                  "Melhora significativa na qualidade do sono",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground/80 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/produtos">
                  <Button className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    Ver nossos produtos
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <h3 className="text-lg font-semibold text-foreground mb-4">Extração TDC™</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Tecnologia de Desconstrução Celular™ captura virtualmente todos os canabinoides e terpenos disponíveis na planta sem o uso de solventes ou químicos, preservando a integridade molecular de cada composto.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Sem solventes", "Sem químicos", "Nano-moléculas", "Alta biodisponibilidade", "Máximo entourage"].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to acquire */}
      <section className="py-20 bg-secondary/20" id="como-adquirir">
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
