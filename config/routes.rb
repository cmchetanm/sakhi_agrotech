Rails.application.routes.draw do
  root "pages#home"

  get "/about", to: "pages#about"
  get "/initiatives", to: "pages#initiatives"
  get "/video", to: "pages#video"
  get "/projects", to: "pages#projects"
  get "/connect", to: "pages#connect"

  resources :contact_submissions, only: [:create]

  # ActiveAdmin routes
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end