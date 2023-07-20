class User < ApplicationRecord
  validates :email, uniqueness: true, presence: true

  after_initialize :ensure_session_token

  has_secure_password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create password
  end

  def password_digest
     BCrypt::Password.new(super)
  end

  def has_password?(password)
    BCrypt::Password.new(password_digest).is_password? password
  end

  def reset_token!
    update! session_token: User.generate_session_token
    session_token
  end

  def self.find_by_credentials(credentials)
    user = User.find_by(email: credentials[:email])
    unless !user.nil? and user.has_password? credentials[:password]
      return nil
    end
    user
  end

  def meals_by_date(date)
    meals.where(date: date)
  end

  private

  class << self
    def generate_session_token
      new_token = SecureRandom.urlsafe_base64(16)
      old_tokens = User.pluck :session_token
      until not old_tokens.include? new_token
        new_token = SecureRandom.urlsafe_base64(16)
      end
      new_token
    end
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
