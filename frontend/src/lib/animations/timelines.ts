import { gsap } from "@/lib/gsap";

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
