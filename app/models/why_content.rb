class WhyContent < ApplicationRecord
  include SingletonRecord

  has_many :why_values, -> { order(:position) }, dependent: :destroy, inverse_of: :why_content

  accepts_nested_attributes_for :why_values, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at headline id label updated_at]
  end
end
