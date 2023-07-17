import React, { useEffect, useMemo, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

import { eventsService } from 'services';
import { StoreContext } from 'context';


const ShowEvent = () => {
  const { id } = useParams();
  const { addEvent, findEvent } = useContext(StoreContext);

  const [showEventErrors, setShowEventErrors] = useState([]);
  const addErrors = useMemo(() => (errorRes) => {
    const errors = errorRes.message ? [errorRes.message] : errorRes;
    setShowEventErrors([...showEventErrors, ...errors]);
  }, [showEventErrors, setShowEventErrors]);

  const [eventLoading, setEventLoading] = useState(false);

  const event = findEvent(id) || {};

  const isLoading = (eventLoading && !event);
  const hasErrors = showEventErrors.length > 0;

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    setShowEventErrors([]);
    setEventLoading(true);
    eventsService.fetchEvent(id)
      .then((event) => addEvent(event))
      .catch((res) => addErrors(res))
      .finally(() => setEventLoading(false));
  }, [eventsService, setShowEventErrors, setEventLoading, addEvent]);

  if (isLoading) return (<div>loading spinner</div>);
  if (hasErrors) return (<div>{JSON.stringify(showEventErrors)}</div>);
  return (
    <div className="container pt-6">
      <div className="level">
        <div className="level-left">
          <div className="level-item is-block">
            <h1 className="title">{event.title}</h1>
            <p className="subtitle mt-0">{event.title}</p>
          </div>
        </div>
        <div className="level-left is-block">
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </div>
      </div>
    </div>
  );
};


export default ShowEvent;
