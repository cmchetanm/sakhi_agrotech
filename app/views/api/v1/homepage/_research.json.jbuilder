json.research do
  json.label research.label
  json.headline research.headline
  json.body research.body
  json.layers_title research.layers_title
  json.image research.photo.attached? ? rails_blob_url(research.photo) : nil
  json.stats research.research_stats do |stat|
    json.value stat.value
    json.label stat.label
  end
  json.layers research.research_layers do |layer|
    json.num layer.num
    json.color layer.color
    json.title layer.title
    json.description layer.description
  end
  json.articles research.research_articles do |article|
    json.tag article.tag
    json.title article.title
    json.read article.read_time
  end
end
