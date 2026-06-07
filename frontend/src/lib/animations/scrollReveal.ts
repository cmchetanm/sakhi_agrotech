import { gsap, ScrollTrigger } from "@/lib/gsap";
import { BATCH_START, DEV_MARKERS, fadeUpFrom, HEADER_START } from "./presets";
import { createMatchMedia, getMotionSettings, MEDIA_CONDITIONS, parseConditions } from "./matchMediaContext";
import { markRevealed, prepareRevealTargets, revealCompleteVars, showRevealTargets } from "./reveal";
import { prefersReducedMotion } from "./timelines";

type ElementLike = Element | string | null | undefined;

interface RevealOptions {
  start?: string;
  stagger?: number | gsap.StaggerVars;
  staggerFrom?: gsap.StaggerVars["from"];
  batchMax?: number;
  x?: number;
  scale?: number;
  once?: boolean;
}

export function revealOnScroll(
  scope: Element | null | undefined,
  selector: string,
  options: RevealOptions = {}
) {
  const {
    start = BATCH_START,
    stagger,
    staggerFrom = "start",
    batchMax,
    x,
    scale,
    once = true,
  } = options;

  const mm = createMatchMedia();

  mm.add(MEDIA_CONDITIONS, (context) => {
    const { isMobile } = parseConditions(context);
    const motion = getMotionSettings(context.conditions);

    if (motion.duration === 0) {
      showRevealTargets(scope ?? null, selector);
      return;
    }

    prepareRevealTargets(scope, selector, motion.travel);

    ScrollTrigger.batch(selector, {
      start,
      once,
      batchMax,
      onEnter: (batch) => {
        const pending = batch.filter((el) => el.getAttribute("data-revealed") !== "true");
        if (!pending.length) return;

        gsap.fromTo(
          pending,
          {
            ...fadeUpFrom,
            y: motion.travel,
            ...(x !== undefined ? { x: isMobile ? 0 : x } : {}),
            ...(scale !== undefined ? { scale } : {}),
          },
          {
            ...revealCompleteVars(),
            duration: motion.duration,
            stagger:
              stagger ??
              ({
                each: motion.stagger,
                from: staggerFrom,
              } as gsap.StaggerVars),
            ease: "power1.out",
            overwrite: "auto",
            immediateRender: false,
          }
        );
      },
    });
  });

  return mm;
}

/** Single timeline for label + headline + body — one ScrollTrigger per section intro */
export function revealSectionIntro(
  trigger: Element | null | undefined,
  selectors: { label: string; headline?: string; body?: string },
  refreshPriority?: number
) {
  const mm = createMatchMedia();

  mm.add(MEDIA_CONDITIONS, (context) => {
    const motion = getMotionSettings(context.conditions);
    if (!trigger) return;

    const parts = [selectors.label, selectors.headline, selectors.body].filter(Boolean) as string[];

    if (motion.duration === 0) {
      parts.forEach((sel) => showRevealTargets(trigger, sel));
      return;
    }

    parts.forEach((sel) => prepareRevealTargets(trigger, sel, motion.travel));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: HEADER_START,
        toggleActions: "play none none none",
        once: true,
        refreshPriority,
        markers: DEV_MARKERS,
      },
    });

    tl.fromTo(
      selectors.label,
      { opacity: 0, y: motion.travel * 0.6 },
      {
        ...revealCompleteVars(),
        duration: motion.duration * 0.8,
        immediateRender: false,
      }
    );

    if (selectors.headline) {
      tl.fromTo(
        selectors.headline,
        { opacity: 0, y: motion.travel },
        {
          ...revealCompleteVars(),
          duration: motion.duration,
          immediateRender: false,
        },
        "-=0.45"
      );
    }

    if (selectors.body) {
      tl.fromTo(
        selectors.body,
        { opacity: 0, y: motion.travel * 0.8 },
        {
          ...revealCompleteVars(),
          duration: motion.duration * 0.9,
          immediateRender: false,
        },
        selectors.headline ? "-=0.5" : "-=0.35"
      );
    }
  });

  return mm;
}

/** @deprecated use revealSectionIntro */
export function revealHeader(
  trigger: ElementLike,
  selectors: { label: string; headline?: string; body?: string },
  refreshPriority?: number
) {
  return revealSectionIntro(
    trigger instanceof Element ? trigger : null,
    selectors,
    refreshPriority
  );
}

interface ParallaxOptions {
  y?: number;
  scale?: number;
  refreshPriority?: number;
}

export function scrubParallax(
  target: ElementLike,
  trigger: ElementLike,
  options: ParallaxOptions = {}
) {
  const { y = -30, scale, refreshPriority } = options;
  const mm = createMatchMedia();

  mm.add(MEDIA_CONDITIONS, (context) => {
    const { isMobile, isDesktop } = parseConditions(context);
    const motion = getMotionSettings(context.conditions);
    if (!target || !trigger || motion.scrub === false) return;

    const vars: gsap.TweenVars = {
      y: isMobile ? y * 0.4 : y,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: motion.scrub,
        refreshPriority,
        markers: DEV_MARKERS,
      },
    };

    if (scale !== undefined && isDesktop) {
      vars.scale = scale;
    }

    gsap.to(target, vars);
  });

  return mm;
}

export function revealStagger(
  trigger: Element | null | undefined,
  selector: string,
  options: { start?: string; refreshPriority?: number } = {}
) {
  const { start = HEADER_START, refreshPriority } = options;
  const mm = createMatchMedia();

  mm.add(MEDIA_CONDITIONS, (context) => {
    const motion = getMotionSettings(context.conditions);
    if (!trigger) return;

    if (motion.duration === 0) {
      showRevealTargets(trigger, selector);
      return;
    }

    prepareRevealTargets(trigger, selector, motion.travel);

    gsap.fromTo(
      trigger.querySelectorAll(selector),
      { opacity: 0, y: motion.travel },
      {
        ...revealCompleteVars(),
        duration: motion.duration,
        stagger: motion.stagger,
        immediateRender: false,
        scrollTrigger: {
          trigger,
          start,
          toggleActions: "play none none none",
          once: true,
          refreshPriority,
          markers: DEV_MARKERS,
        },
      }
    );
  });

  return mm;
}

export function revealFrom(
  trigger: Element | null | undefined,
  selector: string,
  fromVars: gsap.TweenVars,
  scrollVars: ScrollTrigger.Vars = {}
) {
  const mm = createMatchMedia();

  mm.add(MEDIA_CONDITIONS, (context) => {
    const motion = getMotionSettings(context.conditions);
    if (!trigger) return;

    if (motion.duration === 0) {
      showRevealTargets(trigger, selector);
      return;
    }

    prepareRevealTargets(trigger, selector, motion.travel);

    gsap.fromTo(
      trigger.querySelectorAll(selector),
      { opacity: 0, ...fromVars },
      {
        ...revealCompleteVars(),
        duration: motion.duration,
        immediateRender: false,
        scrollTrigger: {
          trigger,
          start: HEADER_START,
          toggleActions: "play none none none",
          once: true,
          markers: DEV_MARKERS,
          ...scrollVars,
        },
      }
    );
  });

  return mm;
}
