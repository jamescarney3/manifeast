import React from 'react';

import { Component } from 'types/models';


interface ComponentListItemProps {
  component: Component,
  onToggleComplete: () => void,
  onDelete: () => void,
}

const ComponentListItem = (props: ComponentListItemProps) => {
  const { component, onToggleComplete, onDelete } = props;

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
            readOnly
            onClick={() => onToggleComplete(component)}
          />
          {' '}Completed
        </label>
      </div>
      <button
        onClick={() => onDelete(component)}
        className="button is-small is-danger"
      >
        Delete
      </button>
    </div>
  );
};


export default ComponentListItem;
