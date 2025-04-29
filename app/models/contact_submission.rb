class ContactSubmission < ApplicationRecord
    def self.ransackable_attributes(auth_object = nil)
        ["created_at", "email", "id", "id_value", "message", "name", "updated_at"]
    end
end
