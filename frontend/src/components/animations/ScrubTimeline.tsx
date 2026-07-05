"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { createMatchMedia, getMotionSettings, MEDIA_CONDITIONS, parseConditions } from "@/lib/animations/matchMediaContext";
import { DEV_MARKERS } from "@/lib/animations/presets";
import { prepareRevealTargets, revealCompleteVars, showRevealTargets, markRevealed } from "@/lib/animations/reveal";

interface ScrubTimelineProps {
  children: ReactNode;
  className?: string;
  lineClassName?: string;
}

export default function ScrubTimeline({
  children,
  className,
  lineClassName = "border-soil/25",
}: ScrubTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = createMatchMedia();

      mm.add(MEDIA_CONDITIONS, (context) => {
        const { reduceMotion, isMobile } = parseConditions(context);
        const motion = getMotionSettings(context.conditions);
        const milestones = ref.current?.querySelectorAll(".milestone-item");
        if (!milestones?.length) return;

        if (reduceMotion || motion.duration === 0) {
          showRevealTargets(ref.current, ".milestone-item");
          if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
          return;
        }

        prepareRevealTargets(ref.current, ".milestone-item", motion.travel);

        if (isMobile) {
          gsap.fromTo(
            milestones,
            { autoAlpha: 0, y: motion.travel },
            {
              ...revealCompleteVars(),
              duration: motion.duration,
              stagger: motion.stagger,
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
          if (lineRef.current) gsap.set(lineRef.current, { scaleY: 1 });
          return;
        }

        if (!lineRef.current) return;

        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });

        gsap.to(lineRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: motion.scrub || 0.65,
            markers: DEV_MARKERS,
          },
        });

        gsap.fromTo(
          milestones,
          { autoAlpha: 0, x: 20 },
          {
            autoAlpha: 1,
            x: 0,
            duration: motion.duration,
            stagger: motion.stagger,
            ease: "power2.out",
            immediateRender: false,
            clearProps: "transform",
            onComplete() {
              (this.targets() as Element[]).forEach((el) => {
                markRevealed(el);
                gsap.set(el, { clearProps: "opacity,visibility" });
              });
            },
            scrollTrigger: {
              trigger: ref.current,
              start: "top 72%",
              toggleActions: "play none none none",
              once: true,
              markers: DEV_MARKERS,
            },
          }
        );

        milestones.forEach((item) => {
          const dot = item.querySelector(".milestone-dot");
          if (!dot) return;
          gsap.fromTo(
            dot,
            { scale: 0.7, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              duration: 0.25,
              ease: "back.out(2)",
              immediateRender: false,
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true,
              },
            }
          );
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={clsx("relative", className)}>
      <div
        ref={lineRef}
        className={clsx(
          "absolute left-0 top-0 h-full w-0.5 border-l-2 border-dashed",
          lineClassName
        )}
        aria-hidden="true"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
