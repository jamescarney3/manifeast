class Api::V1::SessionsController < Api::V1::ApplicationController
  def create
    @user = User.find_by_credentials(session_params)
    if @user and @user.authenticate(session_params[:password])
      @token = issue_token @user
      render :show
    else
      render json: {error: "Incorrect email or password"}, status: 422
    end
  end

  def show
    if logged_in?
      @user = current_user
      @token = request_token
      render :show
    else
      render json: {error: 'User not logged in / could not be found'}, status: 422
    end
  end

  private

  def session_params
    params.require(:user).permit(:email, :password)
  end
end
