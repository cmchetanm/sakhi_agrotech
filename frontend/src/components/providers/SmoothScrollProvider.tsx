"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

type ScrollToFn = (target: string | number | HTMLElement, options?: { offset?: number }) => void;

const ScrollContext = createContext<ScrollToFn | null>(null);

export function useSmoothScroll() {
  return useContext(ScrollContext);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const scrollToRef = useRef<ScrollToFn>(() => {});

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    scrollToRef.current = (target, options = {}) => {
      const { offset = -80 } = options;
      let el: HTMLElement | null = null;

      if (typeof target === "string") {
        el = document.getElementById(target.replace(/^#/, ""));
      } else if (target instanceof HTMLElement) {
        el = target;
      }

      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY + offset;
        if (lenisRef.current && !prefersReducedMotion) {
          lenisRef.current.scrollTo(top, { duration: 1.2 });
        } else {
          window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
        return;
      }

      if (typeof target === "number" && lenisRef.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2 });
      }
    };

    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, []);

  const scrollTo: ScrollToFn = (target, options) => scrollToRef.current(target, options);

  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>;
}
