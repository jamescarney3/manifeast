json.partial! "api/v1/events/event", event: @event
json.meals do
  json.array! @event.meals do |meal|
    json.partial! "api/v1/meals/meal", meal: meal
    json.components do
      json.array! meal.components do |component|
        json.partial! "api/v1/components/component", component: component
      end
    end
  end
end
