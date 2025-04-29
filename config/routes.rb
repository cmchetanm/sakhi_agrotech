Rails.application.routes.draw do
  root "pages#home"

  get "/about", to: "pages#about"
  get "/services", to: "pages#services"
  get "/video", to: "pages#video"
  get "/projects", to: "pages#projects"
  get "/contact", to: "pages#contact"

  resources :contact_submissions, only: [:create]

  # ActiveAdmin routes
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end