class Step < ApplicationRecord
  has_many :component_states
  belongs_to :program
  has_many :components, through: :component_states
  has_many :test_runs, through: :step_statuses

  def statesx
    component_states
      .joins(:component)
      .select('component_states.*', :name)
      .to_a    
  end

# to do: clean this up

end

# old foo
# .left_outer_joins(:component_states)
#      .select(:name, :step_id, 'components.id', :state)
#      .where("step_id <= #{id} or step_id IS NULL")
#      .order('components.id, step_id desc')
#      .to_a