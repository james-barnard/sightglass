class Component < ApplicationRecord
  has_many :component_states

  def self.foo(step_id)
    left_outer_joins(:component_states)
      .select(:name, :step_id, 'components.id', :state)
      .where("step_id <= #{step_id} or step_id IS NULL")
      .order('components.id, step_id desc')
  end

  def self.last_state(states)
    id_set = Set.new()
    states.inject([]) do |memo, item|
      memo << item if id_set.add?(item[:id])
      memo
    end
  end

  def self.step_states(step_id)
    last_state(foo(step_id))
  end
end
   # find_by_sql("select components.name, step_id, components.id, state from components left outer join component_states on component_states.component_id = components.id where step_id <= ? or step_id is null order by components.id, step_id desc", step_id)
