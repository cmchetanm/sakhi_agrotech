json.extract! project, :id, :title, :location, :description
json.project_images project.project_images.map { |img| rails_blob_url(img) }
