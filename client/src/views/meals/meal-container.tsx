import React, { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { StoreContext } from 'context';


const MealsContainer = () => {
  const { mealId } = useParams();

  const { findMeal } = useContext(StoreContext);

  const meal = findMeal(mealId);

  return (<Outlet context={{ meal }}/>);
};


export default MealsContainer;
