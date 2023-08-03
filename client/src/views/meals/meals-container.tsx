import React, { useContext } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { StoreContext } from 'context';


const MealsContainer = () => {
  const { eventId } = useParams();

  const { findMealsByEventId } = useContext(StoreContext);

  const meals = findMealsByEventId(eventId);

  return (<Outlet context={{ meals }}/>);
};


export default MealsContainer;
