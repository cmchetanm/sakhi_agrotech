"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { STORIES } from "@/content/site";

function QuoteIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-ochre">
      <path d="M7 7h4v4H7c0 2 1 3 3 3v3c-4 0-6-3-6-6V7zm9 0h4v4h-4c0 2 1 3 3 3v3c-4 0-6-3-6-6V7z" />
    </svg>
  );
}

export default function StoriesSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".story-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            y: 40,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out",
          }),
        once: true,
      });
    },
    { scope: ref }
  );

  return (
    <section id="stories" ref={ref} className="relative bg-gradient-warm py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span className="text-label">{STORIES.label}</span>
        <h2 className="mt-3 font-display text-4xl text-soil sm:text-5xl">
          {STORIES.headline.part1}{" "}
          <em className="not-italic text-leaf">{STORIES.headline.part2}</em>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-foreground/75">{STORIES.body}</p>

        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {STORIES.testimonials.map((t, index) => (
            <figure
              key={t.author}
              className="story-card rounded-3xl border border-border/60 bg-card p-7 shadow-soft"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <QuoteIcon />
              <blockquote className="mt-4 font-display text-xl leading-snug text-soil">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                — {t.author}, {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
