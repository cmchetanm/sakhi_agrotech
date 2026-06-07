ActiveAdmin.setup do |config|
  config.site_title = "Sakhi Agrotech"
  config.site_title_link = ENV.fetch("FRONTEND_URL", "https://sakhiagrotech.com")

  config.authentication_method = :authenticate_admin_user!
  config.current_user_method = :current_admin_user
  config.logout_link_path = :destroy_admin_user_session_path

  config.comments = false
  config.batch_actions = true
  config.filter_attributes = [:encrypted_password, :password, :password_confirmation]
  config.localize_format = :long
  config.download_links = false

  config.namespace :admin do |admin|
    admin.build_menu :utility_navigation do |menu|
      menu.add label: "View site",
               url: ENV.fetch("FRONTEND_URL", "https://sakhiagrotech.com"),
               html_options: { target: "_blank", rel: "noopener noreferrer" }
      admin.add_logout_button_to_menu menu
    end
  end

  # Avoid ad-blockers that flag URLs containing "active_admin".
  config.clear_stylesheets!
  config.clear_javascripts!
  config.register_stylesheet "sakhi_admin.css"
  config.register_javascript "sakhi_admin.js"
end
