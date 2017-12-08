class CreateComponents < ActiveRecord::Migration[5.1]
  def change
    create_table :components do |t|
      t.integer :test_cell_id
      t.string :name
    end
  end
end
