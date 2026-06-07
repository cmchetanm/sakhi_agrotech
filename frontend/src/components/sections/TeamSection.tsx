"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { TEAM } from "@/content/site";
import type { TeamMember } from "@/types/api";

type DisplayMember = TeamMember & { description?: string | null };

interface TeamSectionProps {
  members: DisplayMember[];
}

function getInitial(name: string) {
  return name[0]?.toUpperCase() ?? "?";
}

export default function TeamSection({ members }: TeamSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.batch(".team-card", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.from(batch, {
            opacity: 0,
            scale: 0.95,
            y: 30,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          }),
        once: true,
      });
    },
    { scope: ref }
  );

  return (
    <section id="team" ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <span className="text-label">{TEAM.label}</span>
          <h2 className="mt-3 font-display text-4xl text-soil sm:text-5xl">{TEAM.headline}</h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, index) => (
            <article
              key={member.id ?? member.name}
              className="team-card rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-leaf shadow-soft">
                {member.photo ? (
                  <Image src={member.photo} alt={member.name} fill className="object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center font-display text-2xl text-cream">
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
