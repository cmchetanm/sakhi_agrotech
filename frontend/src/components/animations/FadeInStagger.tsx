"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { createMatchMedia, getMotionSettings, MEDIA_CONDITIONS } from "@/lib/animations/matchMediaContext";
import { DEV_MARKERS } from "@/lib/animations/presets";
import { prepareRevealTargets, revealCompleteVars, showRevealTargets } from "@/lib/animations/reveal";

interface FadeInStaggerProps {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
}

export default function FadeInStagger({
  children,
  className,
  childSelector = ".stagger-item",
  stagger = 0.12,
}: FadeInStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = createMatchMedia();
      mm.add(MEDIA_CONDITIONS, (context) => {
        const motion = getMotionSettings(context.conditions);
        if (!ref.current) return;

        if (motion.duration === 0) {
          showRevealTargets(ref.current, childSelector);
          return;
        }

        prepareRevealTargets(ref.current, childSelector, motion.travel);

        gsap.fromTo(
          ref.current.querySelectorAll(childSelector),
          { opacity: 0, y: motion.travel },
          {
            ...revealCompleteVars(),
            duration: motion.duration,
            stagger: stagger || motion.stagger,
            ease: "power2.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
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
    <div ref={ref} className={clsx(className)}>
      {children}
    </div>
  );
}
