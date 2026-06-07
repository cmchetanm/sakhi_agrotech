"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

interface ScrubTimelineProps {
  children: ReactNode;
  className?: string;
}

export default function ScrubTimeline({ children, className }: ScrubTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const milestones = ref.current?.querySelectorAll(".milestone-item");
        if (!milestones?.length || !lineRef.current) return;

        gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });

        tl.to(lineRef.current, { scaleY: 1, ease: "none" });

        milestones.forEach((item, i) => {
          tl.from(
            item,
            { opacity: 0, x: 30, duration: 0.4, ease: "power2.out" },
            i * 0.2
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
        className="absolute left-3 top-0 h-full w-px border-l-2 border-dashed border-olive"
        aria-hidden="true"
      />
      <div className="relative space-y-10 pl-10">{children}</div>
    </div>
  );
}
