"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PRODUCE } from "@/content/site";
import { IMAGES } from "@/lib/assets";
import StaticPhoto from "@/components/ui/StaticPhoto";
import type { Initiative } from "@/types/api";

interface ProduceSectionProps {
  initiatives: Initiative[];
}

export default function ProduceSection({ initiatives: _initiatives }: ProduceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const basketImage = IMAGES.produceBasket;

  useGSAP(
    () => {
      gsap.from(".produce-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        scrollTrigger: { trigger: ref.current, start: "top 75%", toggleActions: "play none none reverse" },
      });

      gsap.from(".produce-basket", {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 1,
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
      });

      ScrollTrigger.batch(".produce-card", {
        start: "top 90%",
        onEnter: (batch) =>
          gsap.from(batch, { opacity: 0, y: 50, stagger: 0.1, duration: 0.6, ease: "power2.out" }),
        once: true,
      });
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
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-ochre">{PRODUCE.label}</span>
            <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">{PRODUCE.headline}</h2>
            <p className="mt-5 max-w-xl text-cream/75">{PRODUCE.body}</p>
          </div>
          <div className="produce-basket w-full lg:col-span-5">
            <StaticPhoto
              src={basketImage}
              alt="Basket of fresh organic vegetables with soil still on roots"
              width={1024}
              height={1024}
              className="block h-64 w-full object-cover object-center blob shadow-warm lg:h-72"
            />
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCE.items.map((item, index) => (
            <div
              key={item.title}
              className="produce-card group rounded-3xl border border-cream/10 bg-cream/5 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:bg-cream/10"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="text-3xl">{item.emoji}</div>
              <h3 className="mt-4 font-display text-2xl text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream/70">{item.description}</p>
              <p className="mt-4 text-xs uppercase tracking-widest text-ochre">{item.stat}</p>
            </div>
          ))}
        </div>

        <div className="produce-cta mt-12">
          <a
            href="#join"
            className="inline-flex items-center rounded-full bg-ochre px-6 py-3 font-medium text-soil shadow-warm transition hover:bg-cream"
          >
            {PRODUCE.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
