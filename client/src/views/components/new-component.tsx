import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { ComponentForm } from 'components';
import { StoreContext } from 'context';
import { componentsService } from 'services';

const NewComponent = () => {
  const { id, mealId } = useParams();
  const navigate = useNavigate();
  const { addComponent } = useContext(StoreContext);

  const [loading, setLoading] = useState(false);


  const onSubmitComponentForm = (
    eventId: number | string,
    mealId: number,
    name: string,
    amount: number,
    unit?: string,
  ): void => {
    setLoading(true);
    componentsService.createComponent(eventId, mealId, name, amount, unit)
      .then((component) => {
        addComponent(component);
        navigate(['/events', id, 'meals', mealId].join('/'));
      })
      .catch((res) => setErrors(res))
      .finally(() => setLoading(false));
  };

  const onCancelComponentForm = () => {
    navigate(['/events', id, 'meals', mealId].join('/'));
  };

  if (loading) return (<div>[[ loading spinner ]]</div>);
  return (
    <ComponentForm
      eventId={id}
      mealId={mealId}
      onSubmit={onSubmitComponentForm}
      onCancel={onCancelComponentForm}
    />
  );
};


export default NewComponent;
