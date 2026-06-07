json.stories do
  json.label stories.label
  json.headline do
    json.part1 stories.headline_part1
    json.part2 stories.headline_part2
  end
  json.body stories.body
  json.testimonials stories.story_testimonials do |testimonial|
    json.quote testimonial.quote
    json.author testimonial.author
    json.location testimonial.location
  end
end
