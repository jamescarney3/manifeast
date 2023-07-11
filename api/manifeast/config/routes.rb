Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#root"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/', to: 'application#api_root'
      resources :users, only: [:create]
      resource :session, only: [:create, :show]
    end
  end
end
