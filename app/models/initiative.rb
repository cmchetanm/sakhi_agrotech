class Initiative < ApplicationRecord
  has_many_attached :images
  has_one_attached :overlay_image

  def self.ransackable_associations(auth_object = nil)
    ["images_attachments", "images_blobs"]
  end
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "description", "id", "title", "updated_at"]
  end
end
