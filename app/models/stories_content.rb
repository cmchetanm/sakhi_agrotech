class StoriesContent < ApplicationRecord
  include SingletonRecord

  has_many :story_testimonials, -> { order(:position) }, dependent: :destroy, inverse_of: :stories_content

  accepts_nested_attributes_for :story_testimonials, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at headline_part1 headline_part2 id label updated_at]
  end
end
