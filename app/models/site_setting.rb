class SiteSetting < ApplicationRecord
  validates :whatsapp_number, format: { with: /\A\d*\z/, message: "must contain digits only (country code, no +)" },
                                allow_blank: true

  def self.instance
    first || create!(whatsapp_number: "919999999999")
  end

  def whatsapp_url
    return if whatsapp_number.blank?

    "https://wa.me/#{whatsapp_number}"
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[contact_email created_at footer_contact_location footer_copyright footer_description footer_instagram_url footer_linkedin_url footer_made_in footer_tagline footer_tagline_highlight id site_name tagline updated_at whatsapp_number]
  end
end
