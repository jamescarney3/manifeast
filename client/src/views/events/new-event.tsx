import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { EventForm } from 'components';
import { eventsService } from 'services';
import { StoreContext } from 'context';
import { Event } from 'types/models';


const NewEvent = () => {
  const { addEvent } = useContext(StoreContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState([]);

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
      .catch((error) => setErrors(error));
  };

  const onFormCancel = () => {
    navigate('/');
  };

  const renderErrors = () => {
    return errors.map((error) => (<div>{error}</div>));
  };

  return (
    <div className="container pt-6">
      <h1 className="title is-1">Create Event</h1>
      {renderErrors()}
      <EventForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
    </div>
  );
};


export default NewEvent;
