import kyClient from 'services/base';
import { Meal } from 'types/models';


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


export default { createMeal, fetchMeal, destroyMeal };
