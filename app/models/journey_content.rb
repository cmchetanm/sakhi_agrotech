class JourneyContent < ApplicationRecord
  include SingletonRecord

  has_many :journey_milestones, -> { order(:position) }, dependent: :destroy, inverse_of: :journey_content
  has_one_attached :side_image

  accepts_nested_attributes_for :journey_milestones, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at headline_after headline_before headline_highlight id label updated_at]
  end
end
