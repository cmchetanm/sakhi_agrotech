"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import { bindCardHover } from "@/lib/animations/hoverEffects";
import { revealOnScroll, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import SiteIcon from "@/components/ui/SiteIcon";
import type { MergedHomepageContent } from "@/types/api";

interface WhySakhiSectionProps {
  content: MergedHomepageContent["why"];
}

export default function WhySakhiSection({ content }: WhySakhiSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".why-label",
          headline: ".why-headline",
          body: ".why-body",
        },
        REFRESH_PRIORITY.why
      );

      const mm = revealOnScroll(ref.current, ".why-card", {
        staggerFrom: "start",
      });

      const cleanupHover = bindCardHover(ref.current?.querySelectorAll(".why-card") ?? null, {
        lift: -6,
        scale: 1.01,
      });

      return () => {
        mmIntro.revert();
        mm.revert();
        cleanupHover();
      };
    },
    { scope: ref }
  );

  return (
    <section id="why" ref={ref} className="relative overflow-hidden bg-gradient-warm pt-24 pb-40 md:pt-32 md:pb-48">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="why-header max-w-2xl">
          <span data-reveal className="why-label text-label">
            {content.label}
          </span>
          <h2 data-reveal className="why-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
            {content.headline}
          </h2>
          <p data-reveal className="why-body mt-5 text-lg text-foreground/75">
            {content.body}
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.values.map((value) => (
            <article
              key={value.title}
              data-reveal
              className="why-card group relative rounded-3xl border border-border/60 bg-card p-7 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/10 transition-colors group-hover:bg-leaf/20">
                <SiteIcon src={value.iconSrc} alt="" size={28} />
              </div>
              <h3 className="mt-5 font-display text-xl text-soil">{value.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/70">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
