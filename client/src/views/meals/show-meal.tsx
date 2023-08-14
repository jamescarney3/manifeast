import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate, Outlet, useOutletContext } from 'react-router-dom';

// import { debounce } from 'utils/lang-utils';
import { mealsService, componentsService } from 'services';
import { ComponentListItem } from 'components';
import { StoreContext } from 'context';


const ShowMeal = () => {
  const { eventId, mealId } = useParams();
  const navigate = useNavigate();
  const {
    findMeal,
    addMeal,
    addComponents,
    removeMeal,
    removeComponent,
  } = useContext(StoreContext);
  const { meal, components, toggleComponentCompleted } = useOutletContext();

  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const mealExists = useMemo(() => !!findMeal(mealId));
  const eventUrl = ['/events', eventId].join('/');

  const handleDelete = () => {
     if (confirm('Really delete meal? All components will be lost')) {
       setLoading(true);
       mealsService.destroyMeal(mealId, eventId)
         .then(() => {
           // this is a string when it comes from the router hook
           removeMeal(Number(mealId));
           navigate(['/events', eventId].join('/'));
         })
         .catch((err) => setErrors([err]))
         .finally(() => setLoading(false));
     }
  };

  const deleteComponent = (component) => {
    if (confirm('Really delete meal component?')) {
      componentsService.destroyComponent(eventId, mealId, component.id)
        .then(() => removeComponent(component.id))
        .catch((err) => setErrors([err]));
    }
  };

  useEffect(() => {
    // TODO: figure out double fetch here and fix
    if (!mealExists) setLoading(true);
    mealsService.fetchMeal(mealId, eventId)
      .then((meal) => {
        addMeal(meal);
        addComponents(meal.components);
      })
      .catch((res) => setErrors([res]))
      .finally(() => setLoading(false));
  }, [mealExists, mealsService, setLoading, setErrors, addMeal]);

  const renderErrors = () => {
    return errors.map((error) => (<div>{JSON.stringify(error)}</div>));
  };

  const renderComponent = (component) => {
    return (
      <ComponentListItem
        component={component}
        key={`component-list-item-${component.id}`}
        onToggleComplete={toggleComponentCompleted}
        onDelete={deleteComponent}
      />
    );
  };

  if (loading) return (<div>[[ loading spinner ]]</div>);
  return (
    <div className="container pt-6">
      <div className="block">
        <Link to={eventUrl}>{'< Back'}</Link>
        <h1 className="title is-1">{meal.name}</h1>
        {meal.notes && (<p>{meal.notes}</p>)}
      </div>
      {renderErrors()}
      <div className="block">
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
