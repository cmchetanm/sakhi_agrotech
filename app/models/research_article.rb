class ResearchArticle < ApplicationRecord
  belongs_to :research_content

  validates :title, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id position read_time research_content_id tag title updated_at]
  end
end
