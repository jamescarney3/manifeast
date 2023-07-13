import React from 'react';

import { domUtils } from 'utils';


const { getChildOfType } = domUtils;

const AppLayoutNavBar = ({ children }) => children;
const AppLayoutMain = ({ children }) => children;

const AppLayout = ({ children }) => {
  const navBarChild = getChildOfType(children, AppLayoutNavBar);
  const mainSectionChild = getChildOfType(children, AppLayoutMain);

  return (
    <div>
      <div>
        {navBarChild && navBarChild.props.children}
      </div>
      <div>
        {mainSectionChild && mainSectionChild.props.children}
      </div>
    </div>
  );
};

AppLayout.NavBar = AppLayoutNavBar;
AppLayout.Main = AppLayoutMain;


export default AppLayout;
