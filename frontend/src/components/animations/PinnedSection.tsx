"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

interface PinnedSectionProps {
  children: ReactNode;
  className?: string;
  pinDuration?: string;
}

export default function PinnedSection({
  children,
  className,
  pinDuration = "+=80%",
}: PinnedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top top",
          end: pinDuration,
          pin: true,
          pinSpacing: true,
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={clsx(className)}>
      {children}
    </div>
  );
}
