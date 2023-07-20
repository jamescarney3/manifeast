import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { mealsService } from 'services';
import { StoreContext } from 'context';


const ShowMeal = () => {
  const { id, mealId } = useParams();
  const navigate = useNavigate();
  const { findMeal, addMeal, removeMeal } = useContext(StoreContext);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const meal = findMeal(mealId) || {};
  const mealExists = useMemo(() => !!findMeal(mealId));
  const eventUrl = ['/events', meal.eventId].join('/');

  const handleDelete = () => {
     if (confirm('Really delete meal? All components will be lost')) {
       setLoading(true);
       //TODO:  `id` is event id here... change this to be nicer
       mealsService.destroyMeal(mealId, id)
         .then(() => {
           // this is a string when it comes from the router hook
           removeMeal(Number(mealId));
           navigate(['/events', id].join('/'));
         })
         .catch((err) => setErrors(err))
         .finally(() => setLoading(false));
     }
  };

  useEffect(() => {
    if (!mealExists) setLoading(true);
    mealsService.fetchMeal(mealId, id)
      .then((meal) => {
        addMeal(meal);
      })
      .catch((res) => setErrors(res))
      .finally(() => setLoading(false));
  }, [mealExists, mealsService.fetchMeal]);

  const renderErrors = () => {
    return errors.map((error) => (<div>{error}</div>));
  };

  if (loading) return (<div>[[ loading spinner ]]</div>);
  return (
    <div className="container pt-6">
      <div className="block">
        <Link to={eventUrl}>{'< Back'}</Link>
        <h1 className="title is-1">{meal.name}</h1>
        {meal.notes && (<p>{meal.notes}</p>)}
      </div>
      <div className="block">
        {renderErrors()}
        <div>[[ components placeholder ]]</div>
      </div>
      <div className="block">
        <button className="button is-danger" onClick={handleDelete}>Delete Meal</button>
      </div>
    </div>
  );
};


export default ShowMeal;
