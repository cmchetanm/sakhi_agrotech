"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import clsx from "clsx";

interface SplitHeadlineProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
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
}: SplitHeadlineProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const words = ref.current?.querySelectorAll(".split-word");
      if (!words?.length) return;

      gsap.from(words, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={clsx("font-display", className)}>
      {renderChildren(children)}
    </Tag>
  );
}
