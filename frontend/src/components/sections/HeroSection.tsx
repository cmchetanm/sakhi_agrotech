"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { animateCounter, prefersReducedMotion } from "@/lib/animations/timelines";
import { HERO } from "@/content/site";
import { IMAGES } from "@/lib/assets";
import StaticPhoto from "@/components/ui/StaticPhoto";

interface HeroSectionProps {
  heroImage?: string | null;
}

function formatStat(value: number, suffix: string) {
  return `${value}${suffix}`;
}

export default function HeroSection({ heroImage: _heroImage }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const reducedMotion = prefersReducedMotion();
      const fromDefaults = { immediateRender: false as const };

      if (!reducedMotion) {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6, ...fromDefaults })
          .from(".hero-headline", { opacity: 0, y: 50, duration: 0.8, ...fromDefaults }, "-=0.2")
          .from(".hero-body", { opacity: 0, y: 30, duration: 0.7, ...fromDefaults }, "-=0.4")
          .from(".hero-cta", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ...fromDefaults }, "-=0.3")
          .from(".hero-stat", { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, ...fromDefaults }, "-=0.2")
          .from(".hero-image-wrap", { opacity: 0, scale: 0.9, duration: 1, ...fromDefaults }, "-=0.8")
          .from(".hero-quote", { opacity: 0, y: 20, duration: 0.6, ...fromDefaults }, "-=0.4");

        if (statsRef.current) {
          const statEls = statsRef.current.querySelectorAll(".stat-value");
          HERO.stats.forEach((stat, i) => {
            const el = statEls[i] as HTMLElement;
            if (el) animateCounter(el, stat.value, stat.suffix, 1.2);
          });
        }

        gsap.to(".hero-image-wrap", {
          y: -30,
          scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      }
    },
    { scope: ref }
  );

  return (
    <section id="hero" ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 blob bg-ochre/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] blob-2 bg-vibrant/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 sm:px-8 md:pb-28 md:pt-20 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <span className="hero-eyebrow inline-flex items-center gap-2 rounded-full border border-soil/15 bg-cream px-4 py-1.5 text-sm text-soil shadow-soft">
            <span className="h-2 w-2 animate-pulse rounded-full bg-vibrant" />
            {HERO.eyebrow}
          </span>

          <h1 className="hero-headline mt-6 font-display text-5xl leading-[1.05] text-soil sm:text-6xl lg:text-7xl">
            {HERO.headline.before}
            <em className="not-italic text-leaf">{HERO.headline.highlight}</em>
            {HERO.headline.after}
          </h1>

          <p className="hero-body mt-6 max-w-xl text-lg text-foreground/75">{HERO.body}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#join"
              className="hero-cta inline-flex items-center rounded-full bg-leaf px-6 py-3 font-medium text-primary-foreground shadow-warm transition hover:bg-vibrant"
            >
              {HERO.ctaPrimary}
            </a>
            <a
              href="#journey"
              className="hero-cta inline-flex items-center rounded-full border border-soil/20 bg-cream/80 px-6 py-3 font-medium text-soil transition hover:bg-cream"
            >
              {HERO.ctaSecondary} →
            </a>
          </div>

          <dl ref={statsRef} className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {HERO.stats.map((stat) => (
              <div key={stat.label} className="hero-stat">
                <dt className="stat-value font-display text-3xl text-leaf">
                  {formatStat(stat.value, stat.suffix)}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-image-wrap w-full lg:col-span-6">
          <div className="relative w-full">
            <div className="absolute -inset-3 blob bg-gradient-leaf opacity-90" aria-hidden />
            <StaticPhoto
              src={IMAGES.hero}
              alt="Sakhi Agrotech organic farm at golden hour with rows of fresh vegetables"
              width={1920}
              height={1080}
              priority
              className="relative z-10 block w-full h-[28rem] sm:h-[34rem] object-cover object-center blob shadow-warm"
            />
            <div className="hero-quote absolute -bottom-6 -left-6 z-20 hidden max-w-[16rem] rounded-2xl bg-cream px-5 py-4 shadow-warm sm:block">
              <p className="font-display text-lg leading-snug text-soil">&ldquo;{HERO.quote.text}&rdquo;</p>
              <p className="mt-2 text-xs text-muted-foreground">{HERO.quote.attribution}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
