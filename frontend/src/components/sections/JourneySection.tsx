import { JOURNEY } from "@/content/site";
import { IMAGES } from "@/lib/assets";
import StaticPhoto from "@/components/ui/StaticPhoto";

export default function JourneySection() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="reveal lg:sticky lg:top-28 lg:col-span-5">
          <span className="text-label">{JOURNEY.label}</span>
          <h2 className="mt-3 font-display text-4xl text-soil sm:text-5xl">
            {JOURNEY.headline.before}
            <em className="not-italic text-leaf">{JOURNEY.headline.highlight}</em>
            {JOURNEY.headline.after}
          </h2>
          <p className="mt-5 text-foreground/75">{JOURNEY.body}</p>

          <div className="relative mt-8 hidden lg:block">
            <div className="absolute -inset-2 blob-2 bg-ochre/40" aria-hidden />
            <StaticPhoto
              src={IMAGES.journey}
              alt="Hands holding rich dark soil with a green seedling"
              width={1024}
              height={1024}
              className="relative block h-72 w-full object-cover blob-2 shadow-warm"
            />
          </div>
        </div>

        <ol className="relative space-y-10 border-l-2 border-dashed border-soil/25 pl-8 lg:col-span-7">
          {JOURNEY.milestones.map((m, index) => (
            <li
              key={m.label}
              className="reveal relative"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <span className="absolute -left-[2.6rem] top-1.5 h-5 w-5 rounded-full bg-leaf ring-4 ring-cream shadow-soft" />
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-vibrant">{m.label}</span>
              </div>
              <h3 className="mt-2 font-display text-2xl text-soil">{m.title}</h3>
              <p className="mt-2 text-foreground/75">{m.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
