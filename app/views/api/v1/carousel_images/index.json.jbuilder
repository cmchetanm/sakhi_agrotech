json.array! @carousel_images do |carousel_image|
  json.extract! carousel_image, :id, :title
  json.image carousel_image.image.attached? ? rails_blob_url(carousel_image.image) : nil
end
