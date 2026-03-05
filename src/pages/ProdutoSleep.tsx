import { Moon } from "lucide-react";
import { ProductDetail } from "@/components/produtos/ProductDetail";

export default function ProdutoSleep() {
  return (
    <ProductDetail
      icon={<Moon className="w-8 h-8" />}
      name="Natleaf Sleep"
      tagline="Uma noite de descanso profundo e renovador"
      formula="CBD (1000mg) + CBN (500mg) + Melatonina (6mg)"
      themeColor="violet"
      description="O Natleaf Sleep combina um óleo Whole Spectrum com 1000mg de CBD, 500mg de CBN e 6mg de Melatonina em um frasco de 30ml. Todos os poderes do óleo Natleaf Wellness acrescidos de propriedades sedativas, relaxantes e reguladoras do ritmo circadiano para noites verdadeiramente reparadoras."
      benefits={[
        "Sono mais profundo e verdadeiramente reparador",
        "Regulação do ritmo circadiano (ciclo sono-vigília)",
        "Redução do estresse e ansiedade antes de dormir",
        "Alívio da dor e inflamação que dificultam o sono",
        "Ômega 3, 6 e 9 para redução da inflamação e melhora cognitiva",
        "O paciente acorda revigorado e pronto para o dia",
        "CBN com propriedades sedativas naturais",
        "Melatonina (6mg) para regulação hormonal do sono",
      ]}
      specs={[
        { label: "Tipo", value: "Whole Spectrum" },
        { label: "CBD", value: "1000mg" },
        { label: "CBN", value: "500mg" },
        { label: "Melatonina", value: "6mg" },
        { label: "Volume", value: "30ml" },
        { label: "Extração", value: "TDC™ (sem solventes)" },
        { label: "Administração", value: "Sublingual" },
        { label: "Armazenamento", value: "Fresco, seco e protegido da luz" },
        { label: "COA", value: "Disponível para download" },
      ]}
      coaUrl="/docs/COA%20Natleaf%20Sleep.pdf"
      productImage="/assets/sleep.png"
      note="Aviso legal: Essas declarações não foram avaliadas pela Agência Nacional de Vigilância Sanitária (ANVISA). Este produto não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença. Não usar se o selo de segurança estiver violado. Consulte sempre um médico antes de iniciar o uso."
    />
  );
}
