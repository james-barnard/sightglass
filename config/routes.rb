Rails.application.routes.draw do
  get 'api/step/:id', to: 'step#show' 

  get 'api/step/:id/component_states', to: 'component#component_states'

  get 'api/test_runs', to: 'test_run#index'

  get 'api/program_test_runs/:id', to: 'test_run#program_test_run_select_list'

  get 'api/test_run/:id', to: 'test_run#show'

  get 'api/component/:id', to: 'component#show'

  get 'api/components', to: 'component#index'

  get 'api/program_info/:id', to: 'test_run#program_info'

  get 'api/timeline/:id', to: 'test_run#timeline'

  get 'api/programs', to: 'program#index'

  get 'api/program/timeline/:id',  to: 'program#program_timeline'

  get 'api/program_program_info/:id', to: 'program#program_program_info'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
