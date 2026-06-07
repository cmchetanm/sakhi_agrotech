class ProduceContent < ApplicationRecord
  include SingletonRecord

  has_many :produce_items, -> { order(:position) }, dependent: :destroy, inverse_of: :produce_content
  has_one_attached :basket_image

  accepts_nested_attributes_for :produce_items, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at cta headline id label updated_at]
  end
end
