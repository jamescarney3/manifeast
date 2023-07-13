import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { StoreContextProvider} from 'context';
import { AppLayout } from 'layouts';
import { NavBar } from 'components';
import Login from 'views/login';
import Dashboard from 'views/dashboard';


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
            </Routes>
          </AppLayout.Main>
        </AppLayout>
      </BrowserRouter>
    </StoreContextProvider>
  );
};


export default App;
