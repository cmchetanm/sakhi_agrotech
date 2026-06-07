class WhyValue < ApplicationRecord
  belongs_to :why_content

  has_one_attached :icon

  validates :title, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at default_icon_key description id position title updated_at why_content_id]
  end
end
