class HeroContent < ApplicationRecord
  include SingletonRecord

  has_many :hero_stats, -> { order(:position) }, dependent: :destroy, inverse_of: :hero_content
  has_one_attached :hero_image

  accepts_nested_attributes_for :hero_stats, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at cta_primary cta_secondary eyebrow headline_after headline_before headline_highlight id quote_attribution quote_text updated_at]
  end
end
