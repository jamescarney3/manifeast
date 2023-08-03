import React, { useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import { StoreContext } from 'context';


// TODO: maybe better as util function
const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString();
};

/*
  singular event read view, more or less analagous to the "show" CRUD action
  in the Rails formulation; expects to recieve
*/
const ShowEvent = () => {
  const { event, eventErrors, eventLoading } = useOutletContext();
  const { findMealsByEventId } = useContext(StoreContext);

  const meals = findMealsByEventId(event.id);
  const shareableUrl = [window.location.origin, 'events', event.editToken].join('/');
  const hasErrors = eventErrors.length > 0;

  const renderMealLink = (meal) => {
    const to = ['meals', meal.id].join('/');
    const key = ['meal', meal.id].join('-');
    return (
      <li key={key}>
        <Link className="p-2 is-block" to={to}>{meal.name}</Link>
      </li>
    );
  };

  if (eventLoading) return (<div>loading spinner</div>);
  if (hasErrors) return (<div>{JSON.stringify(eventErrors)}</div>);
  return (
    <div className="container pt-6">
      <div className="block">
        <h1 className="title is-1">{event.title}</h1>
        <p className="subtitle mt-0">
          Share via: <a href={shareableUrl}>{shareableUrl}</a>
        </p>
        <p className="subtitle mt-0">{event.description}</p>
        <p className="subtitle mt-0">{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
      </div>
      <div className="block">
        <h2 className="title is-2">Meals</h2>
        <ul>
          {meals.map(renderMealLink)}
        </ul>
      </div>
      <Link className="button is-primary" to="meals/new">Create meal</Link>
    </div>
  );
};


export default ShowEvent;
