import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "./timelines";

interface CardHoverOptions {
  lift?: number;
  scale?: number;
}

export function bindCardHover(
  cards: Element | Element[] | NodeListOf<Element> | null,
  options: CardHoverOptions = {}
) {
  if (!cards || prefersReducedMotion()) return () => {};

  const { lift = -6, scale = 1.02 } = options;
  const list = gsap.utils.toArray<Element>(cards);
  const cleanups: Array<() => void> = [];

  list.forEach((card) => {
    const quickY = gsap.quickTo(card, "y", { duration: 0.35, ease: "power2.out" });
    const quickScale = gsap.quickTo(card, "scale", { duration: 0.35, ease: "power2.out" });

    const onEnter = () => {
      quickY(lift);
      quickScale(scale);
    };
    const onLeave = () => {
      quickY(0);
      quickScale(1);
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
      gsap.set(card, { clearProps: "transform" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindButtonHover(
  buttons: Element | Element[] | NodeListOf<Element> | null
) {
  if (!buttons || prefersReducedMotion()) return () => {};

  const list = gsap.utils.toArray<Element>(buttons);
  const cleanups: Array<() => void> = [];

  list.forEach((btn) => {
    const quickScale = gsap.quickTo(btn, "scale", { duration: 0.25, ease: "power2.out" });

    const onEnter = () => quickScale(1.03);
    const onLeave = () => quickScale(1);
    const onDown = () => quickScale(0.97);
    const onUp = () => quickScale(1.03);

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("mousedown", onDown);
    btn.addEventListener("mouseup", onUp);

    cleanups.push(() => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("mousedown", onDown);
      btn.removeEventListener("mouseup", onUp);
      gsap.set(btn, { clearProps: "transform" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindImageHover(
  containers: Element | Element[] | NodeListOf<Element> | null,
  scale = 1.05
) {
  if (!containers || prefersReducedMotion()) return () => {};

  const list = gsap.utils.toArray<Element>(containers);
  const cleanups: Array<() => void> = [];

  list.forEach((container) => {
    const img = container.querySelector("img, .team-avatar-inner");
    if (!img) return;

    const quickScale = gsap.quickTo(img, "scale", { duration: 0.4, ease: "power2.out" });

    const onEnter = () => quickScale(scale);
    const onLeave = () => quickScale(1);

    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      gsap.set(img, { clearProps: "transform" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindNavLinkHover(links: Element | Element[] | NodeListOf<Element> | null) {
  if (!links || prefersReducedMotion()) return () => {};

  const list = gsap.utils.toArray<Element>(links);
  const cleanups: Array<() => void> = [];

  list.forEach((link) => {
    let underline = link.querySelector(".nav-underline") as HTMLElement | null;
    if (!underline) {
      underline = document.createElement("span");
      underline.className =
        "nav-underline pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-leaf";
      if (getComputedStyle(link).position === "static") {
        (link as HTMLElement).style.position = "relative";
      }
      link.appendChild(underline);
    }

    const quickScaleX = gsap.quickTo(underline, "scaleX", { duration: 0.3, ease: "power2.out" });

    const onEnter = () => quickScaleX(1);
    const onLeave = () => quickScaleX(0);

    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      link.removeEventListener("mouseenter", onEnter);
      link.removeEventListener("mouseleave", onLeave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindSocialHover(icons: Element | Element[] | NodeListOf<Element> | null) {
  if (!icons || prefersReducedMotion()) return () => {};

  const list = gsap.utils.toArray<Element>(icons);
  const cleanups: Array<() => void> = [];

  list.forEach((icon) => {
    const quickScale = gsap.quickTo(icon, "scale", { duration: 0.3, ease: "back.out(1.7)" });
    const quickRotate = gsap.quickTo(icon, "rotation", { duration: 0.3, ease: "back.out(1.7)" });

    const onEnter = () => {
      quickScale(1.12);
      quickRotate(8);
    };
    const onLeave = () => {
      quickScale(1);
      quickRotate(0);
    };

    icon.addEventListener("mouseenter", onEnter);
    icon.addEventListener("mouseleave", onLeave);

    cleanups.push(() => {
      icon.removeEventListener("mouseenter", onEnter);
      icon.removeEventListener("mouseleave", onLeave);
      gsap.set(icon, { clearProps: "transform" });
    });
  });

  return () => cleanups.forEach((fn) => fn());
}

export function bindLayersTilt(card: Element | null) {
  if (!card || prefersReducedMotion()) return () => {};

  const quickRotateX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power2.out" });
  const quickRotateY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power2.out" });

  gsap.set(card, { transformPerspective: 800 });

  const onMove = (e: Event) => {
    const ev = e as MouseEvent;
    const rect = card.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    quickRotateY(x * 8);
    quickRotateX(-y * 8);
  };
  const onLeave = () => {
    quickRotateX(0);
    quickRotateY(0);
  };

  card.addEventListener("mousemove", onMove);
  card.addEventListener("mouseleave", onLeave);

  return () => {
    card.removeEventListener("mousemove", onMove);
    card.removeEventListener("mouseleave", onLeave);
    gsap.set(card, { clearProps: "transform" });
  };
}
