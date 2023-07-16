class Api::V1::EventsController < Api::V1::ApplicationController
  def create
    @event = Event.new(event_params)
    @event.user = current_user

    if @event.save
      render :show
    else
      render json: @event.errors.full_messages, status: 422
    end
  end

  def index
    unless current_user.nil?
      @events = Event.where(user: current_user)
      render :index
    else
      render json: ['User not logged in'], status: 403
    end
  end

  def show
    @event = Event.find_by_id_or_token(params[:id])
    if @event.edit_token == params[:id] or @event.user == current_user
      render :show
    else
      render json: ['Unauthorized to access event'], status: 401
    end
  end

  private

  def event_params
    params.require(:event).permit(:start_date, :end_date, :title, :description)
  end
end
