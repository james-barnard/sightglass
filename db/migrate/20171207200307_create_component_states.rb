class CreateComponentStates < ActiveRecord::Migration[5.1]
  def change
    create_table :component_states do |t|
      t.integer :step_id
      t.integer :component_id
      t.string :state
      t.integer :sequence_number
    end
  end
end
