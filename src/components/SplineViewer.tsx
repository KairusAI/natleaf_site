import { useEffect, useRef } from "react";

interface SplineViewerProps {
  url: string;
  className?: string;
  scale?: number; // Multiplicador de tamanho (ex: 1.5 = 150%)
  hueRotate?: number; // Rotação de matiz em graus (0-360)
  brightness?: number; // Brilho (1 = normal, >1 = mais claro, <1 = mais escuro)
  saturation?: number; // Saturação (1 = normal, >1 = mais saturado, <1 = menos saturado)
}

export function SplineViewer({ 
  url, 
  className = "",
  scale = 1,
  hueRotate = 0,
  brightness = 1,
  saturation = 1,
}: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Carrega o script do Spline apenas uma vez
    const scriptId = "spline-viewer-script";
    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.29/build/spline-viewer.js";
    script.id = scriptId;
    document.body.appendChild(script);

    return () => {
      // Remove o script quando o componente é desmontado (opcional)
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Esconde o "built with spline" branding - apenas uma vez após carregar
    const hideBranding = () => {
      const splineViewer = containerRef.current?.querySelector('spline-viewer');
      if (splineViewer?.shadowRoot) {
        const allLinks = splineViewer.shadowRoot.querySelectorAll('a');
        allLinks.forEach(link => {
          if (link.textContent?.toLowerCase().includes('built with') || 
              link.textContent?.toLowerCase().includes('spline')) {
            link.style.display = 'none';
          }
        });
      }
    };

    // Tenta esconder após o elemento carregar (tentativa única com delay maior)
    const timeout = setTimeout(hideBranding, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const filterStyle = {
    filter: `
      ${hueRotate !== 0 ? `hue-rotate(${hueRotate}deg)` : ''}
      ${brightness !== 1 ? `brightness(${brightness})` : ''}
      ${saturation !== 1 ? `saturate(${saturation})` : ''}
    `.trim().replace(/\s+/g, ' ') || 'none',
    transform: `scale(${scale})`,
    transformOrigin: 'center center',
  };

  return (
    <div ref={containerRef} className={className} style={{ overflow: "visible" }}>
      <spline-viewer 
        url={url}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          ...filterStyle,
        }}
      ></spline-viewer>
    </div>
  );
}

