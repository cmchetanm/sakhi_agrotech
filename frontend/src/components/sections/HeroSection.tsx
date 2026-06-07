"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { animateCounter, prefersReducedMotion } from "@/lib/animations/timelines";
import { prepareRevealTargets, revealCompleteVars } from "@/lib/animations/reveal";
import { bindButtonHover } from "@/lib/animations/hoverEffects";
import { scrubParallax } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import StaticPhoto from "@/components/ui/StaticPhoto";
import type { MergedHomepageContent } from "@/types/api";

interface HeroSectionProps {
  content: MergedHomepageContent["hero"];
}

function formatStat(value: number, suffix: string) {
  return `${value}${suffix}`;
}

const HERO_REVEAL =
  ".hero-eyebrow, .hero-headline, .hero-body, .hero-cta, .hero-stat, .hero-image-wrap, .hero-quote";

export default function HeroSection({ content }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const reducedMotion = prefersReducedMotion();

      if (!reducedMotion) {
        prepareRevealTargets(ref.current, HERO_REVEAL, 14);

        const tl = gsap.timeline({ defaults: { ease: "power1.out", immediateRender: false } });
        tl.fromTo(".hero-eyebrow", { opacity: 0, y: 12 }, { ...revealCompleteVars(), duration: 0.5 })
          .fromTo(
            ".hero-headline",
            { opacity: 0, y: 18 },
            { ...revealCompleteVars(), duration: 0.7 },
            "-=0.3"
          )
          .fromTo(
            ".hero-body",
            { opacity: 0, y: 12 },
            { ...revealCompleteVars(), duration: 0.55 },
            "-=0.45"
          )
          .fromTo(
            ".hero-cta",
            { opacity: 0, y: 10 },
            { ...revealCompleteVars(), duration: 0.45, stagger: 0.06 },
            "-=0.35"
          )
          .fromTo(
            ".hero-stat",
            { opacity: 0, y: 10 },
            { ...revealCompleteVars(), duration: 0.45, stagger: 0.06 },
            "-=0.3"
          )
          .fromTo(
            ".hero-image-wrap",
            { opacity: 0 },
            { ...revealCompleteVars(), duration: 0.65 },
            "-=0.55"
          )
          .fromTo(
            ".hero-quote",
            { opacity: 0, y: 10 },
            { ...revealCompleteVars(), duration: 0.45 },
            "-=0.35"
          );

        if (statsRef.current) {
          const statEls = statsRef.current.querySelectorAll(".stat-value");
          content.stats.forEach((stat, i) => {
            const el = statEls[i] as HTMLElement;
            if (el) animateCounter(el, stat.value, stat.suffix, 1.2);
          });
        }

        const mmParallax = scrubParallax(
          ref.current?.querySelector(".hero-photo-img"),
          ref.current,
          { y: -24, refreshPriority: REFRESH_PRIORITY.hero }
        );

        const cleanupHover = bindButtonHover(ref.current?.querySelectorAll(".hero-cta") ?? null);

        return () => {
          mmParallax.revert();
          cleanupHover();
        };
      }
    },
    { scope: ref, dependencies: [content] }
  );

  return (
    <section id="hero" ref={ref} className="relative overflow-x-clip">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 blob bg-ochre/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] blob-2 bg-vibrant/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span
            data-reveal
            className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-soil/15 bg-cream px-4 py-1.5 text-sm text-soil shadow-soft"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-vibrant" />
            {content.eyebrow}
          </span>

          <h1
            data-reveal
            className="hero-headline mt-6 font-display text-5xl leading-[1.05] text-soil sm:text-6xl lg:text-7xl"
          >
            {content.headline.before}
            <em className="not-italic text-leaf">{content.headline.highlight}</em>
            {content.headline.after}
          </h1>

          <p data-reveal className="hero-body mt-6 max-w-xl text-lg leading-relaxed text-foreground/75">
            {content.body}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              data-reveal
              href="#join"
              className="hero-cta inline-flex items-center rounded-full bg-leaf px-6 py-3 font-medium text-primary-foreground shadow-warm transition-colors hover:bg-vibrant"
            >
              {content.ctaPrimary}
            </a>
            <a
              data-reveal
              href="#journey"
              className="hero-cta inline-flex items-center rounded-full border border-soil/20 bg-cream/80 px-6 py-3 font-medium text-soil transition-colors hover:bg-cream"
            >
              {content.ctaSecondary} →
            </a>
          </div>

          <dl ref={statsRef} className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {content.stats.map((stat) => (
              <div key={stat.label} data-reveal className="hero-stat">
                <dt className="stat-value font-display text-3xl text-leaf">
                  {formatStat(stat.value, stat.suffix)}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div data-reveal className="hero-image-wrap relative w-full pb-4 lg:col-span-6">
          <div
            className="pointer-events-none absolute -inset-3 blob bg-gradient-leaf opacity-90"
            aria-hidden
          />
          <div className="hero-photo-frame relative z-10 overflow-hidden blob shadow-warm">
            <StaticPhoto
              src={content.image}
              alt="Sakhi Agrotech organic farm at golden hour with rows of fresh vegetables"
              width={1920}
              height={1080}
              priority
              className="hero-photo-img block h-[28rem] w-full scale-105 object-cover object-center sm:h-[34rem]"
            />
          </div>
          <div className="hero-quote absolute bottom-2 left-2 z-20 hidden max-w-[17rem] rounded-2xl bg-cream px-5 py-4 shadow-warm sm:block">
            <p className="font-display text-lg leading-snug text-soil">&ldquo;{content.quote.text}&rdquo;</p>
            <p className="mt-2 text-sm leading-normal text-muted-foreground">{content.quote.attribution}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
