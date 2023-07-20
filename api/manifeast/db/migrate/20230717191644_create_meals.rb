class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|
      t.string :name, null: false
      t.integer :meal_type
      t.date :date, null: false
      t.text :notes
      t.references :event, null: false, foreign_key: true

      t.timestamps
    end
  end
end
