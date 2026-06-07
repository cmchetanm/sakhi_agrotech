# frozen_string_literal: true

module HomepageDefaults
  module_function

  def seed!
    seed_site_setting!
    seed_hero!
    seed_why!
    seed_journey!
    seed_produce!
    seed_research!
    seed_stories!
    seed_team!
    seed_join!
    seed_team_members!
  end

  def seed_site_setting!
    setting = SiteSetting.instance
    return if setting.site_name.present?

    setting.update!(
      site_name: "Sakhi Agrotech Pvt. Ltd.",
      tagline: "Rooted in Nature. Driven by Innovation.",
      contact_email: "hello@sakhiagrotech.in",
      footer_tagline: "Rooted in Nature.",
      footer_tagline_highlight: "Driven by Innovation.",
      footer_description: "Organic, farm-to-fork, family-run. Kota, Rajasthan — and growing.",
      footer_contact_location: "Kota, Rajasthan, India",
      footer_copyright: "© 2026 Sakhi Agrotech. All seeds saved.",
      footer_made_in: "Made with care in Kota.",
      footer_instagram_url: "https://instagram.com/sakhiagrotech",
      footer_linkedin_url: "https://linkedin.com/company/sakhiagrotech"
    )
  end

  def seed_hero!
    hero = HeroContent.instance
    return if hero.eyebrow.present?

    hero.update!(
      eyebrow: "Kota, Rajasthan · Family-grown since day one",
      headline_before: "Fresh from our fields ",
      headline_highlight: "to your table",
      headline_after: ".",
      body: "Reconnecting families with real food, real health, real sustainability — grown without chemicals, harvested with care, delivered in hours.",
      cta_primary: "Join Our Community",
      cta_secondary: "Learn Our Story",
      quote_text: "Tastes like the tomatoes my grandmother grew.",
      quote_attribution: "— A Kota family, season 3"
    )
    seed_children(hero, :hero_stats, [
      { position: 0, value: 200, suffix: "+", label: "families fed" },
      { position: 1, value: 10, suffix: " acres", label: "regenerating" },
      { position: 2, value: 0, suffix: "", label: "chemicals used" }
    ])
  end

  def seed_why!
    why = WhyContent.instance
    return if why.label.present?

    why.update!(
      label: "Why Sakhi",
      headline: "Trust, grown in the open.",
      body: "We don't just sell vegetables. We're rebuilding the link between the people who grow food and the families who eat it."
    )
    seed_children(why, :why_values, [
      { position: 0, title: "Chemical-free, always", description: "No synthetic pesticides, no shortcuts. Just patient, organic care for every seed we plant.", default_icon_key: "valueSprout" },
      { position: 1, title: "Farm to home in hours", description: "Harvested at dawn, on your table by evening. Freshness you can taste, not just read about.", default_icon_key: "valueSun" },
      { position: 2, title: "Transparent practices", description: "Research-backed methods, open conversations. Visit anytime — our gates are always open.", default_icon_key: "valueSearch" },
      { position: 3, title: "A community, not a customer base", description: "200+ families who eat what we grow, and grow what we eat. We're in this together.", default_icon_key: "valueCommunity" },
      { position: 4, title: "Soil that gets richer each season", description: "Multi-layer farming, cover crops, compost. We leave the land better than we found it.", default_icon_key: "valueSoil" },
      { position: 5, title: "Real people, real work", description: "Family-run, locally hired, fairly paid. Every basket carries a story.", default_icon_key: "valueHeart" }
    ])
  end

  def seed_journey!
    journey = JourneyContent.instance
    return if journey.label.present?

    journey.update!(
      label: "Our Journey",
      headline_before: "What we're ",
      headline_highlight: "building",
      headline_after: ", season by season.",
      body: "Sakhi began with a simple question: what would it take to feed our own families food we'd be proud to serve? The answer became a farm, a community, and a quiet promise to the soil beneath our feet."
    )
    seed_children(journey, :journey_milestones, [
      { position: 0, label: "Today", title: "10 acres under organic care", description: "Active beds, fruit trees, and regenerative cover crops across our home farm in Kota." },
      { position: 1, label: "Season", title: "4,000+ kg per vegetable", description: "Three growing seasons a year, with 200 kg of fruit and a steadily widening basket." },
      { position: 2, label: "Soon", title: "Expansion to 25 acres", description: "More land, more soil to heal, more families to feed — without changing how carefully we farm." },
      { position: 3, label: "Year 3", title: "10+ tons of fruit annually", description: "Mango, guava, citrus and seasonal favorites, grown in multi-layer harmony with vegetables and herbs." }
    ])
  end

  def seed_produce!
    produce = ProduceContent.instance
    return if produce.label.present?

    produce.update!(
      label: "In the Basket Right Now",
      headline: "What's growing this season.",
      body: "Our basket changes with the soil and the sun. Here's what we're harvesting, packing, and sending home with families this week.",
      cta: "Order this week's basket →"
    )
    seed_children(produce, :produce_items, [
      { position: 0, title: "Heirloom Tomatoes", description: "Sun-ripened, sweet-acid balance", stat: "4,200 kg / season", default_icon_key: "produceTomato" },
      { position: 1, title: "Leafy Greens", description: "Spinach, methi, amaranth — picked at dawn", stat: "3,800 kg / season", default_icon_key: "produceGreens" },
      { position: 2, title: "Root Vegetables", description: "Carrots, radish, beetroot, sweet potato", stat: "4,000 kg / season", default_icon_key: "produceRoot" },
      { position: 3, title: "Seasonal Fruits", description: "Guava, papaya, citrus — orchard-fresh", stat: "200 kg, growing fast", default_icon_key: "produceFruit" },
      { position: 4, title: "Heritage Grains", description: "Bajra, jowar, indigenous wheats", stat: "Trial harvests this season", default_icon_key: "produceGrain" },
      { position: 5, title: "Herbs & Aromatics", description: "Tulsi, mint, coriander, lemongrass", stat: "Fresh-cut weekly", default_icon_key: "produceHerb" }
    ])
  end

  def seed_research!
    research = ResearchContent.instance
    return if research.label.present?

    research.update!(
      label: "Our Research",
      headline: "A farm built like a forest.",
      body: "We practice multi-layer farming — five layers of life sharing one piece of land. It mimics how nature actually grows food: more biodiversity, less water, healthier soil every year.",
      layers_title: "The five layers we tend"
    )
    seed_children(research, :research_stats, [
      { position: 0, value: "40%", label: "less water" },
      { position: 1, value: "3×", label: "biodiversity" },
      { position: 2, value: "+18%", label: "organic matter" }
    ])
    seed_children(research, :research_layers, [
      { position: 0, num: 1, color: "leaf", title: "Canopy", description: "Fruit trees — mango, guava, citrus — providing shade and long-term yield." },
      { position: 1, num: 2, color: "vibrant", title: "Mid-layer", description: "Climbing vegetables and pulses, supported by trellises and tree trunks." },
      { position: 2, num: 3, color: "ochre", title: "Shrub layer", description: "Tomatoes, brinjal, peppers — the workhorses of every weekly basket." },
      { position: 3, num: 4, color: "terracotta", title: "Ground", description: "Leafy greens and herbs that retain moisture and shade the soil." },
      { position: 4, num: 5, color: "soil", title: "Roots", description: "Carrots, radish, sweet potato — and beneath them, the living soil web." }
    ])
    seed_children(research, :research_articles, [
      { position: 0, tag: "Soil Health 101", title: "Why we test our soil every season", read_time: "5 min read" },
      { position: 1, tag: "Seasonal Eating", title: "What to cook with this week's basket", read_time: "4 min read" },
      { position: 2, tag: "From the Field", title: "Breaking the chemical cycle, one acre at a time", read_time: "7 min read" }
    ])
  end

  def seed_stories!
    stories = StoriesContent.instance
    return if stories.label.present?

    stories.update!(
      label: "Stories from our table",
      headline_part1: "200+ families.",
      headline_part2: "More stories every week.",
      body: "We're gathering quotes, photos, and recipes from the families who eat with us. Here's a taste of what they're telling us — full stories coming soon."
    )
    seed_children(stories, :story_testimonials, [
      { position: 0, quote: "My kids actually ask for vegetables now. That used to be a battle.", author: "Meera", location: "Vigyan Nagar" },
      { position: 1, quote: "The freshness is unreal. The spinach is still cool from the morning.", author: "Anil", location: "Talwandi" },
      { position: 2, quote: "I trust them with what I feed my parents. That's the highest compliment I have.", author: "Pooja", location: "Mahaveer Nagar" }
    ])
  end

  def seed_team!
    team = TeamContent.instance
    return if team.label.present?

    team.update!(
      label: "The Hands Behind Sakhi",
      headline: "A small team, a long view.",
      body: "Family-run at the core, with advisors and field hands who share our patience with the soil."
    )
  end

  def seed_join!
    join = JoinContent.instance
    return if join.label.present?

    join.update!(
      label: "Join Our Circle",
      headline_before: "We're building something ",
      headline_highlight: "special",
      headline_after: ".",
      body: "Whether you're a Kota family, a kitchen in another city, or a business curious about bulk orders — express interest and we'll personally reach out.",
      form_title: "Tell us a little about you",
      submit_label: "Send my interest",
      success_message: "Our team reads every note personally — usually within a couple of days.",
      action1_title: "Existing community?",
      action1_subtitle: "Order this week's basket on WhatsApp",
      action1_link_label: "Chat →",
      action2_title: "Bulk or business order?",
      action2_subtitle: "Talk to us directly",
      action2_link_label: "Email →",
      action2_href: "mailto:hello@sakhiagrotech.in"
    )
    seed_children(join, :join_interests, [
      { position: 0, label: "Weekly family basket" },
      { position: 1, label: "Bulk / business orders" },
      { position: 2, label: "Visiting the farm" },
      { position: 3, label: "Something else" }
    ])
  end

  def seed_team_members!
    return if TeamMember.exists?

    [
      { position: 0, name: "Dr. Pallavi Sharma", designation: "Founder & Agro Consultant", description: "Leads our organic practice and research, with two decades of work in regenerative agriculture." },
      { position: 1, name: "Director — Operations", designation: "Land, labor & logistics", description: nil },
      { position: 2, name: "Director — Community", designation: "Families, orders & feedback", description: nil },
      { position: 3, name: "Key Advisors", designation: "Soil science, multi-layer farming, food safety", description: nil }
    ].each { |attrs| TeamMember.create!(attrs) }
  end

  def seed_children(parent, association, rows)
    return if parent.public_send(association).exists?

    rows.each do |attrs|
      parent.public_send(association).create!(attrs)
    end
  end
end
