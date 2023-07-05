import React from 'react';
import { createRoot } from 'react-dom/client';


const domNode = document.getElementById('mount');
const root = createRoot(domNode);

root.render(React.createElement(() => ('hello react app')));

if (module.hot) {
  module.hot.accept();
}
