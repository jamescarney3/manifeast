import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { StoreContextProvider} from 'context';
import Login from 'views/login';
import { Dashboard } from 'views/layouts';
import { NewEvent, ShowEvent } from 'views/events';
import { ShowMeal, NewMeal } from 'views/meals';


const App = () => {
  return (
    <StoreContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<div>[[ landing page placeholder ]]</div>} />
            <Route path="login" element={<Login />} />
            <Route path="events/new" element={<NewEvent />} />
            <Route path="events/:id" element={<Outlet />}>
              <Route index element={<ShowEvent />} />
              <Route path="meals/:mealId" element={<ShowMeal />} />
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
