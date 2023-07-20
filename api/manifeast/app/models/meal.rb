class Meal < ApplicationRecord
  belongs_to :event

  enum meal_type: [:breakfast, :lunch, :dinner]
end
