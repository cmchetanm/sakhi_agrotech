"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
      lerp: 0.085,
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    });
    lenisRef.current = lenis;

    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        ScrollTrigger.update();
        scrollFrame = 0;
      });
    };
    lenis.on("scroll", onScroll);

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

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const scheduleRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    requestAnimationFrame(() => {
      requestAnimationFrame(scheduleRefresh);
    });

    const onLoad = () => scheduleRefresh();
    window.addEventListener("load", onLoad);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      if (scrollFrame) cancelAnimationFrame(scrollFrame);
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      ScrollTrigger.removeEventListener("refresh", onRefresh);
    };
  }, []);

  const scrollTo: ScrollToFn = (target, options) => scrollToRef.current(target, options);

  return <ScrollContext.Provider value={scrollTo}>{children}</ScrollContext.Provider>;
}
