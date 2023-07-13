import React from 'react';


const getChildOfType = (children, component) => {
  return React.Children.toArray(children).find((c) => c.type === component);
};


export default { getChildOfType };
