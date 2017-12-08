class CreateSteps < ActiveRecord::Migration[5.1]
  def change
    create_table :steps do |t|
      t.integer :program_id
      t.string :description
      t.integer :duration
      t.integer :sequence_number
    end
  end
end
