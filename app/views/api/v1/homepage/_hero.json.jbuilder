json.hero do
  json.eyebrow hero.eyebrow
  json.headline do
    json.before hero.headline_before
    json.highlight hero.headline_highlight
    json.after hero.headline_after
  end
  json.body hero.body
  json.cta_primary hero.cta_primary
  json.cta_secondary hero.cta_secondary
  json.quote do
    json.text hero.quote_text
    json.attribution hero.quote_attribution
  end
  json.image hero.hero_image.attached? ? rails_blob_url(hero.hero_image) : nil
  json.stats hero.hero_stats do |stat|
    json.value stat.value
    json.suffix stat.suffix
    json.label stat.label
  end
end
