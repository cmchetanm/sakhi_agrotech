# app/models/carousel_image.rb
class CarouselImage < ApplicationRecord
  has_one_attached :image
  validates :title, presence: true
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "id", "image", "title", "updated_at"]
  end
end
