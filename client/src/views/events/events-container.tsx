import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { StoreContext } from 'context';
import { eventsService } from 'services';


const { fetchEvents } = eventsService;

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
const EventsContainer = () => {
  const { addEvents, getAllEvents } = useContext(StoreContext);

  const [eventsErrors, setEventsErrors] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);

  const events = getAllEvents();

  useEffect(() => {
    setEventsErrors([]);
    setEventsLoading(true);
    fetchEvents()
      .then((events) => {
        addEvents(events);
      })
      .catch((res) => setEventsErrors([res]))
      .finally(() => setEventsLoading(false));

  }, [setEventsErrors, setEventsLoading]);

  return (<Outlet context={{ events, eventsErrors, eventsLoading }} />);
};


export default EventsContainer;
