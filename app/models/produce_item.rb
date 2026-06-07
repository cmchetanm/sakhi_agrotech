class ProduceItem < ApplicationRecord
  belongs_to :produce_content

  has_one_attached :icon

  validates :title, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[created_at default_icon_key description id position produce_content_id stat title updated_at]
  end
end
