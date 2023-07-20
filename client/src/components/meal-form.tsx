import React, { useState } from 'react';


type MealFormProps = {
  eventId: number,
  onSubmit: () => void,
  onCanceL: () => void,
}

const MealForm = ({ eventId, onSubmit, onCancel }: MealFormProps) => {
  const [formState, setFormState] = useState({
    date: null,
    mealType: null,
    name: null,
    notes: null,
  });

  const generateFormChangeHandler = (key: string) => (val: string): void => {
    setFormState({ ...formState, [key]: val.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      eventId,
      formState.date,
      formState.mealType,
      formState.name,
      formState.notes,
    );
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <label className="label" htmlFor="name">Name</label>
        <div className="control">
          <input
            type="text"
            name="name"
            className="input"
            onChange={generateFormChangeHandler('name')}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="date">Date</label>
        <div className="control">
          <input
            type="date"
            name="date"
            onChange={generateFormChangeHandler('date')}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="name">Meal Type</label>
        <div className="control">
          <select className="select">
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="notes">Notes</label>
        <div className="control">
          <textarea
            name="notes"
            className="textarea"
            onChange={generateFormChangeHandler('notes')}
          />
        </div>
      </div>
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" type="submit">Create</button>
        </div>
        <div className="control">
          <button className="button" type="cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
};


export default MealForm;
