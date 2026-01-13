import { useRef, useEffect, useState, useCallback } from "react";

interface UseOptimizedAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  delay?: number;
}

/**
 * Hook para animações otimizadas que só disparam quando o elemento está visível
 * Usa requestAnimationFrame e IntersectionObserver para melhor performance
 */
export function useOptimizedAnimation({
  threshold = 0.1,
  rootMargin = "-50px",
  once = true,
  delay = 0,
}: UseOptimizedAnimationOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Usa requestAnimationFrame para sincronizar com o próximo frame de renderização
          if (delay > 0) {
            const timeoutId = setTimeout(() => {
              requestAnimationFrame(() => {
                setShouldAnimate(true);
              });
            }, delay);
            
            return () => clearTimeout(timeoutId);
          } else {
            requestAnimationFrame(() => {
              setShouldAnimate(true);
            });
          }

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
          setShouldAnimate(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once, delay]);

  return { ref, isVisible, shouldAnimate };
}

/**
 * Variantes de animação otimizadas para Framer Motion
 * Usa transform e opacity que são GPU-accelerated
 */
export const optimizedVariants = {
  // Fade in simples - mais leve
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  },
  
  // Fade in com slide de baixo - moderado
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    },
  },
  
  // Fade in com slide suave - para cards
  fadeInUpStagger: {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        delay: i * 0.08, // Stagger reduzido para ser mais rápido
        ease: [0.25, 0.1, 0.25, 1]
      },
    }),
  },

  // Fade in da esquerda - leve
  fadeInLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
  },

  // Fade in da direita - leve
  fadeInRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
  },

  // Escala suave - para elementos destacados
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
  },
};

/**
 * Configurações de transição otimizadas
 */
export const optimizedTransitions = {
  // Transição rápida para microinterações
  fast: { duration: 0.2, ease: "easeOut" as const },
  
  // Transição padrão
  default: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  
  // Transição suave para animações maiores
  smooth: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  
  // Spring leve - melhor que spring pesado
  spring: { type: "spring" as const, stiffness: 300, damping: 30 },
};

/**
 * Hook para controlar quando o Spline deve renderizar
 * Pausa renderização quando está fora da viewport para economizar recursos
 */
export function useSplineRenderControl() {
  const [shouldRender, setShouldRender] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setShouldRender(entries[0].isIntersecting);
      },
      { rootMargin: "100px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, shouldRender };
}
