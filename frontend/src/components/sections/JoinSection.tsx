"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { submitContact } from "@/lib/api";
import { bindButtonHover, bindCardHover } from "@/lib/animations/hoverEffects";
import { revealOnScroll, revealSectionIntro } from "@/lib/animations/scrollReveal";
import { REFRESH_PRIORITY } from "@/lib/animations/refreshPriority";
import { markRevealed } from "@/lib/animations/reveal";
import type { MergedHomepageContent } from "@/types/api";

interface JoinSectionProps {
  content: MergedHomepageContent["join"];
  whatsappNumber?: string | null;
}

function whatsappUrl(number: string | null | undefined) {
  const digits = number?.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

export default function JoinSection({ content, whatsappNumber }: JoinSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useGSAP(
    () => {
      const mmIntro = revealSectionIntro(
        ref.current,
        {
          label: ".join-label",
          headline: ".join-headline",
          body: ".join-body",
        },
        REFRESH_PRIORITY.join
      );

      const mmActions = revealOnScroll(ref.current, ".join-action", {
        stagger: 0.1,
      });

      const mmFields = revealOnScroll(ref.current, ".join-field", {
        start: "top 86%",
        stagger: 0.08,
      });

      const cleanupActions = bindCardHover(ref.current?.querySelectorAll(".join-action") ?? null, {
        lift: -3,
        scale: 1.01,
      });
      const cleanupSubmit = bindButtonHover(ref.current?.querySelectorAll(".join-submit") ?? null);

      return () => {
        mmIntro.revert();
        mmActions.revert();
        mmFields.revert();
        cleanupActions();
        cleanupSubmit();
      };
    },
    { scope: ref }
  );

  useGSAP(
    () => {
      if (status !== "success" || !successRef.current) return;
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,opacity",
          onComplete() {
            markRevealed(successRef.current!);
          },
        }
      );
    },
    { dependencies: [status] }
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const city = data.get("city") as string;
    const interest = data.get("interest") as string;
    const message = data.get("message") as string;

    const fullMessage = [
      city && `City: ${city}`,
      interest && `Interest: ${interest}`,
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await submitContact({ name, email, contact: phone, message: fullMessage });

    if (result.errors) {
      setStatus("error");
      setErrorMsg(result.errors.join(". "));
      return;
    }

    setStatus("success");
    form.reset();
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-cream px-4 py-3 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  const chatUrl = whatsappUrl(whatsappNumber);
  const joinActions = [
    ...(chatUrl
      ? [{ ...content.actions[0], href: chatUrl }]
      : content.actions[0]
        ? [content.actions[0]]
        : []),
    ...(content.actions[1] ? [content.actions[1]] : []),
  ];

  return (
    <section id="join" ref={ref} className="relative overflow-hidden bg-gradient-warm py-24 md:py-32">
      <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 blob bg-leaf/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="join-left lg:col-span-5">
          <span data-reveal className="join-label text-label">
            {content.label}
          </span>
          <h2 data-reveal className="join-headline mt-3 font-display text-4xl text-soil sm:text-5xl">
            {content.headline.before}
            <em className="not-italic text-leaf">{content.headline.highlight}</em>
            {content.headline.after}
          </h2>
          <p data-reveal className="join-body mt-5 text-foreground/75">
            {content.body}
          </p>

          <div className="mt-8 space-y-4">
            {joinActions.map((action) => (
              <a
                key={action.title}
                data-reveal
                href={action.href}
                target={action.href.startsWith("http") || action.href.startsWith("mailto") ? "_blank" : undefined}
                rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="join-action flex items-center justify-between gap-4 rounded-2xl border border-border/60 bg-card p-5 shadow-soft"
              >
                <div>
                  <p className="font-display text-lg text-soil">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                </div>
                <span className="shrink-0 font-medium text-vibrant">{action.link}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="join-form lg:col-span-7">
          {status === "success" ? (
            <div
              ref={successRef}
              className="rounded-3xl border border-border/60 bg-card p-7 text-center shadow-warm sm:p-9"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-leaf/15 text-3xl">
                🌿
              </div>
              <h3 className="mt-5 font-display text-2xl text-soil">Thank you. We&apos;ll be in touch.</h3>
              <p className="mt-3 text-foreground/70">{content.successMessage}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-border/60 bg-card p-7 shadow-warm sm:p-9"
            >
              <h3 className="font-display text-2xl text-soil">{content.formTitle}</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div data-reveal className="join-field">
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-soil">
                    Your name
                  </label>
                  <input id="name" name="name" required maxLength={200} className={inputClass} />
                </div>
                <div data-reveal className="join-field">
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-soil">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required maxLength={200} className={inputClass} />
                </div>
                <div data-reveal className="join-field">
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-soil">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" maxLength={200} className={inputClass} />
                </div>
                <div data-reveal className="join-field">
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-soil">
                    City
                  </label>
                  <input id="city" name="city" maxLength={200} className={inputClass} />
                </div>
                <div data-reveal className="join-field sm:col-span-2">
                  <label htmlFor="interest" className="mb-2 block text-sm font-medium text-soil">
                    I&apos;m interested in
                  </label>
                  <select id="interest" name="interest" defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Choose one
                    </option>
                    {content.interests.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
                <div data-reveal className="join-field sm:col-span-2">
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-soil">
                    Anything you&apos;d like us to know?{" "}
                    <span className="font-normal text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    maxLength={500}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>

              {status === "error" && <p className="mt-4 text-sm font-medium text-soil">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === "loading"}
                className="join-submit mt-7 inline-flex w-full items-center justify-center rounded-full bg-leaf px-7 py-3.5 font-medium text-primary-foreground shadow-warm transition-colors hover:bg-vibrant disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Sending…" : content.submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
