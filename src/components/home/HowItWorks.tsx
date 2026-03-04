import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/shared/ProcessSteps";

export function HowItWorks() {
  return (
    <section className="py-24 bg-background" id="como-funciona">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <ProcessSteps
          title="Como Funciona"
          subtitle="Três passos simples para iniciar seu tratamento com CBD no Brasil"
        />

        <div className="mt-12 text-center">
          <Link to="/conheca-o-cbd#como-adquirir">
            <Button variant="outline" className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary/5">
              Saiba mais sobre o processo
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
