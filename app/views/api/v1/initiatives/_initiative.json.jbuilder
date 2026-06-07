json.extract! initiative, :id, :title, :description
json.images initiative.images.map { |img| rails_blob_url(img) }
json.overlay_image initiative.overlay_image.attached? ? rails_blob_url(initiative.overlay_image) : nil
