class JoinInterest < ApplicationRecord
  belongs_to :join_content

  validates :label, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at id join_content_id label position updated_at]
  end
end
