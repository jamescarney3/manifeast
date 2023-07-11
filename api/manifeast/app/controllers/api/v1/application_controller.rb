class Api::V1::ApplicationController < ApplicationController
  helper_method :current_user

  def api_root
    render plain: 'hello from api '
  end

  def jwt_key
    Rails.application.credentials.jwt_key
  end

  def issue_token(user)
    JWT.encode({user_id: user.id}, jwt_key, "HS256")
  end

  def decoded_token
    begin
      JWT.decode(request_token, jwt_key, true, { :algorithm => 'HS256' })
    rescue => exception
      [{error: "Invalid Token"}]
    end
  end

  def request_token
    request.headers["Authorization"]
  end

  def current_user
    user ||= User.find_by id: decoded_token.first["user_id"]
  end

  def logged_in?
    !!current_user
  end
end
