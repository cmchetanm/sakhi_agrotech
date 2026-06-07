"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@/lib/gsap";
import { bindCardHover, bindImageHover } from "@/lib/animations/hoverEffects";
import { revealOnScroll, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import type { MergedHomepageContent } from "@/types/api";

interface TeamSectionProps {
  content: MergedHomepageContent["team"];
}

function getInitial(name: string) {
  return name[0]?.toUpperCase() ?? "?";
}

export default function TeamSection({ content }: TeamSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".team-label",
          headline: ".team-headline",
        },
        REFRESH_PRIORITY.team
      );

      const mmReveal = revealOnScroll(ref.current, ".team-card", {
        scale: 0.97,
      });

      const cleanupCards = bindCardHover(ref.current?.querySelectorAll(".team-card") ?? null, {
        lift: -4,
        scale: 1.01,
      });
      const cleanupAvatars = bindImageHover(
        ref.current?.querySelectorAll(".team-avatar") ?? null,
        1.08
      );

      return () => {
        mmIntro.revert();
        mmReveal.revert();
        cleanupCards();
        cleanupAvatars();
      };
    },
    { scope: ref }
  );

  return (
    <section id="team" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span data-reveal className="team-label text-label">
            {content.label}
          </span>
          <h2 data-reveal className="team-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
            {content.headline}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.members.map((member) => (
            <article
              key={member.id ?? member.name}
              data-reveal
              className="team-card rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
            >
              <div className="team-avatar relative h-16 w-16 overflow-hidden rounded-full bg-gradient-leaf shadow-soft">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="team-avatar-inner object-cover"
                  />
                ) : (
                  <span className="team-avatar-inner flex h-full items-center justify-center font-display text-2xl text-cream">
                    {getInitial(member.name)}
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-xl text-soil">{member.name}</h3>
              <p className="mt-1 text-sm text-vibrant">{member.designation}</p>
              {member.description && (
                <p className="mt-3 text-sm text-foreground/70">{member.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
