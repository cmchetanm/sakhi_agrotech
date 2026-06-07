class ResearchStat < ApplicationRecord
  belongs_to :research_content

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id label position research_content_id updated_at value]
  end
end
