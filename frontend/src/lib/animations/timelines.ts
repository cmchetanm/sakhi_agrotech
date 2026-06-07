import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DEV_MARKERS } from "./presets";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function animateCounter(
  el: HTMLElement,
  end: number,
  suffix = "",
  duration = 1.5
) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: end,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      el.textContent = `${Math.round(obj.val)}${suffix}`;
    },
  });
}

export function animateCounterOnEnter(
  el: HTMLElement,
  end: number,
  suffix = "",
  trigger: Element | null,
  duration = 1.2
) {
  if (!trigger || prefersReducedMotion()) {
    el.textContent = `${end}${suffix}`;
    return;
  }

  ScrollTrigger.create({
    trigger: el,
    start: "top 90%",
    once: true,
    markers: DEV_MARKERS,
    onEnter: () => animateCounter(el, end, suffix, duration),
  });
}
