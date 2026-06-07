class ResearchLayer < ApplicationRecord
  belongs_to :research_content

  validates :title, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[color created_at description id num position research_content_id title updated_at]
  end
end
