"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import StaticPhoto from "@/components/ui/StaticPhoto";
import { bindCardHover, bindLayersTilt } from "@/lib/animations/hoverEffects";
import { revealFrom, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import { createMatchMedia, getMotionSettings, MEDIA_CONDITIONS, parseConditions } from "@/lib/animations/matchMediaContext";
import { fadeUpFrom } from "@/lib/animations/presets";
import { prepareRevealTargets, revealCompleteVars, showRevealTargets } from "@/lib/animations/reveal";
import type { MergedHomepageContent } from "@/types/api";

const LAYER_BG: Record<string, string> = {
  leaf: "bg-leaf",
  vibrant: "bg-vibrant",
  ochre: "bg-ochre",
  terracotta: "bg-terracotta",
  soil: "bg-soil",
};

interface ResearchSectionProps {
  content: MergedHomepageContent["research"];
}

export default function ResearchSection({ content }: ResearchSectionProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".research-label",
          headline: ".research-headline",
          body: ".research-body",
        },
        REFRESH_PRIORITY.research
      );

      const mmPhoto = revealFrom(
        ref.current,
        ".research-left-photo",
        { scale: 0.96 },
        { start: "top 78%" }
      );

      const mmLayers = revealFrom(
        ref.current,
        ".research-layers-card",
        { x: 24 },
        { start: "top 76%" }
      );

      let cleanupTilt = () => {};

      const mm = createMatchMedia();
      mm.add(MEDIA_CONDITIONS, (context) => {
        const { isMobile, isDesktop } = parseConditions(context);
        const motion = getMotionSettings(context.conditions);

        if (motion.duration === 0) {
          showRevealTargets(ref.current, ".research-stat, .research-article");
          return;
        }

        prepareRevealTargets(ref.current, ".research-stat", motion.travel);
        prepareRevealTargets(ref.current, ".research-article", motion.travel);

        ScrollTrigger.batch(".research-stat", {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            const pending = batch.filter((el) => el.getAttribute("data-revealed") !== "true");
            if (!pending.length) return;
            gsap.fromTo(
              pending,
              { ...fadeUpFrom, scale: 0.96 },
              {
                ...revealCompleteVars(),
                duration: motion.duration * 0.8,
                stagger: motion.stagger,
                ease: "power2.out",
                immediateRender: false,
              }
            );
          },
        });

        ScrollTrigger.batch(".research-article", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => {
            const pending = batch.filter((el) => el.getAttribute("data-revealed") !== "true");
            if (!pending.length) return;
            gsap.fromTo(
              pending,
              {
                ...fadeUpFrom,
                y: motion.travel,
                x: (_, el) => {
                  if (isMobile) return 0;
                  const idx = gsap.utils.toArray(".research-article", ref.current).indexOf(el);
                  return idx % 2 === 0 ? -16 : 16;
                },
              },
              {
                ...revealCompleteVars(),
                duration: motion.duration,
                stagger: motion.stagger,
                ease: "power2.out",
                immediateRender: false,
              }
            );
          },
        });

        if (isDesktop) {
          cleanupTilt = bindLayersTilt(ref.current?.querySelector(".research-layers-card") ?? null);
        }
      });

      const cleanupArticles = bindCardHover(ref.current?.querySelectorAll(".research-article") ?? null);

      return () => {
        mmIntro.revert();
        mmPhoto.revert();
        mmLayers.revert();
        mm.revert();
        cleanupArticles();
        cleanupTilt();
      };
    },
    { scope: ref }
  );

  return (
    <section id="research" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="research-left lg:col-span-5">
            <span data-reveal className="research-label text-label">
              {content.label}
            </span>
            <h2 data-reveal className="research-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
              {content.headline}
            </h2>
            <p data-reveal className="research-body mt-5 text-foreground/75">
              {content.body}
            </p>

            <div data-reveal className="research-left-photo relative mt-8 w-full overflow-hidden">
              <div className="absolute -inset-2 blob bg-vibrant/30" aria-hidden />
              <StaticPhoto
                src={content.image}
                alt="Multi-layer organic farm with trees, vegetables and herbs growing together"
                width={1024}
                height={1024}
                className="relative z-10 block h-72 w-full object-cover object-center blob shadow-warm"
              />
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  data-reveal
                  className="research-stat rounded-2xl border border-border/60 bg-card p-4 text-center shadow-soft"
                >
                  <dt className="font-display text-2xl text-leaf">{stat.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div data-reveal className="research-layers-card rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
              <h3 className="font-display text-2xl text-soil">{content.layersTitle}</h3>
              <ul className="mt-6 space-y-4">
                {content.layers.map((layer) => (
                  <li key={layer.num} className="flex items-start gap-4">
                    <span
                      className={`mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-cream ${LAYER_BG[layer.color] ?? "bg-leaf"}`}
                    >
                      {layer.num}
                    </span>
                    <div>
                      <p className="font-display text-lg text-soil">{layer.title}</p>
                      <p className="mt-1 text-sm text-foreground/70">{layer.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {content.articles.map((article) => (
                <article
                  key={article.title}
                  data-reveal
                  className="research-article rounded-2xl border border-border/60 bg-cream p-5"
                >
                  <span className="text-xs uppercase tracking-widest text-vibrant">{article.tag}</span>
                  <h4 className="mt-2 font-display text-lg leading-snug text-soil">{article.title}</h4>
                  <p className="mt-3 text-xs text-muted-foreground">{article.read} · coming soon</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
