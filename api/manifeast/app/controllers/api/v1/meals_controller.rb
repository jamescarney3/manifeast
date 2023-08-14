class Api::V1::MealsController < Api::V1::ApplicationController
  def create
    if event_access_allowed? event_identifier
      @meal = Meal.new(meal_params)
      @meal.event = Event.find_by_id_or_token(event_identifier)

      if @meal.save
        render :show
      else
        render json: @meal.errors.full_messages, status: 422
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  def show
    if event_access_allowed? event_identifier
      @meal = @meal = Meal.find(params[:id])
      if !@meal.nil?
        render :show
      else
        render json: ['Resource not found'], status: 404
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  def update
    ensure_event_access(event_identifier)
    puts 'DEBUG ME'
    puts meal_params
    @meal = @meal = Meal.find(params[:id])
    if @meal.update(meal_params)
      render :show
    else
      render json: @meal.errors.full_messages, status: 422
    end
  end

  def destroy
    if event_access_allowed? event_identifier
      @meal = Meal.find(params[:id])
      if @meal.destroy
        render json: {}, status: 204
      else
        render json: @meal.errors.full_messages, status: 422
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  private

  def meal_params
    # id and event id come from url params
    params.require(:meal).permit(
      :name,
      :meal_type,
      :date,
      :notes,
      components_attributes: [:id, :completed],
    )
  end

  def event_identifier
    params[:event_id]
  end
end
