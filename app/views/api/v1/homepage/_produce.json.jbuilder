json.produce do
  json.label produce.label
  json.headline produce.headline
  json.body produce.body
  json.cta produce.cta
  json.basket_image produce.basket_image.attached? ? rails_blob_url(produce.basket_image) : nil
  json.items produce.produce_items do |item|
    json.title item.title
    json.description item.description
    json.stat item.stat
    json.default_icon_key item.default_icon_key
    json.icon item.icon.attached? ? rails_blob_url(item.icon) : nil
  end
end
