class CreateTestRuns < ActiveRecord::Migration[5.1]
  def change
    create_table :test_runs do |t|
      t.integer :test_cell_id
      t.integer :program_id
      t.string :name
      t.integer :started_at
      t.integer :completed_at
      t.string :status_final
    end
  end
end
