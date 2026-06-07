import {
  FOOTER,
  HERO,
  JOIN,
  JOURNEY,
  PRODUCE,
  RESEARCH,
  STORIES,
  STATIC_TEAM,
  TEAM,
  WHY_SAKHI,
} from "@/content/site";
import { ICONS, IMAGES } from "@/lib/assets";
import { normalizeMediaUrl, preferStaticImage } from "@/lib/media";
import type { HomepageApiResponse, IconKey, MergedHomepageContent } from "@/types/api";

function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function pickString(value: string | null | undefined, fallback: string): string {
  return isPresent(value) ? String(value).trim() : fallback;
}

function pickImage(url: string | null | undefined, fallback: string): string {
  return preferStaticImage(normalizeMediaUrl(url), fallback);
}

function pickIconSrc(
  uploaded: string | null | undefined,
  iconKey: string | null | undefined,
  fallbackKey: IconKey
): string {
  const normalized = normalizeMediaUrl(uploaded);
  if (normalized && !normalized.includes("/rails/active_storage")) {
    return normalized;
  }

  const key = (isPresent(iconKey) ? iconKey : fallbackKey) as IconKey;
  return ICONS[key] ?? ICONS[fallbackKey];
}

function pickList<T>(apiList: T[] | undefined | null, fallback: T[]): T[] {
  return apiList && apiList.length > 0 ? apiList : fallback;
}

