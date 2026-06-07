class ContactSubmission < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :contact, presence: true, length: { minimum: 10 }
  validates :message, presence: true, length: { minimum: 10 }

  def self.ransackable_attributes(_auth_object = nil)
    %w[contact created_at email id message name updated_at]
  end
end
