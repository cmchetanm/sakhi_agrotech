Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :contact_submissions, only: [ :create ]
      get "homepage", to: "homepage#show"
    end
  end

  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
end