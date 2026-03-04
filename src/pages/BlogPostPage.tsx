import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Tag, Clock, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Button } from "@/components/ui/button";
import { blogPosts, type BlogPost } from "./Blog";

const postContent: Record<string, string[]> = {
  "o-que-e-cbd-e-como-funciona": [
    "O Canabidiol (CBD) é um dos mais de 100 fitocannabinoides encontrados na planta Cannabis sativa. Ao contrário do THC (tetra-hidrocanabinol), o CBD não tem efeito psicoativo — ou seja, não causa a sensação de \"euforia\" ou alteração cognitiva associada ao uso recreativo da cannabis.",
    "O CBD atua principalmente no Sistema Endocanabinoide (SEC), um sistema regulatório presente em todos os mamíferos que desempenha papel fundamental no equilíbrio de funções como sono, dor, humor, apetite, memória e resposta imunológica.",
    "O SEC é composto por receptores (CB1 e CB2), endocannabinoides produzidos naturalmente pelo corpo (como a anandamida e o 2-AG) e enzimas que os sintetizam e degradam. O CBD não se liga diretamente a esses receptores, mas modula a sua atividade indiretamente, potencializando o efeito dos endocannabinoides naturais.",
    "Além da interação com o SEC, o CBD age em receptores de serotonina (5-HT1A), receptores de dor (TRPV1), receptores GPR55 (relacionados à densidade óssea e à dor) e canais iônicos de sódio, o que explica seus múltiplos efeitos terapêuticos.",
    "Por tudo isso, o CBD é considerado um dos compostos naturais com maior amplitude terapêutica já estudados pela ciência. O número de estudos publicados sobre canabidiol na base PubMed cresceu mais de 1.000% na última década.",
  ],
  "whole-spectrum-vs-full-spectrum": [
    "Uma das maiores fontes de confusão para quem começa a pesquisar sobre CBD é a diferença entre os tipos de extrato. Entender isso é fundamental para escolher o produto certo.",
    "O Isolado de CBD é o canabidiol puro (>99%), sem nenhum outro componente da planta. É a forma mais simples e de mais fácil padronização, mas apresenta uma \"curva de dose-resposta em sino\" — ou seja, perde eficácia em doses muito altas ou muito baixas, com uma faixa terapêutica restrita.",
    "O Broad Spectrum contém múltiplos fitocannabinoides e terpenos, mas com o THC removido. Aproveita parcialmente o Efeito Entourage, mas a remoção do THC (mesmo em traços) compromete parte dos benefícios terapêuticos.",
    "O Full Spectrum contém todos os fitocannabinoides, incluindo THC em quantidade inferior a 0,3%. Apresenta o Efeito Entourage — a sinergia entre todos os compostos que potencializa os efeitos de cada um individualmente.",
    "O Whole Plant Spectrum, utilizado pela Natleaf, vai ainda mais fundo: preserva também os flavonoides, clorofilas, ácidos graxos e todos os terpenos da planta original. É o extrato mais próximo da planta como a natureza criou, e o que apresenta as melhores evidências de biodisponibilidade e eficácia ampla.",
  ],
  "como-solicitar-autorizacao-anvisa": [
    "Desde 2015, a ANVISA (Agência Nacional de Vigilância Sanitária) permite a importação de produtos à base de Cannabis para uso pessoal, mediante autorização. O processo foi simplificado e hoje pode ser feito inteiramente online.",
    "Passo 1 — Receita Médica. Um médico deve prescrever o produto em receituário específico com CID, nome do paciente, nome do produto, concentração e posologia. Qualquer especialista pode prescrever.",
    "Passo 2 — Solicitar na ANVISA. O responsável acessa o portal da ANVISA, preenche o formulário de autorização, anexa a receita médica e aguarda a análise. O prazo médio é de 3 a 10 dias úteis, mas pode ser expedido em 48h em casos urgentes.",
    "Passo 3 — Compra e Importação. Com a autorização em mãos, você adquire o produto com um fornecedor certificado como a Natleaf. Os produtos saem dos EUA (FDA) e chegam ao Brasil com documentação completa de importação.",
    "A equipe Natleaf auxilia gratuitamente todo o processo de autorização ANVISA. Basta entrar em contato via WhatsApp ou pelo formulário da página Para Médicos.",
  ],
  "cbd-para-ansiedade": [
    "A ansiedade é um dos motivos mais comuns para o início do uso de CBD no Brasil. Segundo dados do IBGE, mais de 18 milhões de brasileiros sofrem com transtornos de ansiedade — a maior prevalência da América Latina.",
    "Uma das hipóteses mais sólidas para o efeito ansiolítico do CBD envolve sua ação nos receptores 5-HT1A de serotonina, o mesmo alvo de ansiolíticos clássicos como a buspirona. Diferente dos benzodiazepínicos, o CBD não apresenta risco de dependência física.",
    "Um estudo controlado por placebo publicado no Journal of Psychopharmacology avaliou o CBD em pacientes com transtorno de ansiedade social (TAS) antes de uma simulação de fala pública. O grupo que recebeu CBD apresentou redução significativa na ansiedade subjetiva, déficit cognitivo e desconforto.",
    "Estudos em modelos animais e humanos também sugerem efeito do CBD no circuito do medo — especialmente na amígdala, estrutura cerebral central na resposta ao estresse. Isso o torna interessante no tratamento de TEPT (Transtorno de Estresse Pós-Traumático).",
    "É importante ressaltar que o CBD não é uma solução isolada. Os melhores resultados são obtidos quando o CBD é utilizado como parte de um plano terapêutico integral, com acompanhamento médico e, quando indicado, psicoterapia.",
  ],
  "cbd-para-epilepsia": [
    "A epilepsia resistente a medicamentos é uma das indicações com mais evidência científica para o uso do CBD. Em 2018, o FDA aprovou o Epidiolex® — um medicamento à base de CBD — para o tratamento de síndromes epilépticas graves como a Síndrome de Dravet e a Síndrome de Lennox-Gastaut.",
    "O mecanismo de ação anticonvulsivante do CBD ainda não é completamente elucidado, mas envolve modulação de canais de sódio e cálcio, ação em receptores GPR55 e interação com o sistema GABAérgico.",
    "Um estudo pivotal publicado no New England Journal of Medicine em 2017 demonstrou que o CBD reduziu a frequência de crises convulsivas em 39% em pacientes com Síndrome de Dravet, comparado com 13% no grupo placebo.",
    "No Brasil, o CBD para epilepsia resistente pode ser prescrito por neurologistas e obtido via autorização ANVISA. É uma das indicações com menor resistência da comunidade médica justamente pela robustez da evidência.",
    "A Natleaf pode auxiliar famílias e pacientes em todo o processo, desde a obtenção da receita até a autorização ANVISA e a aquisição do produto adequado.",
  ],
  "cbd-para-sono": [
    "O sono é regulado por múltiplos sistemas, incluindo o ritmo circadiano (controlado principalmente pela melatonina) e o sistema adenosinérgico (que acumula pressão de sono durante a vigília). O CBD pode agir em ambos.",
    "Em doses baixas a moderadas, o CBD tem efeito alerta/modulador. Em doses mais altas, demonstra efeito sedativo em estudos animais e humanos. Isso explica porque a dosagem é fundamental para o uso voltado ao sono.",
    "O Natleaf Sleep combina CBD, CBN (cannabinol, um canabinoide com propriedades sedativas documentadas) e melatonina de liberação prolongada — uma combinação sinérgica que aborda o sono em múltiplas frentes.",
    "Um estudo de 2019 publicado no The Permanente Journal avaliou o efeito do CBD em 72 pacientes com queixas de sono e ansiedade. Após um mês, 66,7% dos pacientes relataram melhora no sono, e 79,2% relataram redução na ansiedade.",
    "O CBD também pode ajudar indiretamente no sono ao reduzir ansiedade, dor crônica e outros fatores que frequentemente causam insônia. Consulte um médico para a indicação e dosagem adequada ao seu caso.",
  ],
  "natleaf-brain-cbd-cbg": [
    "O Natleaf Brain é a nossa formulação voltada para saúde cognitiva, concentração e proteção neurológica. Ele combina CBD de alto espectro com CBG (Canabigerol) em uma proporção otimizada.",
    "O CBG é considerado o \"canabinoide-mãe\" — é o precursor biossintético de todos os outros canabinoides, incluindo o CBD e o THC. Apesar de presente em baixas concentrações na planta madura, o CBG tem um perfil farmacológico notável.",
    "O CBG demonstra atividade como agonista parcial dos receptores CB1 e CB2, inibição da recaptação de anandamida e serotonina, atividade antibacteriana e propriedades neuroprotetoras em modelos de doenças neurodegenerativas.",
    "Estudos pré-clínicos demonstram que o CBG pode ter efeito neuroprotetor em modelos de Huntington, ELA (Esclerose Lateral Amiotrófica) e Alzheimer, reduzindo neuroinflamação e dano oxidativo.",
    "A combinação CBD + CBG no Natleaf Brain aproveita o Efeito Entourage de forma direcionada: o CBG potencializa o efeito neuroprotetor e a clareza cognitiva, enquanto o CBD equilibra o humor e reduz a ansiedade que frequentemente acompanha déficits cognitivos.",
  ],
  "perguntas-frequentes-importacao-cbd": [
    "**CBD é legal no Brasil?** Sim. Desde 2015 (resolução RDC 17/2015) e com atualizações subsequentes, a ANVISA permite a importação de produtos à base de cannabis para uso médico pessoal mediante autorização. A prescrição médica é obrigatória.",
    "**Qualquer médico pode prescrever CBD?** Sim. Desde 2022, a ANVISA removeu a restrição anterior que exigia especialização específica. Qualquer médico habilitado pelo CFM pode prescrever.",
    "**Quanto tempo leva para receber a autorização ANVISA?** O prazo padrão é 10 dias úteis, mas em casos urgentes pode ser emitida em 48h. A Natleaf orienta todo o processo.",
    "**Qual o custo da autorização ANVISA?** A solicitação de autorização para uso pessoal é gratuita. Não há taxa para o paciente.",
    "**Os produtos chegam ao Brasil com toda a documentação?** Sim. Todos os produtos Natleaf são acompanhados de laudos de terceiros (COA), fatura comercial, declaração do produto e demais documentos exigidos para importação pessoal.",
    "**Posso importar qualquer quantidade?** A autorização ANVISA é expedida para tratamento individual, geralmente equivalente a 3–6 meses de tratamento. A equipe Natleaf orienta sobre as quantidades permitidas.",
  ],
};

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-sm transition-all"
    >
      <div className="text-3xl flex-shrink-0">{post.coverEmoji}</div>
      <div>
        <span className="text-xs text-primary font-medium">{post.category}</span>
        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug mt-1">
          {post.title}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{post.readTime} de leitura</p>
      </div>
    </Link>
  );
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6 py-32 text-center">
          <p className="text-2xl font-semibold text-foreground mb-4">Post não encontrado</p>
          <Link to="/blog">
            <Button variant="outline">Voltar ao Blog</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }

  const paragraphs = postContent[slug!] ?? [
    "Este artigo está sendo preparado pela equipe Natleaf. Em breve teremos conteúdo completo sobre esse tema.",
  ];

  const related = blogPosts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3);
  const fallbackRelated = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const relatedPosts = related.length >= 2 ? related : fallbackRelated;

  return (
    <PageLayout>
      {/* Cover */}
      <div className="h-72 md:h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-primary/10 text-8xl">
        {post.coverEmoji}
      </div>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 max-w-3xl py-16">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-5 text-sm text-muted-foreground">
          <span className="text-primary bg-primary/10 font-medium px-3 py-1 rounded-full text-xs">
            {post.category}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" /> {post.readTime} de leitura
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 leading-tight">{post.title}</h1>

        {/* Body */}
        <article className="space-y-5 text-muted-foreground leading-relaxed text-base">
          {paragraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center">
          <p className="text-lg font-semibold text-foreground mb-2">Quer saber mais?</p>
          <p className="text-muted-foreground mb-6 text-sm">
            Fale com um consultor Natleaf, tire todas as suas dúvidas e descubra qual produto é ideal para o seu caso.
          </p>
          <a
            href="https://wa.me/5521975190000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-primary hover:bg-primary/90 text-white gap-2">
              <MessageCircle className="w-4 h-4" /> Falar com Consultor via WhatsApp
            </Button>
          </a>
        </div>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold text-foreground mb-6">Posts relacionados</h2>
            <div className="flex flex-col gap-4">
              {relatedPosts.map((p) => (
                <RelatedCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
