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
    gsap.set(el, { opacity: 0, y });
  });
  return targets;
}

export function revealCompleteVars(onDone?: (el: Element) => void): gsap.TweenVars {
  return {
    opacity: 1,
    y: 0,
    clearProps: "transform,opacity",
    onComplete() {
      const targets = this.targets() as Element[];
      targets.forEach((el) => {
        markRevealed(el);
        onDone?.(el);
      });
    },
  };
}

export function showRevealTargets(scope: Element | null | undefined, selector: string) {
  if (!scope) return;
  scope.querySelectorAll(selector).forEach((el) => {
    markRevealed(el);
    gsap.set(el, { clearProps: "transform,opacity" });
  });
}
