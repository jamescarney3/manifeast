class Component < ApplicationRecord
  belongs_to :meal
  has_one :event, through: :meal
end
