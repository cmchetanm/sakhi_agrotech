"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

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
      const items = ref.current?.querySelectorAll(childSelector);
      if (!items?.length) return;

      gsap.from(items, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
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
