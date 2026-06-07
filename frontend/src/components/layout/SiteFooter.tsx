import Link from "next/link";
import { FOOTER } from "@/content/site";
import { SITE_NAME } from "@/lib/constants";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
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

export default function SiteFooter() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-soil text-cream">
      <div className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream font-display text-lg text-soil">
                स
              </span>
              <span className="font-display text-2xl">{SITE_NAME}</span>
            </div>
            <p className="mt-5 max-w-sm font-display text-xl leading-snug text-cream/90">
              {FOOTER.tagline}{" "}
              <em className="not-italic text-ochre">{FOOTER.taglineHighlight}</em>
            </p>
            <p className="mt-4 max-w-sm text-sm text-cream/70">{FOOTER.description}</p>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-display text-lg text-ochre">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              {FOOTER.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-cream">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-display text-lg text-ochre">Find us</h4>
            <ul className="mt-4 space-y-2 text-sm text-cream/80">
              <li>{FOOTER.contact.location}</li>
              <li>
                <a href={`mailto:${FOOTER.contact.email}`} className="hover:text-cream">
                  {FOOTER.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              {FOOTER.social.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 transition-colors hover:bg-cream/20"
                >
                  {link.label === "Instagram" ? <InstagramIcon /> : <LinkedInIcon />}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-cream/15 pt-6 text-xs text-cream/60 sm:flex-row">
          <p>{FOOTER.copyright}</p>
          <p>{FOOTER.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
