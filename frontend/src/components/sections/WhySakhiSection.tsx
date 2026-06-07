import { WHY_SAKHI } from "@/content/site";

export default function WhySakhiSection() {
  return (
    <section id="why" className="relative overflow-hidden bg-gradient-warm pt-24 pb-40 md:pt-32 md:pb-48">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="reveal max-w-2xl">
          <span className="text-label">{WHY_SAKHI.label}</span>
          <h2 className="mt-3 font-display text-4xl text-soil sm:text-5xl">{WHY_SAKHI.headline}</h2>
          <p className="mt-5 text-lg text-foreground/75">{WHY_SAKHI.body}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_SAKHI.values.map((value, index) => (
            <article
              key={value.title}
              className="reveal group relative rounded-3xl border border-border/60 bg-card p-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-warm"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-leaf/10 text-2xl transition-colors group-hover:bg-leaf/20">
                {value.emoji}
              </div>
              <h3 className="mt-5 font-display text-xl text-soil">{value.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/70">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