export function mergeHomepageContent(api?: HomepageApiResponse | null): MergedHomepageContent {
  const heroStats = pickList(
    api?.hero?.stats?.map((stat, index) => ({
      value: stat.value ?? HERO.stats[index]?.value ?? 0,
      suffix: pickString(stat.suffix, HERO.stats[index]?.suffix ?? ""),
      label: pickString(stat.label, HERO.stats[index]?.label ?? ""),
    })),
    HERO.stats
  );

  const whyValues = pickList(
    api?.why?.values?.map((value, index) => {
      const fallback = WHY_SAKHI.values[index];
      const fallbackKeys: IconKey[] = [
        "valueSprout",
        "valueSun",
        "valueSearch",
        "valueCommunity",
        "valueSoil",
        "valueHeart",
      ];
      return {
        title: pickString(value.title, fallback?.title ?? ""),
        description: pickString(value.description, fallback?.description ?? ""),
        iconSrc: pickIconSrc(value.icon, value.default_icon_key, fallbackKeys[index] ?? "valueSprout"),
        emoji: fallback?.emoji,
      };
    }),
    WHY_SAKHI.values.map((value, index) => ({
      title: value.title,
      description: value.description,
      iconSrc: pickIconSrc(null, null, (["valueSprout", "valueSun", "valueSearch", "valueCommunity", "valueSoil", "valueHeart"] as IconKey[])[index] ?? "valueSprout"),
      emoji: value.emoji,
    }))
  );

  const produceItems = pickList(
    api?.produce?.items?.map((item, index) => {
      const fallback = PRODUCE.items[index];
      const fallbackKeys: IconKey[] = [
        "produceTomato",
        "produceGreens",
        "produceRoot",
        "produceFruit",
        "produceGrain",
        "produceHerb",
      ];
      return {
        title: pickString(item.title, fallback?.title ?? ""),
        description: pickString(item.description, fallback?.description ?? ""),
        stat: pickString(item.stat, fallback?.stat ?? ""),
        iconSrc: pickIconSrc(item.icon, item.default_icon_key, fallbackKeys[index] ?? "produceTomato"),
      };
    }),
    PRODUCE.items.map((item, index) => ({
      title: item.title,
      description: item.description,
      stat: item.stat,
      iconSrc: pickIconSrc(
        null,
        null,
        (["produceTomato", "produceGreens", "produceRoot", "produceFruit", "produceGrain", "produceHerb"] as IconKey[])[index] ?? "produceTomato"
      ),
    }))
  );

  const teamMembers =
    api?.team?.members && api.team.members.length > 0
      ? api.team.members.map((member) => ({
          id: member.id,
          name: member.name,
          designation: member.designation,
          description: member.description,
          photo: normalizeMediaUrl(member.photo),
        }))
      : STATIC_TEAM.map((member) => ({
          id: member.id,
          name: member.name,
          designation: member.designation,
          description: member.description ?? null,
          photo: member.photo,
        }));

  const joinActions = pickList(
    api?.join?.actions?.map((action, index) => ({
      title: pickString(action.title, JOIN.actions[index]?.title ?? ""),
      subtitle: pickString(action.subtitle, JOIN.actions[index]?.subtitle ?? ""),
      link: pickString(action.link, JOIN.actions[index]?.link ?? ""),
      href: pickString(action.href, JOIN.actions[index]?.href ?? "#"),
    })),
    JOIN.actions
  );

  return {
    hero: {
      eyebrow: pickString(api?.hero?.eyebrow, HERO.eyebrow),
      headline: {
        before: pickString(api?.hero?.headline?.before, HERO.headline.before),
        highlight: pickString(api?.hero?.headline?.highlight, HERO.headline.highlight),
        after: pickString(api?.hero?.headline?.after, HERO.headline.after),
      },
      body: pickString(api?.hero?.body, HERO.body),
      ctaPrimary: pickString(api?.hero?.cta_primary, HERO.ctaPrimary),
      ctaSecondary: pickString(api?.hero?.cta_secondary, HERO.ctaSecondary),
      stats: heroStats,
      quote: {
        text: pickString(api?.hero?.quote?.text, HERO.quote.text),
        attribution: pickString(api?.hero?.quote?.attribution, HERO.quote.attribution),
      },
      image: pickImage(api?.hero?.image, IMAGES.hero),
    },
    why: {
      label: pickString(api?.why?.label, WHY_SAKHI.label),
      headline: pickString(api?.why?.headline, WHY_SAKHI.headline),
      body: pickString(api?.why?.body, WHY_SAKHI.body),
      values: whyValues,
    },
    journey: {
      label: pickString(api?.journey?.label, JOURNEY.label),
      headline: {
        before: pickString(api?.journey?.headline?.before, JOURNEY.headline.before),
        highlight: pickString(api?.journey?.headline?.highlight, JOURNEY.headline.highlight),
        after: pickString(api?.journey?.headline?.after, JOURNEY.headline.after),
      },
      body: pickString(api?.journey?.body, JOURNEY.body),
      milestones: pickList(
        api?.journey?.milestones?.map((milestone, index) => ({
          label: pickString(milestone.label, JOURNEY.milestones[index]?.label ?? ""),
          title: pickString(milestone.title, JOURNEY.milestones[index]?.title ?? ""),
          description: pickString(milestone.description, JOURNEY.milestones[index]?.description ?? ""),
        })),
        JOURNEY.milestones
      ),
      image: pickImage(api?.journey?.image, IMAGES.journey),
    },
    produce: {
      label: pickString(api?.produce?.label, PRODUCE.label),
      headline: pickString(api?.produce?.headline, PRODUCE.headline),
      body: pickString(api?.produce?.body, PRODUCE.body),
      cta: pickString(api?.produce?.cta, PRODUCE.cta),
      basketImage: pickImage(api?.produce?.basket_image, IMAGES.produceBasket),
      items: produceItems,
    },
    research: {
      label: pickString(api?.research?.label, RESEARCH.label),
      headline: pickString(api?.research?.headline, RESEARCH.headline),
      body: pickString(api?.research?.body, RESEARCH.body),
      layersTitle: pickString(api?.research?.layers_title, RESEARCH.layersTitle),
      image: pickImage(api?.research?.image, IMAGES.research),
      stats: pickList(
        api?.research?.stats?.map((stat, index) => ({
          value: pickString(stat.value, RESEARCH.stats[index]?.value ?? ""),
          label: pickString(stat.label, RESEARCH.stats[index]?.label ?? ""),
        })),
        RESEARCH.stats
      ),
      layers: pickList(
        api?.research?.layers?.map((layer, index) => ({
          num: layer.num ?? RESEARCH.layers[index]?.num ?? index + 1,
          color: pickString(layer.color, RESEARCH.layers[index]?.color ?? "leaf"),
          title: pickString(layer.title, RESEARCH.layers[index]?.title ?? ""),
          description: pickString(layer.description, RESEARCH.layers[index]?.description ?? ""),
        })),
        RESEARCH.layers
      ),
      articles: pickList(
        api?.research?.articles?.map((article, index) => ({
          tag: pickString(article.tag, RESEARCH.articles[index]?.tag ?? ""),
          title: pickString(article.title, RESEARCH.articles[index]?.title ?? ""),
          read: pickString(article.read, RESEARCH.articles[index]?.read ?? ""),
        })),
        RESEARCH.articles
      ),
    },
    stories: {
      label: pickString(api?.stories?.label, STORIES.label),
      headline: {
        part1: pickString(api?.stories?.headline?.part1, STORIES.headline.part1),
        part2: pickString(api?.stories?.headline?.part2, STORIES.headline.part2),
      },
      body: pickString(api?.stories?.body, STORIES.body),
      testimonials: pickList(
        api?.stories?.testimonials?.map((testimonial, index) => ({
          quote: pickString(testimonial.quote, STORIES.testimonials[index]?.quote ?? ""),
          author: pickString(testimonial.author, STORIES.testimonials[index]?.author ?? ""),
          location: pickString(testimonial.location, STORIES.testimonials[index]?.location ?? ""),
        })),
        STORIES.testimonials
      ),
    },
    team: {
      label: pickString(api?.team?.label, TEAM.label),
      headline: pickString(api?.team?.headline, TEAM.headline),
      body: pickString(api?.team?.body, TEAM.body),
      members: teamMembers,
    },
    join: {
      label: pickString(api?.join?.label, JOIN.label),
      headline: {
        before: pickString(api?.join?.headline?.before, JOIN.headline.before),
        highlight: pickString(api?.join?.headline?.highlight, JOIN.headline.highlight),
        after: pickString(api?.join?.headline?.after, JOIN.headline.after),
      },
      body: pickString(api?.join?.body, JOIN.body),
      formTitle: pickString(api?.join?.form_title, JOIN.formTitle),
      submitLabel: pickString(api?.join?.submit_label, JOIN.submitLabel),
      successMessage: pickString(api?.join?.success_message, JOIN.successMessage),
      actions: joinActions,
      interests: pickList(
        api?.join?.interests?.map((interest, index) => pickString(interest, JOIN.interests[index] ?? "")),
        JOIN.interests
      ),
    },
    footer: {
      tagline: pickString(api?.footer?.tagline, FOOTER.tagline),
      taglineHighlight: pickString(api?.footer?.tagline_highlight, FOOTER.taglineHighlight),
      description: pickString(api?.footer?.description, FOOTER.description),
      explore: FOOTER.explore,
      contact: {
        location: pickString(api?.footer?.contact?.location, FOOTER.contact.location),
        email: pickString(api?.footer?.contact?.email ?? api?.site?.contact_email, FOOTER.contact.email),
      },
      copyright: pickString(api?.footer?.copyright, FOOTER.copyright),
      madeIn: pickString(api?.footer?.made_in, FOOTER.madeIn),
      social: [
        {
          label: "Instagram",
          href: pickString(api?.footer?.social?.instagram, FOOTER.social[0]?.href ?? ""),
        },
        {
          label: "LinkedIn",
          href: pickString(api?.footer?.social?.linkedin, FOOTER.social[1]?.href ?? ""),
        },
      ],
    },
    site: {
      whatsapp_number: api?.site?.whatsapp_number ?? null,
      youtube_video_id: api?.site?.youtube_video_id ?? null,
      site_name: pickString(api?.site?.site_name, "Sakhi Agrotech Pvt. Ltd."),
      tagline: pickString(api?.site?.tagline, "Rooted in Nature. Driven by Innovation."),
      contact_email: pickString(api?.site?.contact_email, FOOTER.contact.email),
    },
  };
}
