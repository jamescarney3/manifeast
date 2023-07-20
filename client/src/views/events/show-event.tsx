import React, { useEffect, useMemo, useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { eventsService } from 'services';
import { StoreContext } from 'context';


const ShowEvent = () => {
  const { id } = useParams();
  const { addEvent, findEvent, addMeals, findMealsByEventId } = useContext(StoreContext);

  const [showEventErrors, setShowEventErrors] = useState([]);
  const addErrors = useMemo(() => (errorRes) => {
    const errors = errorRes.message ? [errorRes.message] : errorRes;
    setShowEventErrors([...showEventErrors, ...errors]);
  }, [showEventErrors, setShowEventErrors]);

  const [eventLoading, setEventLoading] = useState(false);

  const event = findEvent(id) || {};
  const meals = findMealsByEventId(id);

  const isLoading = (eventLoading && !event);
  const hasErrors = showEventErrors.length > 0;

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    setShowEventErrors([]);
    setEventLoading(true);
    eventsService.fetchEvent(id)
      .then((event) => {
        addEvent(event);
        addMeals(event.meals);
      })
      .catch((res) => addErrors(res))
      .finally(() => setEventLoading(false));
  }, [eventsService, setShowEventErrors, setEventLoading, addEvent]);

  const renderMealLink = (meal) => {
    const to = ['meals', meal.id].join('/');
    const key = ['meal', meal.id].join('-');
    return (
      <li key={key}>
        <Link className="p-2 is-block" to={to}>{meal.name}</Link>
      </li>
    );
  };

  if (isLoading) return (<div>loading spinner</div>);
  if (hasErrors) return (<div>{JSON.stringify(showEventErrors)}</div>);
  return (
    <div className="container pt-6">
      <div className="block">
        <h1 className="title is-1">{event.title}</h1>
        <p className="subtitle mt-0">{event.description}</p>
        <p>{formatDate(event.startDate)} - {formatDate(event.endDate)}</p>
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
