import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";

const rows = [
  {
    type: "Isolado",
    composition: "Apenas CBD, sem terpenos",
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
    entourage: "Sim",
    highlight: false,
  },
  {
    type: "Whole Spectrum",
    composition: "CBD + Todos os canabinoides disponíveis e mais terpenos",
    thc: "THC incluído (<0,3%)",
    entourage: "Máximo efeito entourage",
    highlight: true,
  },
];

export function SpectrumComparison() {
  return (
    <section className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <div className="text-center mb-14">
          <span className="text-sm font-medium text-primary tracking-wide uppercase">Entenda a Diferença</span>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight">
            Comparativo de Espectros de CBD
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Nem todo CBD é igual. Saiba por que o Whole Spectrum da Natleaf oferece o nível mais completo de extração disponível no mercado.
          </p>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-border/60 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border/60">
                <th className="text-left px-6 py-4 font-semibold text-foreground">Tipo</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Composição</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">THC</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Efeito Entourage</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-border/40 last:border-0 transition-colors ${
                    row.highlight
                      ? "bg-primary/5 border-l-4 border-l-primary"
                      : "hover:bg-muted/20"
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                      {row.type}
                      {row.highlight && (
                        <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-normal">
                          Natleaf
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{row.composition}</td>
                  <td className="px-6 py-4 text-muted-foreground">{row.thc}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${row.highlight ? "text-primary" : "text-muted-foreground"}`}>
                      {row.entourage}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`p-5 rounded-2xl border ${
                row.highlight
                  ? "bg-primary/5 border-primary/30"
                  : "bg-background border-border/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`font-semibold ${row.highlight ? "text-primary" : "text-foreground"}`}>
                  {row.type}
                </span>
                {row.highlight && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Natleaf
                  </span>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground"><strong className="text-foreground/70">Composição:</strong> {row.composition}</p>
                <p className="text-muted-foreground"><strong className="text-foreground/70">THC:</strong> {row.thc}</p>
                <p className={row.highlight ? "text-primary font-medium" : "text-muted-foreground"}>
                  <strong className="text-foreground/70">Entourage:</strong> {row.entourage}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          ✦ Os óleos Natleaf utilizam <strong className="text-primary">Whole Spectrum</strong> — o nível mais completo de extração disponível no mercado.
        </p>
      </div>
    </section>
  );
}
