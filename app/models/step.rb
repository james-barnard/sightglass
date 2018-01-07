class Step < ApplicationRecord
  has_many :component_states
  belongs_to :program
  has_many :components, through: :component_states
  has_many :step_statuses
  has_many :test_runs, through: :step_statuses

  def statesx
    component_states
      .joins(:component)
      .select('component_states.*', :name)
      .to_a    
  end
end