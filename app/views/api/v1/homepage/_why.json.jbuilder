json.why do
  json.label why.label
  json.headline why.headline
  json.body why.body
  json.values why.why_values do |value|
    json.title value.title
    json.description value.description
    json.default_icon_key value.default_icon_key
    json.icon value.icon.attached? ? rails_blob_url(value.icon) : nil
  end
end
