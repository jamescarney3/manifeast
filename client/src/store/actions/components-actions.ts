import { componentsActionTypes } from 'store/action-types';
import { Component } from 'types/models';
import { Action } from 'types/store';


export const addComponent = (component: Component): Action<Component> => {
  return { type: componentsActionTypes.ADD_COMPONENT, data: component };
};

export const addComponents = (components: Array<Component>): Action<Array<Component>> => {
  return { type: componentsActionTypes.ADD_COMPONENTS, data: components };
};

export const updateComponent = (component: Component): Action<Component> => {
  return { type: componentsActionTypes.UPDATE_COMPONENT, data: component };
};

export const removeComponent = (id: number): Action<Component> => {
  return { type: componentsActionTypes.REMOVE_COMPONENT, data: { id } };
};


export default { addComponent, addComponents, updateComponent, removeComponent };
