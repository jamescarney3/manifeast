import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { StoreContextProvider} from 'context';
import Login from 'views/login';
import { Dashboard } from 'views/layouts';
import { EventContainer, EventsContainer, IndexEvents, NewEvent, ShowEvent } from 'views/events';
import { MealContainer, ShowMeal, NewMeal } from 'views/meals';
import { NewComponent } from 'views/components';


const App = () => {
  return (
    <StoreContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Navigate to="events" />} />
            <Route path="login" element={<Login />} />
            <Route path="events" element={<EventsContainer />}>
              <Route index element={<IndexEvents />} />
            </Route>
            <Route path="events/new" element={<NewEvent />} />
            <Route path="events/:eventId" element={<EventContainer />}>
              <Route index element={<ShowEvent />} />
              <Route path="meals/:mealId" element={<MealContainer />}>
                <Route index element={<ShowMeal />} />
                <Route path="components/new" element={<NewComponent />} />
              </Route>
              <Route path="meals/new" element={<NewMeal />} />
            </Route>
            <Route path="*" element={<div>[[ not found placeholder ]]</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreContextProvider>
  );
};


export default App;
