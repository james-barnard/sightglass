class CreateStepStatuses < ActiveRecord::Migration[5.1]
  def change
    create_table :step_statuses do |t|
      t.integer :step_id
      t.integer :test_run_id
      t.string :status
      t.integer :started_at
      t.integer :soaking_at
      t.integer :completed_at
    end
  end
end
