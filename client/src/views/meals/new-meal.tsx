import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { MealForm } from 'components';
import { mealsService } from 'services';
import { StoreContext } from 'context';


const NewMeal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addMeal } = useContext(StoreContext);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigateToEvent = () => navigate(['/events', id].join('/'));

  const onSubmitMealForm = (
    eventId: number | number,
    date: string,
    mealType: string,
    name?: string,
    notes?: string
  ) => {
    setLoading(true);
    mealsService.createMeal(id, date, mealType, name, notes)
      .then((meal) => {
        addMeal(meal);
        navigate(['/events', id, 'meals', meal.id].join('/'));
      })
      .catch((res) => setErrors(res))
      .finally(() => setLoading(false));
  };

  const onCancelMealForm = () => {
    // this always goes back to the event page for now
    // but with react-router-dom data api this could
    // figure out if there's anything on the nav stack
    // and more intelligently navigate to the previous
    // route/view/etc; this is fine at the moment because
    // it's meant to live in the main router, but there's
    // a potentially more resilient way to do it. TBD if
    // ever needed
    navigateToEvent();
  };

  if (loading) return (<div>[[ loading spinner ]]</div>);
  return (
    <div className="container pt-6">
      {errors.map((e) => (<div>{e}</div>))}
      <MealForm
        eventId={id}
        onSubmit={onSubmitMealForm}
        onCancel={onCancelMealForm}
      />
    </div>
  );
};


export default NewMeal;
