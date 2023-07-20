import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';

import { mealsService, componentsService } from 'services';
import { StoreContext } from 'context';


const ShowMeal = () => {
  const { id, mealId } = useParams();
  const navigate = useNavigate();
  const {
    findMeal,
    findComponentsByMealId,
    addMeal,
    addComponents,
    removeMeal,
    removeComponent,
    updateComponent,
  } = useContext(StoreContext);

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const meal = findMeal(mealId);
  const components = findComponentsByMealId(Number(mealId));

  const mealExists = useMemo(() => !!findMeal(mealId));
  const eventUrl = ['/events', id].join('/');

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

  const deleteComponent = (component) => {
    if (confirm('Really delete component?')) {
      componentsService.destroyComponent(id, mealId, component.id)
        .then(() => removeComponent(component.id))
        .catch((err) => setErrors(err));
    }
  };

  const toggleComponentCompleted = (component) => {
    const completed = !component.completed;
    const updatedComponent = { ...component, completed };
    updateComponent(updatedComponent);
    componentsService.updateComponent(id, mealId, updatedComponent)
      .then((apiComponent) => updateComponent(apiComponent))
      .catch((err) => setErrors(err));
  };

  useEffect(() => {
    if (!mealExists) {
      setLoading(true);
      mealsService.fetchMeal(mealId, id)
        .then((meal) => {
          addMeal(meal);
          addComponents(meal.components);
        })
        .catch((res) => setErrors(res))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [mealExists, mealsService, setLoading, setErrors, addMeal]);

  const renderErrors = () => {
    return errors.map((error) => (<div>{error}</div>));
  };

  const renderComponent = (component) => {
    return (
      <div className="box columns is-mobile my-3">
        <div className="column">
          {component.name}
        </div>
        <div className="column">
          {component.amount} {component.unit}
        </div>
        <div className="column">
          <label className="checkbox">
            <input
              type="checkbox"
              className="checkbox"
              checked={component.completed}
              onClick={() => toggleComponentCompleted(component)}
            />
            {' '}Completed
          </label>
        </div>
        <button
          onClick={() => deleteComponent(component)}
          className="button is-small is-danger"
        >
          Delete
        </button>
      </div>
    );
  };

  // renderNewComponentForm = () =>

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
        {components.map(renderComponent)}
      </div>
      <div className="block">
        <Outlet />
      </div>
      <div className="level">
        <div className="level-left">
          <Link
            to={['components', 'new'].join('/')}
            className="button is-primary"
          >
            Add Component
          </Link>
        </div>
        <div className="level-right">
          <button
            className="button is-danger"
            onClick={handleDelete}
          >
            Delete Meal
          </button>
        </div>
      </div>
    </div>
  );
};


export default ShowMeal;
