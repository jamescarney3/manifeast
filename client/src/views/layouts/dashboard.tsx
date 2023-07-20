import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

import { NavBar } from 'components';
import { sessionsService } from 'services';
import { StoreContext } from 'context';


const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, getDisplayName, signIn, signOut } = useContext(StoreContext);

  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const loggedIn = useMemo(() => isLoggedIn(), [isLoggedIn]);
  const onLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (!loggedIn) {
      setLoading(true);
      sessionsService.signInWithToken()
        .then((data) => signIn(data))
        .finally(() => {
          setInitialized(true);
          setLoading(false);
        });
    }
  }, [loggedIn, setLoading, setInitialized, sessionsService.signInWithToken, signIn]);

  const handleSignOut = () => {
    sessionsService.signOut();
    signOut();
    navigate('/login');
  };

  if (!initialized || loading) return (<div>[[ loading spinner ]]</div>);
  return (
    <section>
      <NavBar
        displayName={getDisplayName()}
        onLoginPage={onLoginPage}
        loggedIn={loggedIn}
        onSignOut={handleSignOut}
      />
      <Outlet />
    </section>
  );
};


export default Dashboard;
