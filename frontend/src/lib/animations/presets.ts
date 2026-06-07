import gsap from "gsap";

gsap.defaults({ duration: 0.55, ease: "power1.out" });

export const REVEAL_ATTR = "data-reveal";
export const REVEALED_ATTR = "data-revealed";

export const fadeUpFrom = { opacity: 0, y: 14 };
export const fadeUpTo = {
  opacity: 1,
  y: 0,
  clearProps: "transform,opacity",
};

export const SCRUB_LAG = 1.2;
export const BATCH_START = "top 88%";
export const HEADER_START = "top 82%";

export const DEV_MARKERS = false;
