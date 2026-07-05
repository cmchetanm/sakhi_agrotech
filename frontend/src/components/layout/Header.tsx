"use client";

import { useRef, useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { NAV_SECTIONS } from "@/lib/constants";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { bindButtonHover, bindNavLinkHover } from "@/lib/animations/hoverEffects";
import { DEV_MARKERS } from "@/lib/animations/presets";
import { prefersReducedMotion } from "@/lib/animations/timelines";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll();

  function scrollToSection(id: string) {
    if (scrollTo) {
      scrollTo(id, { offset: -72 });
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        onEnter: () => {
          ref.current?.classList.add("site-header--scrolled");
          innerRef.current?.classList.add("site-header__inner--compact");
        },
        onLeaveBack: () => {
          ref.current?.classList.remove("site-header--scrolled");
          innerRef.current?.classList.remove("site-header__inner--compact");
        },
        markers: DEV_MARKERS,
      });

      const cleanupNav = bindNavLinkHover(ref.current?.querySelectorAll(".nav-link") ?? null);
      const cleanupCta = bindButtonHover(ref.current?.querySelectorAll(".header-cta") ?? null);

      return () => {
        cleanupNav();
        cleanupCta();
      };
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="site-header sticky top-0 z-50 border-b border-border/60 bg-cream/80 backdrop-blur-md transition-[background-color] duration-300 ease-out"
    >
      <div ref={innerRef} className="site-header__inner mx-auto flex max-w-7xl items-center justify-between px-5 py-4 transition-[padding] duration-300 ease-out sm:px-8">
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          className="group flex items-center gap-2"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gradient-leaf font-display text-lg text-cream shadow-soft">
            स
          </span>
          <span className="font-display text-xl leading-tight text-soil">
            Sakhi <span className="text-leaf">Agrotech</span>
          </span>
        </button>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_SECTIONS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              className="nav-link relative text-sm text-foreground/75 transition-colors hover:text-leaf"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => scrollToSection("join")}
          className="header-cta hidden items-center rounded-full bg-leaf px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-colors hover:bg-vibrant md:inline-flex"
        >
          Join Our Circle
        </button>

        <button
          type="button"
          className="p-2 text-soil md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            ) : (
              <>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-cream md:hidden">
          <div className="flex flex-col gap-3 px-5 py-4">
            {NAV_SECTIONS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  scrollToSection(link.id);
                  setOpen(false);
                }}
                className="py-1 text-left text-base text-foreground/80"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                scrollToSection("join");
                setOpen(false);
              }}
              className="mt-2 inline-flex justify-center rounded-full bg-leaf px-5 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Join Our Circle
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
