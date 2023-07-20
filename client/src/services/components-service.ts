import kyClient from 'services/base';
import { Component } from 'types/models';


const createComponent = (
  eventId: number | string,
  mealId: number,
  name: string,
  amount: number,
  unit?: string,
): Promise<Component> => {
  return new Promise<Component>((resolve, reject) => {
    const url = ['events', eventId, 'meals', mealId, 'components'].join('/');
    const data = { component: { name, amount, unit } };
    kyClient.post(url, { json: data }).json()
      .then((component) => resolve(component))
      .catch((error) => error.reponse.json())
      .then((messages) => reject(messages));
  });
};

const updateComponent = (
  eventId: number | string,
  mealId: number,
  component: Component,
): Promise<Component> => {
  return new Promise<Component>((resolve, reject) => {
    const url = ['events', eventId, 'meals', mealId, 'components', component.id].join('/');
    const data = { component };
    kyClient.put(url, { json: data }).json()
      .then((component) => resolve(component))
      .catch((error) => error.reponse.json())
      .then((messages) => reject(messages));
  });
};

const destroyComponent = (
  eventId: number | string,
  mealId: number,
  componentId: number
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const url = ['events', eventId, 'meals', mealId, 'components', componentId].join('/');
    kyClient.delete(url).json()
      .then(() => resolve(true)) // empty 204 response
      .catch((error) => error.response.json())
      .then((messages) => reject(messages));
  });
};


export default { createComponent, updateComponent, destroyComponent };
