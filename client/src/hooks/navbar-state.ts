import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { StoreContext } from 'context';
import { sessionsService } from 'services';


const useNavBarState = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, getDisplayName, signIn, signOut } = useContext(StoreContext);

  const [ready, setReady] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const loggedIn = isLoggedIn();
  const displayName = getDisplayName();
  const onLoginPage = location.pathname === '/login';

  useEffect((): void  => {
    sessionsService.signInWithToken()
      .then((data) => signIn(data))
      .finally(() => setReady(true));
  }, [sessionsService, signIn, setReady]);

  useEffect(() => {
    setActive(false);
  }, [location, setActive]);

  const handleMenuClick = (): void => {
    setActive(!active);
  };

  const handleSignOut = (): void => {
    sessionsService.signOut();
    signOut();
    navigate('/login');
  };

  return { location, ready, active, displayName, loggedIn, onLoginPage, handleMenuClick, handleSignOut };
};


export default useNavBarState;
