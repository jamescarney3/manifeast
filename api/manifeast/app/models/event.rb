class Event < ApplicationRecord
  validates :start_date, presence: true
  validates :end_date, presence: true
  validates :edit_token, presence: true, uniqueness: true
  validates :start_date, comparison: { less_than: :end_date }

  before_validation :ensure_edit_token, on: :create
  before_validation :ensure_title, on: [ :create, :update ]

  belongs_to :user
  has_many :meals

  def self.find_by_id_or_token(id_or_token)
    (Event.where(id: id_or_token).or Event.where(edit_token: id_or_token)).first
  end

  def self.generate_edit_token
    new_edit_token = SecureRandom.urlsafe_base64(16)
    old_edit_tokens = Event.pluck(:edit_token)
    until !old_edit_tokens.include?(new_edit_token)
      new_edit_token = SecureRandom.urlsafe_base64(16)
    end
    new_edit_token
  end

  def ensure_title
    if title.nil? and !!start_date and !!end_date
      self.title = [
        "#{start_date.month}/#{start_date.day}/#{start_date.year}",
        "#{end_date.month}/#{end_date.day}/#{end_date.year}",
      ].join(' - ')
    end
  end

  def build_meals
    (start_date..end_date).each do |date|
      [:breakfast, :lunch, :dinner].each do |meal_type|
        name = "#{date.month}/#{date.day}/#{date.year} #{meal_type.to_s}"
        meals.new(name: name, date: date, meal_type: meal_type)
      end
    end
  end

  def ensure_edit_token
    self.edit_token = Event.generate_edit_token
  end
end
