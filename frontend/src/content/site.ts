export const NAV_SECTIONS = [
  { id: "why", label: "Why Sakhi" },
  { id: "journey", label: "Journey" },
  { id: "produce", label: "Produce" },
  { id: "research", label: "Research" },
  { id: "stories", label: "Stories" },
  { id: "team", label: "Team" },
  { id: "join", label: "Join" },
] as const;

export const HERO = {
  eyebrow: "Kota, Rajasthan · Family-grown since day one",
  headline: {
    before: "Fresh from our fields ",
    highlight: "to your table",
    after: ".",
  },
  body: "Reconnecting families with real food, real health, real sustainability — grown without chemicals, harvested with care, delivered in hours.",
  ctaPrimary: "Join Our Community",
  ctaSecondary: "Learn Our Story",
  stats: [
    { value: 200, suffix: "+", label: "families fed" },
    { value: 10, suffix: " acres", label: "regenerating" },
    { value: 0, suffix: "", label: "chemicals used" },
  ],
  quote: {
    text: "Tastes like the tomatoes my grandmother grew.",
    attribution: "— A Kota family, season 3",
  },
};

export const WHY_SAKHI = {
  label: "Why Sakhi",
  headline: "Trust, grown in the open.",
  body: "We don't just sell vegetables. We're rebuilding the link between the people who grow food and the families who eat it.",
  values: [
    {
      emoji: "🌱",
      title: "Chemical-free, always",
      description: "No synthetic pesticides, no shortcuts. Just patient, organic care for every seed we plant.",
    },
    {
      emoji: "🌅",
      title: "Farm to home in hours",
      description: "Harvested at dawn, on your table by evening. Freshness you can taste, not just read about.",
    },
    {
      emoji: "🔍",
      title: "Transparent practices",
      description: "Research-backed methods, open conversations. Visit anytime — our gates are always open.",
    },
    {
      emoji: "🤝",
      title: "A community, not a customer base",
      description: "200+ families who eat what we grow, and grow what we eat. We're in this together.",
    },
    {
      emoji: "🌾",
      title: "Soil that gets richer each season",
      description: "Multi-layer farming, cover crops, compost. We leave the land better than we found it.",
    },
    {
      emoji: "❤️",
      title: "Real people, real work",
      description: "Family-run, locally hired, fairly paid. Every basket carries a story.",
    },
  ],
};

export const JOURNEY = {
  label: "Our Journey",
  headline: {
    before: "What we're ",
    highlight: "building",
    after: ", season by season.",
  },
  body: "Sakhi began with a simple question: what would it take to feed our own families food we'd be proud to serve? The answer became a farm, a community, and a quiet promise to the soil beneath our feet.",
  milestones: [
    {
      label: "Today",
      title: "10 acres under organic care",
      description: "Active beds, fruit trees, and regenerative cover crops across our home farm in Kota.",
    },
    {
      label: "Season",
      title: "4,000+ kg per vegetable",
      description: "Three growing seasons a year, with 200 kg of fruit and a steadily widening basket.",
    },
    {
      label: "Soon",
      title: "Expansion to 25 acres",
      description: "More land, more soil to heal, more families to feed — without changing how carefully we farm.",
    },
    {
      label: "Year 3",
      title: "10+ tons of fruit annually",
      description: "Mango, guava, citrus and seasonal favorites, grown in multi-layer harmony with vegetables and herbs.",
    },
  ],
};

export const PRODUCE = {
  label: "In the Basket Right Now",
  headline: "What's growing this season.",
  body: "Our basket changes with the soil and the sun. Here's what we're harvesting, packing, and sending home with families this week.",
  items: [
    { emoji: "🍅", title: "Heirloom Tomatoes", description: "Sun-ripened, sweet-acid balance", stat: "4,200 kg / season" },
    { emoji: "🥬", title: "Leafy Greens", description: "Spinach, methi, amaranth — picked at dawn", stat: "3,800 kg / season" },
    { emoji: "🥕", title: "Root Vegetables", description: "Carrots, radish, beetroot, sweet potato", stat: "4,000 kg / season" },
    { emoji: "🍋", title: "Seasonal Fruits", description: "Guava, papaya, citrus — orchard-fresh", stat: "200 kg, growing fast" },
    { emoji: "🌾", title: "Heritage Grains", description: "Bajra, jowar, indigenous wheats", stat: "Trial harvests this season" },
    { emoji: "🌿", title: "Herbs & Aromatics", description: "Tulsi, mint, coriander, lemongrass", stat: "Fresh-cut weekly" },
  ],
  cta: "Order this week's basket →",
};

