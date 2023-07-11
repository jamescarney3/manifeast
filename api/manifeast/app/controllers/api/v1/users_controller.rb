class Api::V1::UsersController < Api::V1::ApplicationController
  def create
    @user = User.new user_params
    if @user.save
      @token = issue_token @user
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
