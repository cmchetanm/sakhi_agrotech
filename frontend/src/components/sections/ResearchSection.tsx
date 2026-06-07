"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { RESEARCH } from "@/content/site";
import { IMAGES } from "@/lib/assets";
import StaticPhoto from "@/components/ui/StaticPhoto";

const LAYER_BG: Record<string, string> = {
  leaf: "bg-leaf",
  vibrant: "bg-vibrant",
  ochre: "bg-ochre",
  terracotta: "bg-terracotta",
  soil: "bg-soil",
};

export default function ResearchSection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".research-left", {
        opacity: 0,
        x: -40,
        duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
      });

      gsap.from(".research-layers-card", {
        opacity: 0,
        x: 30,
        duration: 0.8,
        scrollTrigger: { trigger: ".research-layers-card", start: "top 75%", toggleActions: "play none none reverse" },
      });

      ScrollTrigger.batch(".research-stat", {
        start: "top 85%",
        onEnter: (batch) =>
          gsap.from(batch, { opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5 }),
        once: true,
      });

      ScrollTrigger.batch(".research-article", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.from(batch, { opacity: 0, y: 30, stagger: 0.12, duration: 0.6 }),
        once: true,
      });
    },
    { scope: ref }
  );

  return (
    <section id="research" ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="research-left lg:col-span-5">
            <span className="text-label">{RESEARCH.label}</span>
            <h2 className="mt-3 font-display text-4xl text-soil sm:text-5xl">{RESEARCH.headline}</h2>
            <p className="mt-5 text-foreground/75">{RESEARCH.body}</p>

            <div className="relative mt-8 w-full">
              <div className="absolute -inset-2 blob bg-vibrant/30" aria-hidden />
              <StaticPhoto
                src={IMAGES.research}
                alt="Multi-layer organic farm with trees, vegetables and herbs growing together"
                width={1024}
                height={1024}
                className="relative z-10 block h-72 w-full object-cover object-center blob shadow-warm"
              />
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4">
              {RESEARCH.stats.map((stat) => (
                <div key={stat.label} className="research-stat rounded-2xl border border-border/60 bg-card p-4 text-center shadow-soft">
                  <dt className="font-display text-2xl text-leaf">{stat.value}</dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-7">
            <div className="research-layers-card rounded-3xl border border-border/60 bg-card p-8 shadow-soft">
              <h3 className="font-display text-2xl text-soil">{RESEARCH.layersTitle}</h3>
              <ul className="mt-6 space-y-4">
                {RESEARCH.layers.map((layer) => (
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
              {RESEARCH.articles.map((article, index) => (
                <article
                  key={article.title}
                  className="research-article rounded-2xl border border-border/60 bg-cream p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-warm"
                  style={{ transitionDelay: `${index * 60}ms` }}
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
