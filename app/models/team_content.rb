class TeamContent < ApplicationRecord
  include SingletonRecord

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at headline id label updated_at]
  end
end
