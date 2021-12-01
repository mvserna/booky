Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "homes#index"
  
  resources :books, only: :index
  resources :search, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :create]
      resources :search, only: [:show, :create]
      resources :users, only: :index
    end
  end
end
