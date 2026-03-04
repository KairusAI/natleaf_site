import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutBrief() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <span className="text-sm font-medium text-primary tracking-wide uppercase">Nossa História</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-semibold text-foreground tracking-tight leading-tight">
              A Invented Green e a revolução no processo de extração de CBD
            </h2>
            <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
              A Natleaf é o principal produto da <strong className="text-foreground">Invented Green, LLC</strong>, empresa americana com sede em Orlando, FL. Dedicada ao desenvolvimento de produtos à base de medicina fitoterápica com inovação tecnológica.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Conheça a história do americano que revolucionou o processo de extração de CBD — criando a Tecnologia de Desconstrução Celular™ (TDC), que captura virtualmente todos os canabinoides e terpenos sem o uso de solventes ou químicos.
            </p>
            <div className="mt-8">
              <Link to="/quem-somos">
                <Button className="rounded-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  Nossa História
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Anos de pesquisa", value: "10+" },
              { label: "Testes por produto", value: "8" },
              { label: "Canabinoides preservados", value: "100%" },
              { label: "Sem solventes", value: "TDC™" },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-2xl bg-background border border-border/50 text-center hover:border-primary/30 hover:shadow-sm transition-all duration-300">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
