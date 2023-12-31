import React, { useState } from 'react';


const EventForm = ({ onSubmit, onCancel }) => {
  const [formState, setFormState] = useState({
    startDate: null,
    endDate: null,
    title: null,
    description: null,
  });

  const generateFormChangeHandler = (key: string) => (val: string): void => {
    setFormState({ ...formState, [key]: val.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(
      // required
      formState.startDate,
      formState.endDate,
      // optional
      formState.title,
      formState.description,
    );
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <label className="label" htmlFor="title">Title</label>
        <div className="control">
          <input
            type="text"
            name="title"
            className="input"
            onChange={generateFormChangeHandler('title')}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="description">Description</label>
        <div className="control">
          <textarea
            name="description"
            className="textarea"
            onChange={generateFormChangeHandler('description')}
          />
        </div>
      </div>
      {/* TODO: make these look nicer */}
      <div className="field">
        <label className="label" htmlFor="startDate">Start Date</label>
        <div className="control">
          <input
            type="date"
            name="startDate"
            onChange={generateFormChangeHandler('startDate')}
          />
        </div>
      </div>
      <div className="field">
        <label className="label" htmlFor="endDate">End Date</label>
        <div className="control">
          <input
            type="date"
            name="endDate"
            onChange={generateFormChangeHandler('endDate')}
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


export default EventForm;
