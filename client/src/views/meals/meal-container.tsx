import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { mealsService } from 'services';
import { debounce } from 'utils/lang-utils';
import { StoreContext } from 'context';
import { Component } from 'types/models';


const MealsContainer = () => {
  const { eventId, mealId } = useParams();

  const {
    findComponentsByMealId,
    findMeal,
    addComponents,
    updateComponent,
  } = useContext(StoreContext);

  const meal = findMeal(mealId) || {};
  const components = findComponentsByMealId(Number(mealId));

  const [containerErrors, setContainerErrors] = useState([]);
  const [componentUpdates, setComponentUpdates] = useState([]);

  // debounce meal component update api calls, no need to DDOS the server
  const flushComponentUpdates = useCallback(debounce((components) => {
    const mealPayload = { ...meal, components };
    setComponentUpdates([]);
    return mealsService.updateMeal(mealId, eventId, mealPayload)
      .then((meal) => addComponents(meal.components))
      .catch((err) => setContainerErrors((current) => current.concat(err)));
  }), [debounce, meal, mealId, eventId, addComponents, setComponentUpdates]);

  // flush component updates (debounced) in response to changes to component
  // updates buffer if any updates exist
  useEffect(() => {
    if (componentUpdates.length) flushComponentUpdates(componentUpdates);
  }, [componentUpdates, flushComponentUpdates]);

  const toggleComponentCompleted = (component: Component) => {
    // get toggled state and component id
    const completed = !component.completed;

    // update component in store
    const updatedComponent = { ...component, completed };
    updateComponent(updatedComponent);

    // add update to componentUpdates buffer to be flushed in effect hook
    const updateIndex = componentUpdates.findIndex((c) => c.id === component.id);
    const spliceIndex = updateIndex >= 0 ? updateIndex : Infinity;
    const updatesBuffer = componentUpdates.toSpliced(spliceIndex, 1, updatedComponent);
    setComponentUpdates(updatesBuffer);
  };

  return (
    <Outlet
      context={{ components, meal, containerErrors, toggleComponentCompleted }}
    />
  );
};


export default MealsContainer;
