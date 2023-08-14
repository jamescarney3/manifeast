import kyClient from 'services/base';
import { Component, Meal } from 'types/models';


type MealPayload = Meal & {
  // https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html#method-i-accepts_nested_attributes_for
  components?: Array<Component>
}

type MealParams = {
  date: string,
  mealType: string,
  name?: string,
  notes?: string,
  componentsAttributes?: Array<{
    id: number,
    completed: boolean,
  }>,
}

// see rails meals controller for params shape
const buildParams = (meal: MealPayload): MealParams => {
  const { date, mealType, name, notes, components } = meal;
  const componentsAttributes = components && components.map((component) => {
    const { id, completed } = component;
    return { id, completed };
  });
  return { date, mealType, name, notes, componentsAttributes };
};

// TODO: consider de-positional-izing these args to follow pattern in
// updateMeal function, make better use of MealParams type
const createMeal = (
  eventId: number,
  date: string,
  mealType: string,
  name?: string,
  notes?: string,
): Promise<Meal> => {
  return new Promise<Meal>((resolve, reject) => {
    const url = ['events', eventId, 'meals'].join('/');
    const data = { meal: { date, mealType, name, notes } };
    kyClient.post(url, { json: data }).json()
      .then((meal) => resolve(meal))
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

const fetchMeal = (id: number, eventId: number | string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const url = ['events', eventId, 'meals', id].join('/');
    kyClient.get(url).json()
      .then((meal) => resolve(meal))
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

// meal payload here should optionally include a list of components to update,
// since components are logically subordinate to meals and events and the app
// wants to be able to update them from an individual meal view
// TODO: roll id, eventId into mealPayload? can specify as necessary in type
// def in order not to ever omit...
const updateMeal = (id: number, eventId: number, mealPayload: MealPayload) => {
  return new Promise<void>((resolve, reject) => {
    const url = ['events', eventId, 'meals', id].join('/');
    const data = { meal: buildParams(mealPayload) };
    kyClient.put(url, { json: data }).json()
      .then((meal) => resolve(meal))
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};

// right order for positional args? not sure! it's probably fine!
// TODO: update - it sucks and should go in the opposite order
const destroyMeal = (id: number, eventId: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const url = ['events', eventId, 'meals', id].join('/');
    kyClient.delete(url).json()
      .then(() => resolve(true)) // empty 204 response
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};


export default { createMeal, fetchMeal, destroyMeal, updateMeal };
