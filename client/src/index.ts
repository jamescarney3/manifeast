import React from 'react';
import { createRoot } from 'react-dom/client';

import App from 'views/main';


const domNode = document.getElementById('mount');
const root = createRoot(domNode);

root.render(React.createElement(App));

if (module.hot) {
  module.hot.accept();
}
