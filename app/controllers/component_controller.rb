class ComponentController < ApplicationController
  def index
    @components = Component.select(:id, :name).all
    render json: @components
  end

  def show
    @component = Component.find(params[:id])
    render json: @component
  end

  def component_states
    a_step = Step.find(params[:id])
    component_hash = Component.all.each_with_object({}) { |item, memo| memo[item.id] = item.serializable_hash }
    program_steps = Program.find(a_step.program_id).select_program_steps(params[:id])
    program_steps.each  do |a_step|
      set_component_states(a_step, component_hash)
    end
    render json: component_hash.values
  end

  def set_component_states(a_step, component_hash)
    a_step.component_states.each do |component_state|
      component = component_hash[component_state.component_id]
      unless component[:state]
        component[:state] = component_state.state
        component[:step_id] = component_state.step_id
      end
    end
  end
end