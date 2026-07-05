"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@/lib/gsap";
import { SITE_NAME, FARM_MAPS_URL } from "@/lib/constants";
import { IMAGES } from "@/lib/assets";
import { bindSocialHover } from "@/lib/animations/hoverEffects";
import { revealOnScroll } from "@/lib/animations/scrollReveal";
import type { MergedHomepageContent } from "@/types/api";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h4v1.7c.6-1 2-1.95 4-1.95 4 0 4.5 2.6 4.5 5.4V21h-4v-5.5c0-1.5-.5-2.5-2-2.5s-2.5 1-2.5 2.5V21h-4z" />
    </svg>
  );
}

interface SiteFooterProps {
  content: MergedHomepageContent["footer"];
}

export default function SiteFooter({ content }: SiteFooterProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mmReveal = revealOnScroll(ref.current, ".footer-block", {
        stagger: 0.1,
      });

      const cleanupSocial = bindSocialHover(ref.current?.querySelectorAll(".footer-social-link") ?? null);

      return () => {
        mmReveal.revert();
        cleanupSocial();
      };
    },
    { scope: ref }
  );

  return (
    <footer id="footer" ref={ref} className="relative overflow-hidden bg-soil text-cream">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div data-reveal className="footer-block md:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src={IMAGES.logo}
                alt={SITE_NAME}
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <span className="font-display text-2xl">{SITE_NAME}</span>
            </div>
            <p className="mt-5 max-w-sm font-display text-xl leading-snug text-cream/90">
              {content.tagline}
              {content.taglineHighlight ? (
                <>
                  {" "}
                  <em className="not-italic text-ochre">{content.taglineHighlight}</em>
                </>
              ) : null}
            </p>
            <p className="mt-4 max-w-sm text-sm text-cream/70">{content.description}</p>
          </div>

          <div data-reveal className="footer-block md:col-span-3">
            <h4 className="font-display text-lg text-ochre">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {content.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="footer-block md:col-span-4">
            <h4 className="font-display text-lg text-ochre">Find us</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>
                <a
                  href={content.contact.mapsUrl ?? FARM_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${content.contact.location} in Google Maps`}
                  className="group inline-flex max-w-sm cursor-pointer items-start gap-2.5 rounded-xl border border-cream/15 bg-cream/5 px-3 py-2.5 transition-colors hover:border-ochre/40 hover:bg-cream/10"
                >
                  <MapPinIcon className="mt-0.5 shrink-0 text-ochre" />
                  <span>
                    <span className="block leading-snug text-cream underline decoration-cream/30 underline-offset-2 transition-colors group-hover:text-white group-hover:decoration-ochre/60">
                      {content.contact.location}
                    </span>
                    <span className="mt-1 flex items-center gap-1 text-xs font-medium text-ochre transition-colors group-hover:text-ochre/90">
                      Open in Google Maps
                      <ExternalLinkIcon />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${content.contact.email}`} className="hover:text-cream">
                  {content.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {content.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  data-reveal
                  className="footer-social-link inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
                >
                  {link.label === "Instagram" ? <InstagramIcon /> : <LinkedInIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="footer-block mt-14 flex flex-col justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row"
        >
          <p>{content.copyright}</p>
          <p>{content.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
