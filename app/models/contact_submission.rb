class ContactSubmission < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :contact, presence: true, length: { minimum: 10 }
  validates :message, presence: true, length: { minimum: 10 }
    def self.ransackable_attributes(auth_object = nil)
        ["created_at", "email", "id", "id_value", "message", "name", "updated_at"]
    end
end
