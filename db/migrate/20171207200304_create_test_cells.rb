class CreateTestCells < ActiveRecord::Migration[5.1]
  def change
    create_table :test_cells do |t|
      t.string :name
    end
  end
end
