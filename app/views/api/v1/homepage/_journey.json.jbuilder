json.journey do
  json.label journey.label
  json.headline do
    json.before journey.headline_before
    json.highlight journey.headline_highlight
    json.after journey.headline_after
  end
  json.body journey.body
  json.image journey.side_image.attached? ? rails_blob_url(journey.side_image) : nil
  json.milestones journey.journey_milestones do |milestone|
    json.label milestone.label
    json.title milestone.title
    json.description milestone.description
  end
end
