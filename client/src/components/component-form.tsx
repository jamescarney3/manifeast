import React, { useState } from 'react';


const ComponentForm = ({ eventId, mealId, onSubmit, onCancel }) => {
  const [formState, setFormState] = useState({
    name: null,
    amount: null,
    unit: null,
  });

  const generateFormChangeHandler = (key: string) => (val: string): void => {
    setFormState({ ...formState, [key]: val.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      eventId,
      mealId,
      formState.name,
      formState.amount,
      formState.unit,
    );
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="columns">
        <div className="field column is-4">
          <label className="label is-small" htmlFor="name">Name</label>
          <div className="control">
            <input
              type="text"
              name="name"
              className="input"
              onChange={generateFormChangeHandler('name')}
            />
          </div>
        </div>
        <div className="field column is-1">
          <label className="label is-small" htmlFor="amount">Amount</label>
          <div className="control">
            <input
              type="number"
              name="amount"
              className="input"
              onChange={generateFormChangeHandler('amount')}
            />
          </div>
        </div>
        <div className="field column is-1">
          <label className="label is-small" htmlFor="unit">Unit</label>
          <div className="control">
            <input
              type="text"
              name="unit"
              className="input"
              onChange={generateFormChangeHandler('unit')}
            />
          </div>
        </div>
        <div className="field column">
          <div className="control is-grouped pt-5">
            <button className="button is-primary mr-3" type="submit">Add</button>
            <button className="button is-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </form>
  );
};


export default ComponentForm;
