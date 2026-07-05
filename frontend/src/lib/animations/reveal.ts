import { gsap } from "@/lib/gsap";
import { REVEAL_ATTR, REVEALED_ATTR } from "./presets";
import { prefersReducedMotion } from "./timelines";

export function markRevealed(el: Element) {
  el.setAttribute(REVEALED_ATTR, "true");
  el.removeAttribute(REVEAL_ATTR);
}

export function prepareRevealTargets(
  scope: Element | null | undefined,
  selector: string,
  y = 14
): Element[] {
  if (!scope || prefersReducedMotion()) return [];

  const targets = gsap.utils.toArray<Element>(scope.querySelectorAll(selector));
  targets.forEach((el) => {
    if (el.getAttribute(REVEALED_ATTR) === "true") return;
    el.setAttribute(REVEAL_ATTR, "");
    gsap.set(el, { autoAlpha: 0, y, force3D: true });
  });
  return targets;
}

export function revealCompleteVars(onDone?: (el: Element) => void): gsap.TweenVars {
  return {
    autoAlpha: 1,
    y: 0,
    clearProps: "transform",
    onComplete() {
      const targets = this.targets() as Element[];
      targets.forEach((el) => {
        markRevealed(el);
        gsap.set(el, { clearProps: "opacity,visibility" });
        onDone?.(el);
      });
    },
  };
}

export function showRevealTargets(scope: Element | null | undefined, selector: string) {
  if (!scope) return;
  scope.querySelectorAll(selector).forEach((el) => {
    markRevealed(el);
    gsap.set(el, { clearProps: "transform,opacity,visibility" });
  });
}
