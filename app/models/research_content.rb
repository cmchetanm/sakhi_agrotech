class ResearchContent < ApplicationRecord
  include SingletonRecord

  has_many :research_stats, -> { order(:position) }, dependent: :destroy, inverse_of: :research_content
  has_many :research_layers, -> { order(:position) }, dependent: :destroy, inverse_of: :research_content
  has_many :research_articles, -> { order(:position) }, dependent: :destroy, inverse_of: :research_content
  has_one_attached :photo

  accepts_nested_attributes_for :research_stats, :research_layers, :research_articles, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[body created_at headline id label layers_title updated_at]
  end
end
