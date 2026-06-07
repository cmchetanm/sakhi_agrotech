"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { scrubParallax } from "@/lib/animations/scrollReveal";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

export default function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = scrubParallax(ref.current, ref.current, {
        y: speed * -100,
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
