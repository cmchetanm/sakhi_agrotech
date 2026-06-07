"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { bindCardHover } from "@/lib/animations/hoverEffects";
import { revealOnScroll, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import type { MergedHomepageContent } from "@/types/api";

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={className ?? "text-ochre"}>
      <path d="M7 7h4v4H7c0 2 1 3 3 3v3c-4 0-6-3-6-6V7zm9 0h4v4h-4c0 2 1 3 3 3v3c-4 0-6-3-6-6V7z" />
    </svg>
  );
}

interface StoriesSectionProps {
  content: MergedHomepageContent["stories"];
}

export default function StoriesSection({ content }: StoriesSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".stories-label",
          headline: ".stories-headline",
          body: ".stories-body",
        },
        REFRESH_PRIORITY.stories
      );

      const mmReveal = revealOnScroll(ref.current, ".story-card", {
        stagger: 0.12,
      });

      const cleanupCards = bindCardHover(ref.current?.querySelectorAll(".story-card") ?? null);

      return () => {
        mmIntro.revert();
        mmReveal.revert();
        cleanupCards();
      };
    },
    { scope: ref }
  );

  return (
    <section id="stories" ref={ref} className="relative bg-gradient-warm py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-8">
        <span data-reveal className="stories-label text-label">
          {content.label}
        </span>
        <h2 data-reveal className="stories-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
          {content.headline.part1}{" "}
          <em className="not-italic text-leaf">{content.headline.part2}</em>
        </h2>
        <p data-reveal className="stories-body mx-auto mt-5 max-w-2xl text-foreground/75">
          {content.body}
        </p>

        <div className="mt-14 grid gap-6 text-left md:grid-cols-3">
          {content.testimonials.map((t) => (
            <figure
              key={t.author}
              data-reveal
              className="story-card rounded-3xl border border-border/60 bg-card p-7 shadow-soft"
            >
              <QuoteIcon className="text-ochre" />
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
