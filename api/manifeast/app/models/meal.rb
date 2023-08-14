class Meal < ApplicationRecord
  belongs_to :event
  has_many :components
  accepts_nested_attributes_for :components

  enum meal_type: [:breakfast, :lunch, :dinner]
end
