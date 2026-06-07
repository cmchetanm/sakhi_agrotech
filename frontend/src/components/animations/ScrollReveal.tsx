"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { createMatchMedia, getMotionSettings, MEDIA_CONDITIONS } from "@/lib/animations/matchMediaContext";
import { DEV_MARKERS } from "@/lib/animations/presets";
import { prepareRevealTargets, revealCompleteVars, showRevealTargets } from "@/lib/animations/reveal";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  delay?: number;
}

export default function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = createMatchMedia();
      mm.add(MEDIA_CONDITIONS, (context) => {
        const motion = getMotionSettings(context.conditions);
        if (!ref.current) return;

        if (motion.duration === 0) {
          showRevealTargets(ref.current, ":scope");
          return;
        }

        ref.current.setAttribute("data-reveal", "");
        prepareRevealTargets(ref.current, ":scope", motion.travel);

        const x =
          direction === "left" ? -motion.travel * 1.2 : direction === "right" ? motion.travel * 1.2 : 0;
        const y = direction === "up" ? motion.travel : 0;

        gsap.fromTo(
          ref.current,
          { opacity: 0, x, y },
          {
            ...revealCompleteVars(),
            duration: motion.duration,
            delay,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
              markers: DEV_MARKERS,
            },
          }
        );
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <div ref={ref} data-reveal className={clsx(className)}>
      {children}
    </div>
  );
}
