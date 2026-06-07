"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";
import { prefersReducedMotion } from "@/lib/animations/timelines";
import { createMatchMedia, MEDIA_CONDITIONS, parseConditions } from "@/lib/animations/matchMediaContext";
import { DEV_MARKERS } from "@/lib/animations/presets";

interface SplitHeadlineProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  /** When true, animates on page load instead of scroll */
  immediate?: boolean;
  trigger?: Element | null;
}

function splitWords(text: string) {
  return text.split(" ").map((word, i, arr) => (
    <span key={`${word}-${i}`} className="split-word inline-block">
      {word}
      {i < arr.length - 1 ? "\u00A0" : ""}
    </span>
  ));
}

function renderChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") return splitWords(children);
  return children;
}

export default function SplitHeadline({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
  immediate = false,
  trigger,
}: SplitHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".split-word");
      if (!words?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(words, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      const mm = createMatchMedia();
      mm.add(MEDIA_CONDITIONS, (context) => {
        const { reduceMotion } = parseConditions(context);
        const travel = reduceMotion ? 0 : 50;
        const duration = reduceMotion ? 0 : 0.8;

        const vars: gsap.TweenVars = {
          y: travel,
          autoAlpha: 0,
          duration,
          stagger: 0.08,
          delay,
          ease: "power3.out",
          clearProps: "transform",
        };

        if (immediate) {
          gsap.from(words, vars);
        } else {
          gsap.from(words, {
            ...vars,
            scrollTrigger: {
              trigger: trigger ?? ref.current,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true,
              markers: DEV_MARKERS,
            },
          });
        }
      });
    },
    { scope: ref, dependencies: [immediate, trigger] }
  );

  return (
    <Tag ref={ref} className={clsx("font-display", className)}>
      {renderChildren(children)}
    </Tag>
  );
}
