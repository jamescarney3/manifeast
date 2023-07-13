import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { usersService, sessionsService } from 'services';
import { StoreContext } from 'context';
import { Utils } from 'types';


type LoginFormState = {
  email: string,
  password: string,
};

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useContext(StoreContext);

  // TODO: move all of this to a state hook
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState<Utils.Nullable<string>>(null);

  const generateFormChangeHandler = (key: string) => (val: string): void => {
    setFormState({ ...formState, [key]: val.target.value });
  };

  const handleRegister = () => {
    usersService.createUser(formState.email, formState.password)
      .then((user) => signIn(user))
      .then(() => navigate('/'))
      .catch((error) => setLoginError(error));
  };

  const handleLogin = () => {
    sessionsService.signIn(formState.email, formState.password)
      .then((user) => signIn(user))
      .then(() => navigate('/'))
      .catch((error) => setLoginError(error));
  };

  const renderError = () => {
    if (!loginError) return null;
    return (
      <div>{JSON.stringify(loginError)}</div>
    );
  };

  return (
    <section>
      <div className="container pt-6">
        <div className="columns is-centered">
          <div className="column is-half">
            {renderError()}
            <div className="field">
              <label>Email</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="email"
                  onChange={generateFormChangeHandler('email')}
                />
                <span className="icon is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  onChange={generateFormChangeHandler('password')}
                />
                <span className="icon is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-primary" onClick={handleLogin}>Login</button>
              </div>
              <div className="control">
                <button className="button" onClick={handleRegister}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Login;
