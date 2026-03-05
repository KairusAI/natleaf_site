import { PageLayout } from "@/components/shared/PageLayout";
import { Leaf, FlaskConical, Award, Building, Phone, Mail, MapPin, CheckCircle } from "lucide-react";

const promises = [
  {
    icon: CheckCircle,
    title: "Transparência",
    description: "Informações claras e precisas sobre CBD, seus benefícios e aplicações. Suporte personalizado em cada etapa do tratamento.",
  },
  {
    icon: FlaskConical,
    title: "Qualidade",
    description: "Produtos desenvolvidos com tecnologia proprietária TDC™, testados em até 8 etapas de fabricação com COA emitidos por laboratórios independentes.",
  },
  {
    icon: Leaf,
    title: "Acessibilidade",
    description: "Facilitamos a importação de CBD no Brasil, garantindo que você receba produtos adequados às suas necessidades terapêuticas com orientação completa.",
  },
];

const tdcFeatures = [
  "Captura virtualmente todos os canabinoides e terpenos disponíveis na planta",
  "Extração sem solventes e sem produtos químicos",
  "Sem necessidade de temperaturas ou pressões extremas",
  "Moléculas em tamanho nano para melhor biodisponibilidade",
  "Ação incrivelmente rápida, suave, potente e altamente eficaz",
  "Intensidade e potência mais elevadas que extrações convencionais",
];

const certifications = [
  {
    abbr: "GAP",
    name: "Boas Práticas Agrícolas",
    description: "Plantas cultivadas com rigorosos padrões agrícolas. 100% orgânicas, sem pesticidas ou agrotóxicos.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
  },
  {
    abbr: "GMP",
    name: "Boas Práticas de Fabricação",
    description: "Certificação que garante consciência ambiental, social e segurança em cada etapa da produção.",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    abbr: "COA",
    name: "Certificados de Análise",
    description: "Até 8 testes realizados desde o cultivo até o produto final, por laboratórios terceirizados independentes.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "border-violet-200",
  },
];

export default function QuemSomos() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-gradient-to-br from-background to-primary/5 overflow-hidden">
        {/* Leaf decoration */}
        <img
          src="/imagemfolha.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-24 -top-10 w-[520px] -rotate-45"
        />
        <img
          src="/imagemfolha2.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -left-20 bottom-0 w-[340px] -rotate-90"
        />
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Quem Somos</span>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
              Natleaf<br />
              <span className="text-gradient">Elevating Your Health</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Somos a Natleaf, principal produto da empresa <strong className="text-foreground">Invented Green</strong> — uma empresa americana dedicada ao desenvolvimento de produtos à base de medicina fitoterápica (CBD), comprometida em fornecer produtos de alta qualidade e inovação tecnológica.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Acreditamos no poder transformador do CBD e em seus benefícios terapêuticos. Nosso objetivo é desenvolver os melhores produtos possíveis, utilizando tecnologia de ponta e métodos de extração limpa. Queremos tornar o CBD mais acessível e compreensível para todos os brasileiros.
            </p>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="relative py-20 bg-secondary/20 overflow-hidden">
        <img
          src="/imagemfolha.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -left-16 top-1/2 -translate-y-1/2 w-[380px] opacity-[0.06] -rotate-6"
        />
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Nosso Compromisso</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Comprometidos com o Paciente
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Nos comprometemos a te ajudar a encontrar o tratamento certo, com a orientação e suporte necessários. Estaremos com você em cada etapa do processo — desde a obtenção da prescrição médica até a importação dos produtos.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {promises.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Natleaf is superior */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-sm font-medium text-primary tracking-wide uppercase">Superioridade Técnica</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
                Por que a Natleaf é superior?
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                Os métodos tradicionais de extração capturam entre 50% e 70% das moléculas da planta. Através do nosso processo TDC™, extraímos mais de <strong className="text-foreground">99% dessas moléculas</strong> — resultando em efeito entourage superior e intensidade mais elevada.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Além disso, os produtos Natleaf utilizam nanotecnologia, o que aumenta sua absorção pelo corpo humano em até <strong className="text-foreground">5 vezes</strong> em comparação com óleos convencionais. Isso significa que doses menores entregam resultados iguais ou superiores — com menor risco de efeitos colaterais.
              </p>
              <ul className="mt-6 space-y-3">
                {["Economia de custos no longo prazo", "Menor probabilidade de interações medicamentosas", "Redução de efeitos colaterais", "Seguro para uso por crianças e idosos"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/20">
              <p className="text-foreground/80 text-lg leading-relaxed italic">
                "Nossa missão é descomplicar a cannabis medicinal no Brasil, tornando o acesso a tratamentos de qualidade mais simples, seguro e acessível para todos os pacientes."
              </p>
              <div className="mt-6 pt-6 border-t border-primary/15">
                <p className="text-sm font-medium text-foreground">Invented Green, LLC</p>
                <p className="text-sm text-muted-foreground">Orlando, FL — EUA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TDC Technology */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Tecnologia Proprietária</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Tecnologia de Desconstrução Celular™
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Na Invented Green, nos orgulhamos de nosso processo de extração único: a Tecnologia de Desconstrução Celular™ (TDC) — um diferencial competitivo fundamental que nos separa de qualquer outro produto no mercado.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {tdcFeatures.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border/50">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground/80">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative py-20 bg-background overflow-hidden">
        <img
          src="/imagemfolha.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -right-20 top-1/2 -translate-y-1/2 w-[460px] opacity-[0.055] -rotate-6"
        />
        <img
          src="/imagemfolha2.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none select-none absolute -left-16 bottom-0 w-[280px] opacity-[0.05] rotate-12"
        />
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Qualidade</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Certificações e Controle de Qualidade
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <div key={i} className={`p-8 rounded-2xl border ${cert.border} ${cert.bg}/30 text-center`}>
                <div className={`text-4xl font-extrabold ${cert.color} mb-3`}>{cert.abbr}</div>
                <h3 className="text-base font-semibold text-foreground mb-3">{cert.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional data */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Building className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">Dados Institucionais</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                <Building className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Empresa</p>
                  <p className="text-sm text-muted-foreground">Invented Green, LLC</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Sede</p>
                  <p className="text-sm text-muted-foreground">7345 W Sand Lake Rd, Ste 210, Office 2318 — Orlando, FL 32819 — USA</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">Telefone</p>
                  <a href="tel:+5521975190000" className="text-sm text-primary hover:underline">+55 21 97519-0000</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/50">
                <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">E-mail</p>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:hello@inventedgreen.com.br" className="text-sm text-primary hover:underline">hello@inventedgreen.com.br</a>
                    <a href="mailto:info@inventedgreen.com.br" className="text-sm text-primary hover:underline">info@inventedgreen.com.br</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
