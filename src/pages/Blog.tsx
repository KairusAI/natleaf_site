import { Link } from "react-router-dom";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/shared/PageLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  coverEmoji: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "o-que-e-cbd-e-como-funciona",
    title: "O que é CBD e como funciona no organismo?",
    excerpt: "Entenda o que é o canabidiol, como ele interage com o sistema endocanabinoide e por que não causa efeitos psicoativos.",
    date: "10 de fevereiro de 2026",
    category: "Educação CBD",
    readTime: "6 min",
    coverEmoji: "🌿",
  },
  {
    slug: "whole-spectrum-vs-full-spectrum",
    title: "Whole Spectrum, Full Spectrum, Broad Spectrum e Isolado: qual a diferença?",
    excerpt: "Guia completo sobre os diferentes tipos de extração de CBD e por que o Efeito Entourage faz toda a diferença no tratamento.",
    date: "17 de fevereiro de 2026",
    category: "Educação CBD",
    readTime: "8 min",
    coverEmoji: "🔬",
  },
  {
    slug: "como-solicitar-autorizacao-anvisa",
    title: "Como solicitar autorização à ANVISA para importar CBD (passo a passo)",
    excerpt: "Guia completo e atualizado sobre o processo de autorização para importação de canabidiol no Brasil. Mais simples do que você imagina.",
    date: "22 de fevereiro de 2026",
    category: "Regulação ANVISA",
    readTime: "10 min",
    coverEmoji: "📋",
  },
  {
    slug: "cbd-para-ansiedade",
    title: "CBD para ansiedade: o que a ciência diz?",
    excerpt: "Revisão das principais pesquisas sobre o uso do canabidiol no tratamento de transtornos de ansiedade, estresse e qualidade de vida.",
    date: "25 de fevereiro de 2026",
    category: "Condições de Saúde",
    readTime: "7 min",
    coverEmoji: "🧘",
  },
  {
    slug: "cbd-para-epilepsia",
    title: "CBD para epilepsia: evidências e uso clínico",
    excerpt: "A epilepsia é uma das indicações com mais evidência científica para o uso do CBD. Conheça os estudos e o que os médicos recomendam.",
    date: "1 de março de 2026",
    category: "Condições de Saúde",
    readTime: "9 min",
    coverEmoji: "⚡",
  },
  {
    slug: "cbd-para-sono",
    title: "CBD para sono: como o canabidiol age no ritmo circadiano",
    excerpt: "Por que o CBD — especialmente combinado com CBN e melatonina — pode revolucionar a qualidade do seu sono de forma natural e segura.",
    date: "3 de março de 2026",
    category: "Condições de Saúde",
    readTime: "7 min",
    coverEmoji: "🌙",
  },
  {
    slug: "natleaf-brain-cbd-cbg",
    title: "Natleaf Brain: CBD + CBG para função cognitiva",
    excerpt: "O que é o Canabigerol (CBG), como a combinação com o CBD potencializa os efeitos neuroprotetores e quem pode se beneficiar.",
    date: "5 de março de 2026",
    category: "Novidades Natleaf",
    readTime: "6 min",
    coverEmoji: "🧠",
  },
  {
    slug: "perguntas-frequentes-importacao-cbd",
    title: "Perguntas frequentes sobre importação de CBD no Brasil",
    excerpt: "As dúvidas mais comuns sobre como importar CBD legalmente no Brasil, incluindo custos, prazos e o papel da Natleaf no processo.",
    date: "7 de março de 2026",
    category: "Regulação ANVISA",
    readTime: "8 min",
    coverEmoji: "❓",
  },
];

const categories = ["Todos", "Educação CBD", "Condições de Saúde", "Regulação ANVISA", "Novidades Natleaf"];

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-border/50 bg-background hover:border-primary/30 hover:shadow-md transition-all duration-300 overflow-hidden"
    >
      <div className="h-40 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 text-6xl">
        {post.coverEmoji}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{post.category}</span>
          <span className="text-xs text-muted-foreground">{post.readTime} de leitura</span>
        </div>
        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {post.date}
          </div>
          <span className="text-primary flex items-center gap-1 group-hover:gap-2 transition-all font-medium">
            Ler mais <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 text-center max-w-2xl mx-auto">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Blog</span>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Natleaf Blog
          </h1>
          <p className="mt-5 text-muted-foreground text-lg">
            Informação de qualidade sobre CBD, medicina fitoterápica, regulação no Brasil e novidades da Natleaf.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <Tabs defaultValue="Todos">
            <TabsList className="mb-10 flex flex-wrap h-auto gap-2 bg-transparent p-0">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  className="rounded-full border border-border/50 px-4 py-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="Todos">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {blogPosts.map((p) => <BlogCard key={p.slug} post={p} />)}
              </div>
            </TabsContent>
            {categories.slice(1).map((cat) => (
              <TabsContent key={cat} value={cat}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {blogPosts.filter((p) => p.category === cat).map((p) => <BlogCard key={p.slug} post={p} />)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </PageLayout>
  );
}
