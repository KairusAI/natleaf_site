import { Brain } from "lucide-react";
import { ProductDetail } from "@/components/produtos/ProductDetail";

export default function ProdutoBrain() {
  return (
    <ProductDetail
      icon={<Brain className="w-8 h-8" />}
      name="Natleaf Brain"
      tagline="Aprimore sua vida ativa e aumente sua concentração"
      formula="CBD + CBG (Canabigerol)"
      themeColor="yellow"
      description="O Natleaf Brain combina CBD com CBG (Canabigerol) em uma fórmula exclusiva projetada para impulsionar a mente. O CBG é um canabinoide com propriedades neuroprotetoras e anti-inflamatórias comprovadas em pesquisas científicas, tornando esta fórmula ideal para quem busca clareza, foco e saúde neurológica."
      benefits={[
        "Melhora da clareza mental e concentração",
        "Aumento da energia cerebral",
        "Melhora da função cognitiva geral",
        "Propriedades neuroprotetoras do CBG",
        "Potencial suporte em Esquizofrenia (redução de sintomas psicóticos)",
        "Potencial suporte no Mal de Parkinson (alívio de tremores e rigidez)",
        "Potencial suporte no Alzheimer (propriedades neuroprotetoras e anti-inflamatórias)",
        "Suporte ao foco e desempenho mental em atividades exigentes",
      ]}
      specs={[
        { label: "Tipo", value: "Whole Spectrum" },
        { label: "Canabinoides", value: "CBD + CBG (Canabigerol)" },
        { label: "THC", value: "< 0,3%" },
        { label: "Extração", value: "TDC™ (sem solventes)" },
        { label: "Administração", value: "Sublingual" },
        { label: "Indicação", value: "Função cognitiva e neuroproteção" },
        { label: "COA", value: "Disponível para download" },
      ]}
      coaUrl="/docs/COA%20Natleaf%20Brain.pdf"
      productImage="/assets/brain.png"
    />
  );
}
