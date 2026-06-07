class TeamMember < ApplicationRecord
  has_one_attached :photo

  scope :ordered, -> { order(:position, :id) }

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at description designation id name position updated_at]
  end
end
