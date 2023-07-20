class Meal < ApplicationRecord
  belongs_to :event
  has_many :components

  enum meal_type: [:breakfast, :lunch, :dinner]
end
