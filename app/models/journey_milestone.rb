class JourneyMilestone < ApplicationRecord
  belongs_to :journey_content

  validates :title, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at description id journey_content_id label position title updated_at]
  end
end
