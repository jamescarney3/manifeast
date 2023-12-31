import React, { useState } from 'react';
import { Link } from 'react-router-dom';


// TODO: this is connected so is it maybe a 'partial' view instead? tbd
const NavBar = ({ displayName, onLoginPage, loggedIn, onSignOut }) => {
  const [active, setActive] = useState(false);

  const burgerClass = [
    'navbar-burger',
    active && 'is-active',
    onLoginPage && 'is-hidden',
  ].filter(Boolean).join(' ');

  const burgerAriaExpanded = active ? 'true' : 'false';

  const menuClass = [
    'navbar-menu',
    active && 'is-active',
    onLoginPage && 'is-hidden',
  ].filter(Boolean).join(' ');

  const renderAuthButton = () => {
    if (onLoginPage) return null;
    if (!loggedIn) {
      return (
        <Link to="/login" className="button is-secondary">
          <span className="icon"><i className="fas fa-sign-in-alt"></i></span>
          <span>Login</span>
        </Link>
      );
    } else {
      return (
        <button className="button is-secondary" onClick={onSignOut}>
          <span className="icon"><i className="fas fa-sign-in-alt"></i></span>
          <span>Logout</span>
        </button>
      );
    }
  };

  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link className="button is-primary" to="/">
            <span className="icon"><i className="fas fa-home"></i></span>
            <span>Home</span>
          </Link>
        </div>
        <button
          className={burgerClass}
          aria-label="menu"
          aria-expanded={burgerAriaExpanded}
          onClick={() => setActive(!active)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <div className={menuClass}>
        <div className="navbar-start">
          <div className="navbar-item">{displayName}</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">{renderAuthButton()}</div>
        </div>
      </div>
    </nav>
  );
};


export default NavBar;
