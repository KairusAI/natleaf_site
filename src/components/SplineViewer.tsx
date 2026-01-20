import React, { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";

interface SplineViewerProps {
  url: string;
  className?: string;
}

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

export function SplineViewer({ url, className = "" }: SplineViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      {!isLoaded && <SplineLoader />}
      <Spline
        scene={url}
        onLoad={() => setIsLoaded(true)}
        style={{
          width: "100%",
          height: "100%",
          opacity: isLoaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
    </div>
  );
}

// Lazy wrapper usando IntersectionObserver
export function LazySplineViewer(props: SplineViewerProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
        rootMargin: "200px",
        threshold: 0,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={props.className} style={{ minHeight: "400px", width: "100%", height: "100%" }}>
      {shouldLoad ? <SplineViewer {...props} /> : <SplineLoader />}
    </div>
  );
}

