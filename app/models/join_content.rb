class JoinContent < ApplicationRecord
  include SingletonRecord

  has_many :join_interests, -> { order(:position) }, dependent: :destroy, inverse_of: :join_content

  accepts_nested_attributes_for :join_interests, allow_destroy: true

  def self.ransackable_attributes(_auth_object = nil)
    %w[action1_link_label action1_subtitle action1_title action2_href action2_link_label action2_subtitle action2_title body created_at form_title headline_after headline_before headline_highlight id label submit_label success_message updated_at]
  end
end