export const RESEARCH = {
  label: "Our Research",
  headline: "A farm built like a forest.",
  body: "We practice multi-layer farming — five layers of life sharing one piece of land. It mimics how nature actually grows food: more biodiversity, less water, healthier soil every year.",
  stats: [
    { value: "40%", label: "less water" },
    { value: "3×", label: "biodiversity" },
    { value: "+18%", label: "organic matter" },
  ],
  layersTitle: "The five layers we tend",
  layers: [
    { num: 1, color: "leaf", title: "Canopy", description: "Fruit trees — mango, guava, citrus — providing shade and long-term yield." },
    { num: 2, color: "vibrant", title: "Mid-layer", description: "Climbing vegetables and pulses, supported by trellises and tree trunks." },
    { num: 3, color: "ochre", title: "Shrub layer", description: "Tomatoes, brinjal, peppers — the workhorses of every weekly basket." },
    { num: 4, color: "terracotta", title: "Ground", description: "Leafy greens and herbs that retain moisture and shade the soil." },
    { num: 5, color: "soil", title: "Roots", description: "Carrots, radish, sweet potato — and beneath them, the living soil web." },
  ],
  articles: [
    { tag: "Soil Health 101", title: "Why we test our soil every season", read: "5 min read" },
    { tag: "Seasonal Eating", title: "What to cook with this week's basket", read: "4 min read" },
    { tag: "From the Field", title: "Breaking the chemical cycle, one acre at a time", read: "7 min read" },
  ],
};

export const STORIES = {
  label: "Stories from our table",
  headline: {
    part1: "200+ families.",
    part2: "More stories every week.",
  },
  body: "We're gathering quotes, photos, and recipes from the families who eat with us. Here's a taste of what they're telling us — full stories coming soon.",
  testimonials: [
    { quote: "My kids actually ask for vegetables now. That used to be a battle.", author: "Meera", location: "Vigyan Nagar" },
    { quote: "The freshness is unreal. The spinach is still cool from the morning.", author: "Anil", location: "Talwandi" },
    { quote: "I trust them with what I feed my parents. That's the highest compliment I have.", author: "Pooja", location: "Mahaveer Nagar" },
  ],
};

export const TEAM = {
  label: "The Hands Behind Sakhi",
  headline: "A small team, a long view.",
  body: "Family-run at the core, with advisors and field hands who share our patience with the soil.",
};

export const STATIC_TEAM = [
  {
    id: 1,
    name: "Dr. Pallavi Sharma",
    designation: "Founder & Agro Consultant",
    description: "Leads our organic practice and research, with two decades of work in regenerative agriculture.",
    photo: null as string | null,
  },
  {
    id: 2,
    name: "Director — Operations",
    designation: "Land, labor & logistics",
    description: null as string | null,
    photo: null,
  },
  {
    id: 3,
    name: "Director — Community",
    designation: "Families, orders & feedback",
    description: null,
    photo: null,
  },
  {
    id: 4,
    name: "Key Advisors",
    designation: "Soil science, multi-layer farming, food safety",
    description: null,
    photo: null,
  },
];

export const JOIN = {
  label: "Join Our Circle",
  headline: {
    before: "We're building something ",
    highlight: "special",
    after: ".",
  },
  body: "Whether you're a Kota family, a kitchen in another city, or a business curious about bulk orders — express interest and we'll personally reach out.",
  actions: [
    {
      title: "Existing community?",
      subtitle: "Order this week's basket on WhatsApp",
      link: "Chat →",
      href: "#",
    },
    {
      title: "Bulk or business order?",
      subtitle: "Talk to us directly",
      link: "Email →",
      href: "mailto:hello@sakhiagrotech.in",
    },
  ],
  interests: [
    "Weekly family basket",
    "Bulk / business orders",
    "Visiting the farm",
    "Something else",
  ],
  formTitle: "Tell us a little about you",
  submitLabel: "Send my interest",
  successMessage: "Our team reads every note personally — usually within a couple of days.",
};

export const FOOTER = {
  tagline: "Rooted in Nature.",
  taglineHighlight: "Driven by Innovation.",
  description: "Organic, farm-to-fork, family-run. Kota, Rajasthan — and growing.",
  explore: [
    { label: "Why Sakhi", href: "#why" },
    { label: "Our Journey", href: "#journey" },
    { label: "This Week's Produce", href: "#produce" },
    { label: "Research & Blog", href: "#research" },
    { label: "Join Our Circle", href: "#join" },
  ],
  contact: {
    location: "Kota, Rajasthan, India",
    email: "hello@sakhiagrotech.in",
  },
  copyright: "© 2026 Sakhi Agrotech. All seeds saved.",
  madeIn: "Made with care in Kota.",
  social: [
    { label: "Instagram", href: "https://instagram.com/sakhiagrotech" },
    { label: "LinkedIn", href: "https://linkedin.com/company/sakhiagrotech" },
  ],
};
