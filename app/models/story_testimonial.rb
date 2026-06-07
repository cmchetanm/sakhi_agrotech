class StoryTestimonial < ApplicationRecord
  belongs_to :stories_content

  validates :quote, presence: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[author created_at id location position quote stories_content_id updated_at]
  end
end
