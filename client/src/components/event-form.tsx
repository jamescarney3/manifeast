import React, { useState } from 'react';


const EventForm = ({ onSubmit }) => {
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

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <div className="control">
          <input type="text" className="input" onChange={generateFormChangeHandler('title')} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <textarea className="textarea" onChange={generateFormChangeHandler('description')} />
        </div>
      </div>
      {/* TODO: make these look nicer */}
      <div className="field">
        <div className="control">
          <input type="date" onChange={generateFormChangeHandler('startDate')} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <input type="date" onChange={generateFormChangeHandler('endDate')} />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit">create</button>
        </div>
      </div>
    </form>
  );
};


export default EventForm;
