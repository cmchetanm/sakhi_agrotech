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
end
