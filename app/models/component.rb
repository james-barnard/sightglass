class Component < ApplicationRecord
  has_many :component_states

  def self.select_component_states(step_id)
    left_outer_joins(:component_states)
      .select(:name, :step_id, 'components.id', :state)
      .where("step_id <= #{step_id} or step_id IS NULL")
      .order('components.id, step_id desc')
  end

  def self.last_state(states, program_id)
    id_set = Set.new()
    step_list = program_steps(program_id)
    states.inject([]) do |memo, item|
      valid = step_list.include? item[:step_id]
      memo << item if valid && id_set.add?(item[:id])
      memo
    end
  end

  def self.step_states(step_id, program_id)
    last_state(select_component_states(step_id), program_id)
  end

  def self.program_steps(program_id)
    Program.find(program_id).step_ids
  end
end
   # find_by_sql(    where step_id <= ? or step_id is null 


#select components.id, components.name, step_id, state from components 
#left outer join component_states on component_states.component_id = components.id 
#order by components.id, step_id desc
