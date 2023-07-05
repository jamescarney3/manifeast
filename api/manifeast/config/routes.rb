Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "application#root"

  namespace :api do
    namespace :v1 do
      get '/', to: 'application#index'
    end
  end
end
