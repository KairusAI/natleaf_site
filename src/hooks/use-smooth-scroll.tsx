import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Guard for SSR: do nothing when `window` is not available
    if (typeof window === 'undefined') return;

    // Initialize Lenis for the page (omit wrapper/content for full-page)
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.5, // Linear interpolation intensity (0 to 1)
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger and emit a custom event
    // so other parts of the app (e.g. navbar progress) can read Lenis' virtual scroll position.
    const handleLenisScroll = (e: any) => {
      // Lenis provides a `scroll` value in the event payload
      const scrollY = (e && (e.scroll ?? e.y)) ?? window.scrollY;
      ScrollTrigger.update();

      // Emit synthetic event so legacy code using window.scrollY can react
      try {
        window.dispatchEvent(new CustomEvent('lenis:scroll', { detail: { scrollY } }));
      } catch (err) {
        // ignore
      }
    };

    lenis.on('scroll', handleLenisScroll);

    // Animation frame loop with proper cleanup
    let rafId = 0;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger on the next frame after initialization
    const refreshHandle = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      lenis.off('scroll', handleLenisScroll);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(refreshHandle);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return lenisRef;
}

export default useSmoothScroll;
