class Project < ApplicationRecord
  has_many_attached :project_images
  def self.ransackable_associations(auth_object = nil)
    ["project_images_attachments", "project_images_blobs"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "location", "title", "updated_at"]
  end
end
