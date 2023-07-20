class Api::V1::ComponentsController < Api::V1::ApplicationController
  def create
    if event_access_allowed? event_identifier
      @component = Component.new(component_params)
      @component.meal = Meal.find params[:meal_id]

      if @component.save
        render :show
      else
        render json: @component.errors.full_messages, status: 422
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  def update
    if event_access_allowed? event_identifier
      @component = Component.find(params[:id])
      if @component.update component_params
        render :show
      else
        render json: @meal.errors.full_messages, status: 422
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  def destroy
    if event_access_allowed? event_identifier
      @component = Component.find(params[:id])
      if @component.destroy
        render json: {}, status: 204
      else
        render json: @meal.errors.full_messages, status: 422
      end
    else
      render json: ['Unauthorized to access resources for event'], status: 401
    end
  end

  private

  def component_params
    params.require(:component).permit(:name, :amount, :unit, :completed)
  end

  def event_identifier
    params[:event_id]
  end
end
