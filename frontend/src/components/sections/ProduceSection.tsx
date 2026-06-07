"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import StaticPhoto from "@/components/ui/StaticPhoto";
import SiteIcon from "@/components/ui/SiteIcon";
import { bindButtonHover, bindCardHover } from "@/lib/animations/hoverEffects";
import { revealFrom, revealOnScroll, revealSectionIntro, scrubParallax } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import type { MergedHomepageContent } from "@/types/api";

interface ProduceSectionProps {
  content: MergedHomepageContent["produce"];
}

export default function ProduceSection({ content }: ProduceSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".produce-label",
          headline: ".produce-headline",
          body: ".produce-body",
        },
        REFRESH_PRIORITY.produce
      );

      const mmBasket = revealFrom(
        ref.current,
        ".produce-basket",
        { scale: 0.92, rotation: -4 },
        { start: "top 72%", refreshPriority: REFRESH_PRIORITY.produce }
      );

      const mmReveal = revealOnScroll(ref.current, ".produce-card", {
        staggerFrom: "center",
      });

      const mmParallax = scrubParallax(
        ref.current?.querySelector(".produce-basket-inner"),
        ref.current,
        { y: -20, refreshPriority: REFRESH_PRIORITY.produce }
      );

      const cleanupCards = bindCardHover(ref.current?.querySelectorAll(".produce-card") ?? null);
      const cleanupBtn = bindButtonHover(ref.current?.querySelectorAll(".produce-cta-btn") ?? null);

      return () => {
        mmIntro.revert();
        mmBasket.revert();
        mmReveal.revert();
        mmParallax.revert();
        cleanupCards();
        cleanupBtn();
      };
    },
    { scope: ref }
  );

  return (
    <section id="produce" ref={ref} className="relative overflow-hidden bg-soil py-24 text-cream md:py-32">
      <div className="grain pointer-events-none absolute inset-0" />
      <div className="absolute -top-24 right-0 h-80 w-80 blob bg-vibrant/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="produce-header grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span data-reveal className="produce-label text-sm font-medium uppercase tracking-[0.2em] text-ochre">
              {content.label}
            </span>
            <h2 data-reveal className="produce-headline mt-3 font-display text-4xl text-cream sm:text-5xl">
              {content.headline}
            </h2>
            <p data-reveal className="produce-body mt-5 max-w-xl text-cream/75">
              {content.body}
            </p>
          </div>
          <div data-reveal className="produce-basket w-full overflow-hidden lg:col-span-5">
            <div className="produce-basket-inner">
              <StaticPhoto
                src={content.basketImage}
                alt="Basket of fresh organic vegetables with soil still on roots"
                width={1024}
                height={1024}
                className="block h-64 w-full object-cover object-center blob shadow-warm lg:h-72"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <div
              key={item.title}
              data-reveal
              className="produce-card group rounded-3xl border border-cream/10 bg-cream/5 p-6 backdrop-blur-sm"
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                <SiteIcon src={item.iconSrc} alt="" size={32} className="brightness-0 invert" />
              </div>
              <h3 className="mt-4 font-display text-2xl text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-ochre">{item.stat}</p>
            </div>
          ))}
        </div>

        <div className="produce-cta mt-12">
          <a
            href="#join"
            className="produce-cta-btn inline-flex items-center rounded-full bg-ochre px-6 py-3 font-medium text-soil shadow-warm transition-colors hover:bg-cream"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
