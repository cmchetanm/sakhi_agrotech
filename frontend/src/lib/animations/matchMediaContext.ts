import { gsap } from "@/lib/gsap";

export const MEDIA_CONDITIONS = {
  isDesktop: "(min-width: 1024px)",
  isMobile: "(max-width: 1023px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export interface MotionSettings {
  travel: number;
  duration: number;
  scrub: number | false;
  stagger: number;
}

export function parseConditions(context: { conditions?: {
  isDesktop?: boolean;
  isMobile?: boolean;
  reduceMotion?: boolean;
} }) {
  return {
    isDesktop: context.conditions?.isDesktop ?? false,
    isMobile: context.conditions?.isMobile ?? false,
    reduceMotion: context.conditions?.reduceMotion ?? false,
  };
}

export function getMotionSettings(conditions?: {
  isDesktop?: boolean;
  isMobile?: boolean;
  reduceMotion?: boolean;
}): MotionSettings {
  const { isDesktop = false, isMobile = false, reduceMotion = false } = conditions ?? {};

  if (reduceMotion) {
    return { travel: 0, duration: 0, scrub: false, stagger: 0 };
  }

  return {
    travel: isMobile ? 10 : 16,
    duration: 0.55,
    scrub: 1.2,
    stagger: isDesktop ? 0.08 : 0.06,
  };
}

export function createMatchMedia() {
  return gsap.matchMedia();
}
