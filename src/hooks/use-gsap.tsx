import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Hook para animação de texto com split (letra por letra ou palavra por palavra)
export function useSplitTextAnimation() {
  const textRef = useRef<HTMLElement>(null);

  const animateText = useCallback((options?: {
    type?: 'chars' | 'words' | 'lines';
    stagger?: number;
    duration?: number;
    ease?: string;
    y?: number;
  }) => {
    if (!textRef.current) return;

    const { 
      type = 'chars', 
      stagger = 0.03, 
      duration = 0.8, 
      ease = 'power3.out',
      y = 40
    } = options || {};

    const text = textRef.current.innerText;
    let items: string[] = [];

    if (type === 'chars') {
      items = text.split('');
    } else if (type === 'words') {
      items = text.split(' ');
    }

    textRef.current.innerHTML = items
      .map(item => `<span class="inline-block overflow-hidden"><span class="inline-block">${item === ' ' ? '&nbsp;' : item}</span></span>`)
      .join(type === 'chars' ? '' : ' ');

    const spans = textRef.current.querySelectorAll('span > span');

    gsap.fromTo(spans, 
      { y, opacity: 0, rotateX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotateX: 0,
        duration,
        stagger,
        ease,
      }
    );
  }, []);

  return { textRef, animateText };
}

// Hook para animação de scroll parallax
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
}

// Hook para animação de reveal no scroll
export function useScrollReveal(options?: {
  y?: number;
  x?: number;
  opacity?: number;
  scale?: number;
  rotation?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  toggleActions?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 60,
      x = 0,
      opacity = 0,
      scale = 1,
      rotation = 0,
      duration = 1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
      toggleActions = 'play none none reset',
    } = options || {};

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { y, x, opacity, scale, rotation },
        {
          y: 0,
          x: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

// Hook para animação de contador numérico
export function useCountUp(endValue: number, options?: {
  duration?: number;
  ease?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const {
      duration = 2,
      ease = 'power2.out',
      suffix = '',
      prefix = '',
    } = options || {};

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: endValue,
        duration,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = `${prefix}${Math.round(countRef.current.value)}${suffix}`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [endValue]);

  return ref;
}

// Hook para animações de stagger em listas/grids
export function useStaggerReveal(options?: {
  stagger?: number;
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
}) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const {
      stagger = 0.1,
      y = 50,
      duration = 0.8,
      ease = 'power3.out',
      start = 'top 85%',
    } = options || {};

    const children = containerRef.current.children;

    const ctx = gsap.context(() => {
      gsap.fromTo(children,
        { y, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            toggleActions: 'play none none reset',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return containerRef;
}

// Hook para animação magnética (para botões/links)
export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return ref;
}

// Hook para animação de line drawing (SVG)
export function useLineDrawing(options?: {
  duration?: number;
  ease?: string;
  delay?: number;
}) {
  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      duration = 2,
      ease = 'power2.inOut',
      delay = 0,
    } = options || {};

    const length = ref.current.getTotalLength();

    const ctx = gsap.context(() => {
      gsap.set(ref.current, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(ref.current, {
        strokeDashoffset: 0,
        duration,
        ease,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return ref;
}

// Hook para cursor personalizado
export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { cursorRef, followerRef };
}

// Hook para horizontal scroll section
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollRef.current) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollRef.current!.scrollWidth - containerRef.current!.offsetWidth;
      
      gsap.to(scrollRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return { containerRef, scrollRef };
}

// Hook para reveal com máscara
export function useMaskReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const clipPaths = {
      up: { from: 'inset(100% 0 0 0)', to: 'inset(0% 0 0 0)' },
      down: { from: 'inset(0 0 100% 0)', to: 'inset(0% 0 0 0)' },
      left: { from: 'inset(0 100% 0 0)', to: 'inset(0% 0 0 0)' },
      right: { from: 'inset(0 0 0 100%)', to: 'inset(0% 0 0 0)' },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { clipPath: clipPaths[direction].from, opacity: 0 },
        {
          clipPath: clipPaths[direction].to,
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reset',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction]);

  return ref;
}

// Exportar instância do GSAP para uso direto
export { gsap, ScrollTrigger };
