import React, { Suspense, useCallback, useState, CSSProperties } from "react";
import type { Application, SPEObject } from "@splinetool/runtime";

// Lazy load do componente Spline para melhor performance
const Spline = React.lazy(() => import("@splinetool/react-spline"));

interface SplineViewerProps {
  url: string;
  className?: string;
  scale?: number; // Multiplicador de tamanho (ex: 1.5 = 150%)
  hueRotate?: number; // Rotação de matiz em graus (0-360)
  brightness?: number; // Brilho (1 = normal, >1 = mais claro, <1 = mais escuro)
  saturation?: number; // Saturação (1 = normal, >1 = mais saturado, <1 = menos saturado)
  onLoad?: (spline: Application) => void;
  renderOnDemand?: boolean; // Renderiza apenas quando necessário (melhor performance)
}

// Componente de loading elegante
function SplineLoader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

export function SplineViewer({ 
  url, 
  className = "",
  scale = 1,
  hueRotate = 0,
  brightness = 1,
  saturation = 1,
  onLoad,
  renderOnDemand = true, // Por padrão, otimiza renderização
}: SplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handler para quando o Spline carregar
  const handleLoad = useCallback((spline: Application) => {
    setIsLoaded(true);
    
    // Esconde o branding do Spline se possível
    try {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        // O branding é geralmente sobreposto ao canvas
        const parent = canvas.parentElement;
        if (parent) {
          const links = parent.querySelectorAll('a');
          links.forEach(link => {
            if (link.textContent?.toLowerCase().includes('built with') || 
                link.textContent?.toLowerCase().includes('spline')) {
              link.style.display = 'none';
            }
          });
        }
      }
    } catch {
      // Silently ignore branding hide errors
    }
    
    onLoad?.(spline);
  }, [onLoad]);

  // Calcula os filtros CSS
  const filterParts: string[] = [];
  if (hueRotate !== 0) filterParts.push(`hue-rotate(${hueRotate}deg)`);
  if (brightness !== 1) filterParts.push(`brightness(${brightness})`);
  if (saturation !== 1) filterParts.push(`saturate(${saturation})`);

  const containerStyle: CSSProperties = {
    overflow: "visible",
    filter: filterParts.length > 0 ? filterParts.join(' ') : undefined,
    transform: scale !== 1 ? `scale(${scale})` : undefined,
    transformOrigin: 'center center',
    // Otimização GPU para animações mais suaves
    willChange: isLoaded ? 'auto' : 'transform',
    contain: 'layout style paint',
  };

  const splineStyle: CSSProperties = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className={className} style={containerStyle}>
      <Suspense fallback={<SplineLoader />}>
        <Spline 
          scene={url}
          style={splineStyle}
          onLoad={handleLoad}
          renderOnDemand={renderOnDemand}
        />
      </Suspense>
    </div>
  );
}

// Exporta também uma versão com IntersectionObserver para lazy loading mais agressivo
export function LazySplineViewer(props: SplineViewerProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: '200px', // Começa a carregar 200px antes de aparecer
        threshold: 0
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={props.className} style={{ minHeight: '400px' }}>
      {shouldLoad ? (
        <SplineViewer {...props} />
      ) : (
        <SplineLoader />
      )}
    </div>
  );
}

