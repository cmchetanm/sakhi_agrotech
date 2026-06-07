Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :carousel_images, only: [ :index ]
      resources :initiatives, only: [ :index ]
      resources :projects, only: [ :index ]
      resources :team_members, only: [ :index ]
      resources :contact_submissions, only: [ :create ]
      get "site_config", to: "site_config#show"
    end
  end

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end