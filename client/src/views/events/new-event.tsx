import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventForm } from 'components';
import { eventsService } from 'services';
import { StoreContext } from 'context';
import { Nullable } from 'types/utils';
import { Event } from 'types/models';


const NewEvent = () => {
  const { addEvent } = useContext(StoreContext);
  const navigate = useNavigate();

  const [newEventError, setNewEventError] = useState<Nullable<string>>(null);

  const onFormSubmit = (
    startDate: string,
    endDate: string,
    title: string,
    description: string,
  ) => {
    eventsService.createEvent(startDate, endDate, title, description)
      .then((event: Event) => {
        addEvent(event);
        navigate('/events/' + event.id);
      })
      .catch((error) => setNewEventError(error));
  };

  return (
    <div className="container">
      <h1>[[ new event ]]</h1>
      <div>{JSON.stringify(newEventError)}</div>
      <EventForm onSubmit={onFormSubmit} />
    </div>
  );
};


export default NewEvent;
