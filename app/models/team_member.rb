class TeamMember < ApplicationRecord
  has_one_attached :photo
  def self.ransackable_attributes(auth_object = nil)
    ["created_at", "designation", "id", "name", "updated_at"]
  end
end
