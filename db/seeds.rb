admin_email = ENV.fetch("ADMIN_EMAIL", "contact@sakhiagrotech.com")
admin_password = ENV["ADMIN_PASSWORD"]

if admin_password.present?
  AdminUser.find_or_create_by!(email: admin_email) do |user|
    user.password = admin_password
    user.password_confirmation = admin_password
  end

  puts "Admin user seeded: #{admin_email}"
else
  puts "Skipping admin user seed — set ADMIN_PASSWORD to create one."
end

SiteSetting.instance
require Rails.root.join("lib/homepage_defaults")
HomepageDefaults.seed!
puts "Homepage content seeded."
puts "Site settings ready (WhatsApp: #{SiteSetting.instance.whatsapp_number})"
