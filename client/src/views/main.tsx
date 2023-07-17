import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StoreContextProvider} from 'context';
import { AppLayout } from 'layouts';
import { NavBar } from 'components';
import Login from 'views/login';
import Dashboard from 'views/dashboard';
import { NewEvent, ShowEvent } from 'views/events';


const App = () => {
  return (
    <StoreContextProvider>
      <BrowserRouter>
        <AppLayout>
          <AppLayout.NavBar>
            <NavBar />
          </AppLayout.NavBar>
          <AppLayout.Main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/events/new" element={<NewEvent />} />
              <Route path="/events/:id" element={<ShowEvent />} />
            </Routes>
          </AppLayout.Main>
        </AppLayout>
      </BrowserRouter>
    </StoreContextProvider>
  );
};


export default App;
