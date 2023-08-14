Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#root"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/', to: 'application#api_root'
      resources :users, only: [:create]
      resource :session, only: [:create, :show]
      resources :events, only: [:create, :index, :show] do
        resources :meals, only: [:create, :show, :update, :destroy] do
          resources :components, only: [:create, :update, :destroy]
        end
      end
    end
  end
end
