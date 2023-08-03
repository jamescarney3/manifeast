import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import { StoreContext } from 'context';
import { eventsService } from 'services';


const { fetchEvent } = eventsService;

/*
somewhat experimental pattern; container component meant to handle initial
data api request for singular event views (show, edit, whatever - as long
as it follows from one event id or edit token), plus anything else down the
routing tree since it's composed to allow for nesting resources

plural events views could expect to receive context from a similarly named
and implemented 'EventsContainer' view

TODO: assess whether this makes more sense under views/containers
TODO: assess whether this container warrants a hook, or whether it could
potentially take the place of hooks for singular event views
*/
const EventContainer = () => {
  const { eventId } = useParams();
  const { addEvent, findEvent, addMeals, addComponents } = useContext(StoreContext);

  const [eventErrors, setEventErrors] = useState([]);
  const [eventLoading, setEventLoading] = useState(false);

  const event = findEvent(eventId) || {};

  useEffect(() => {
    setEventErrors([]);
    setEventLoading(true);
    fetchEvent(eventId)
      .then((event) => {
        addEvent(event);
        addMeals(event.meals);
        addComponents(event.meals.map((meal) => meal.components).flat());
      })
      .catch((res) => setEventErrors([res]))
      .finally(() => setEventLoading(false));

  }, [eventId, setEventErrors, setEventLoading, fetchEvent]);

  return (<Outlet context={{ event, eventErrors, eventLoading }} />);
};


export default EventContainer;
