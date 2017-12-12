Rails.application.routes.draw do
  get 'test_run/index'

  get 'api/test_runs/:id', to: 'test_run#show'

  get 'api/components/:id', to: 'component#show'

  get 'api/components', to: 'component#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
