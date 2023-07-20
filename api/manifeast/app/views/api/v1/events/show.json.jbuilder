json.partial! "api/v1/events/event", event: @event
json.meals do
  json.array! @event.meals do |meal|
    json.partial! "api/v1/meals/meal", meal: meal
  end
end
