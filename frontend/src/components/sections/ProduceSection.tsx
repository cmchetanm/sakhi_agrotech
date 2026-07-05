"use client";

import { useRef } from "react";
import { useGSAP } from "@/lib/gsap";
import StaticPhoto from "@/components/ui/StaticPhoto";
import SiteIcon from "@/components/ui/SiteIcon";
import { bindButtonHover, bindCardHover } from "@/lib/animations/hoverEffects";
import { revealFrom, revealOnScroll, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import { PRODUCE_ORDER_MESSAGE, whatsappUrl } from "@/lib/whatsapp";
import type { MergedHomepageContent } from "@/types/api";

interface ProduceSectionProps {
  content: MergedHomepageContent["produce"];
  whatsappNumber?: string | null;
}

export default function ProduceSection({ content, whatsappNumber }: ProduceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const orderUrl = whatsappUrl(whatsappNumber, PRODUCE_ORDER_MESSAGE) ?? "#join";

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

      const cleanupCards = bindCardHover(ref.current?.querySelectorAll(".produce-card") ?? null, {
        lift: -6,
        scale: 1.01,
      });
      const cleanupBtn = bindButtonHover(ref.current?.querySelectorAll(".produce-cta-btn") ?? null);

      return () => {
        mmIntro.revert();
        mmBasket.revert();
        mmReveal.revert();
        cleanupCards();
        cleanupBtn();
      };
    },
    { scope: ref }
  );

  return (
    <section id="produce" ref={ref} className="relative overflow-hidden bg-gradient-warm py-24 md:py-32">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 blob bg-leaf/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="produce-header grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span data-reveal className="produce-label text-label">
              {content.label}
            </span>
            <h2 data-reveal className="produce-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
              {content.headline}
            </h2>
            <p data-reveal className="produce-body mt-5 max-w-xl text-foreground/75">
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
                className="block h-64 w-full object-cover object-center blob shadow-warm ring-4 ring-cream/80 lg:h-72"
              />
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="produce-card group rounded-3xl border border-border/60 bg-card p-6 shadow-soft"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/10 transition-colors group-hover:bg-leaf/20">
                <SiteIcon src={item.iconSrc} alt="" size={28} />
              </div>
              <h3 className="mt-4 font-display text-xl text-soil">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-vibrant">{item.stat}</p>
            </article>
          ))}
        </div>

        <div className="produce-cta mt-12">
          <a
            href={orderUrl}
            target={orderUrl.startsWith("http") ? "_blank" : undefined}
            rel={orderUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            className="produce-cta-btn inline-flex items-center rounded-full bg-leaf px-6 py-3 font-medium text-primary-foreground shadow-warm transition-colors hover:bg-vibrant"
          >
            {content.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
