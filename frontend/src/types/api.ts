export interface HomepageApiResponse {
  site: {
    youtube_video_id: string | null;
    site_name: string | null;
    tagline: string | null;
    whatsapp_number: string | null;
    contact_email: string | null;
  };
  footer: {
    tagline: string | null;
    tagline_highlight: string | null;
    description: string | null;
    contact: {
      location: string | null;
      email: string | null;
    };
    copyright: string | null;
    made_in: string | null;
    social: {
      instagram: string | null;
      linkedin: string | null;
    };
  };
  hero: {
    eyebrow: string | null;
    headline: { before: string | null; highlight: string | null; after: string | null };
    body: string | null;
    cta_primary: string | null;
    cta_secondary: string | null;
    quote: { text: string | null; attribution: string | null };
    image: string | null;
    stats: Array<{ value: number | null; suffix: string | null; label: string | null }>;
  };
  why: {
    label: string | null;
    headline: string | null;
    body: string | null;
    values: Array<{
      title: string | null;
      description: string | null;
      default_icon_key: string | null;
      icon: string | null;
    }>;
  };
  journey: {
    label: string | null;
    headline: { before: string | null; highlight: string | null; after: string | null };
    body: string | null;
    image: string | null;
    milestones: Array<{ label: string | null; title: string | null; description: string | null }>;
  };
  produce: {
    label: string | null;
    headline: string | null;
    body: string | null;
    cta: string | null;
    basket_image: string | null;
    items: Array<{
      title: string | null;
      description: string | null;
      stat: string | null;
      default_icon_key: string | null;
      icon: string | null;
    }>;
  };
  research: {
    label: string | null;
    headline: string | null;
    body: string | null;
    layers_title: string | null;
    image: string | null;
    stats: Array<{ value: string | null; label: string | null }>;
    layers: Array<{ num: number | null; color: string | null; title: string | null; description: string | null }>;
    articles: Array<{ tag: string | null; title: string | null; read: string | null }>;
  };
  stories: {
    label: string | null;
    headline: { part1: string | null; part2: string | null };
    body: string | null;
    testimonials: Array<{ quote: string | null; author: string | null; location: string | null }>;
  };
  team: {
    label: string | null;
    headline: string | null;
    body: string | null;
    members: Array<{
      id: number;
      name: string;
      designation: string;
      description: string | null;
      photo: string | null;
    }>;
  };
  join: {
    label: string | null;
    headline: { before: string | null; highlight: string | null; after: string | null };
    body: string | null;
    form_title: string | null;
    submit_label: string | null;
    success_message: string | null;
    actions: Array<{ title: string | null; subtitle: string | null; link: string | null; href: string | null }>;
    interests: string[];
  };
}

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  contact: string;
  message: string;
}

export interface ContactSubmissionResponse {
  message?: string;
  errors?: string[];
}

export type IconKey =
  | "valueSprout"
  | "valueSun"
  | "valueSearch"
  | "valueCommunity"
  | "valueSoil"
  | "valueHeart"
  | "produceTomato"
  | "produceGreens"
  | "produceRoot"
  | "produceFruit"
  | "produceGrain"
  | "produceHerb";

export interface MergedIconItem {
  title: string;
  description: string;
  stat?: string;
  iconSrc: string;
}

export interface MergedTeamMember {
  id: number;
  name: string;
  designation: string;
  description: string | null;
  photo: string | null;
}

export interface MergedHomepageContent {
  hero: Omit<typeof import("@/content/site").HERO, never> & { image: string };
  why: Omit<typeof import("@/content/site").WHY_SAKHI, "values"> & {
    values: Array<{ title: string; description: string; iconSrc: string; emoji?: string }>;
  };
  journey: Omit<typeof import("@/content/site").JOURNEY, never> & { image: string };
  produce: Omit<typeof import("@/content/site").PRODUCE, "items"> & {
    basketImage: string;
    items: MergedIconItem[];
  };
  research: Omit<typeof import("@/content/site").RESEARCH, never> & { image: string };
  stories: typeof import("@/content/site").STORIES;
  team: Omit<typeof import("@/content/site").TEAM, "members"> & { members: MergedTeamMember[] };
  join: typeof import("@/content/site").JOIN;
  footer: typeof import("@/content/site").FOOTER;
  site: {
    whatsapp_number: string | null;
    youtube_video_id: string | null;
    site_name: string;
    tagline: string;
    contact_email: string;
  };
}
