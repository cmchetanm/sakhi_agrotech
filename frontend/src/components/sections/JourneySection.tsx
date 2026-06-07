"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import StaticPhoto from "@/components/ui/StaticPhoto";
import ScrubTimeline from "@/components/animations/ScrubTimeline";
import { revealSectionIntro, scrubParallax } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import type { MergedHomepageContent } from "@/types/api";

interface JourneySectionProps {
  content: MergedHomepageContent["journey"];
}

export default function JourneySection({ content }: JourneySectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".journey-label",
          headline: ".journey-headline",
          body: ".journey-body",
        },
        REFRESH_PRIORITY.journey
      );

      const mmParallax = scrubParallax(
        ref.current?.querySelector(".journey-photo-img"),
        ref.current,
        { y: -20, refreshPriority: REFRESH_PRIORITY.journey }
      );

      return () => {
        mmIntro.revert();
        mmParallax.revert();
      };
    },
    { scope: ref }
  );

  return (
    <section id="journey" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="journey-left lg:sticky lg:top-28 lg:col-span-5">
          <span data-reveal className="journey-label text-label">
            {content.label}
          </span>
          <h2 data-reveal className="journey-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
            {content.headline.before}
            <em className="not-italic text-leaf">{content.headline.highlight}</em>
            {content.headline.after}
          </h2>
          <p data-reveal className="journey-body mt-5 text-foreground/75">
            {content.body}
          </p>

          <div data-reveal className="journey-photo relative mt-8 hidden lg:block">
            <div className="absolute -inset-2 blob-2 bg-ochre/40" aria-hidden />
            <div className="relative overflow-hidden blob-2 shadow-warm">
              <StaticPhoto
                src={content.image}
                alt="Hands holding rich dark soil with a green seedling"
                width={1024}
                height={1024}
                className="journey-photo-img relative block h-72 w-full scale-105 object-cover"
              />
            </div>
          </div>
        </div>

        <ScrubTimeline className="lg:col-span-7 pl-8" lineClassName="border-soil/25">
          <ol className="space-y-10">
            {content.milestones.map((m) => (
              <li key={m.label} data-reveal className="milestone-item relative pl-2">
                <span
                  className="milestone-dot absolute -left-[2.35rem] top-1.5 h-5 w-5 rounded-full bg-leaf ring-4 ring-cream shadow-soft"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-xs font-medium uppercase tracking-widest text-vibrant">{m.label}</span>
                </div>
                <h3 className="mt-2 font-display text-2xl text-soil">{m.title}</h3>
                <p className="mt-2 text-foreground/75">{m.description}</p>
              </li>
            ))}
          </ol>
        </ScrubTimeline>
      </div>
    </section>
  );
}
