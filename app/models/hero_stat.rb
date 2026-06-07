class HeroStat < ApplicationRecord
  belongs_to :hero_content

  validates :label, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at hero_content_id id label position suffix updated_at value]
  end
end
