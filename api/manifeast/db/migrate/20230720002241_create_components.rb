class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components do |t|
      t.string :name, null: false
      t.boolean :completed, null: false, default: false
      t.integer :amount, null: false
      t.string :unit
      t.references :meal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
