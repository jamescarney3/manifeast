import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';


const IndexEvents = () => {
  const { events } = useOutletContext();

  const renderEventItem = ({ id, title }) => {
    const key = `event-itme-${id}`;
    // TODO: this works but it's an ugly way to declare the link target; eval
    // some different ways to do this, possibly programmatically or with a util
    // module... alternatively: <Link to={id}>{title}</Link>?? is that worse?
    const to = ['/events', id].join('/');
    return (
      <li key={key}>
        <Link className="is-size-3" to={to}>{title}</Link>
      </li>
    );
  };

  return (
    <div className="container pt-6">
      <h1 className="title is-1">My Events</h1>
      <ul>
        {events.map(renderEventItem)}
      </ul>
    </div>
  );
};


export default IndexEvents;
