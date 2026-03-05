import { Leaf } from "lucide-react";
import { ProductDetail } from "@/components/produtos/ProductDetail";

export default function ProdutoWellness() {
  return (
    <ProductDetail
      icon={<Leaf className="w-8 h-8" />}
      name="Natleaf Wellness"
      tagline="Descubra uma nova maneira de cuidar do seu bem-estar"
      formula="Whole Spectrum CBD"
      themeColor="emerald"
      description="O Natleaf Wellness é um óleo Whole Spectrum desenvolvido para o equilíbrio diário. Contém CBD de espectro completo com todos os canabinoides disponíveis, terpenos e THC (<0,3%), garantindo o máximo efeito entourage para sua rotina de saúde."
      benefits={[
        "Equilíbrio e harmonia na rotina diária",
        "Propriedades anti-inflamatórias comprovadas",
        "Suporte ao sistema imune",
        "Melhora do bem-estar geral e disposição para tarefas diárias",
        "Seguro para uso por crianças e idosos",
        "Extração TDC™ sem solventes para máxima pureza",
        "Máximo Efeito Entourage — todos os canabinoides e terpenos",
        "Biodisponibilidade superior graças às moléculas em tamanho nano",
      ]}
      specs={[
        { label: "Tipo", value: "Whole Spectrum" },
        { label: "Canabinoides", value: "CBD + perfil completo" },
        { label: "THC", value: "< 0,3%" },
        { label: "Extração", value: "TDC™ (sem solventes)" },
        { label: "Administração", value: "Sublingual" },
        { label: "Armazenamento", value: "Local fresco, seco e escuro" },
        { label: "COA", value: "Disponível para download" },
      ]}
      coaUrl="/docs/COA%20Natleaf%20Wellness.pdf"
      productImage="/assets/wellness.png"
    />
  );
}
