import React from 'react';
import ReactDOM from 'react-dom/client';
import { MdCancel } from 'react-icons/md';
import Form from './Screens/HomeScreen';

import UpdateScreen from './Screens/UpdateScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Form />
  </React.StrictMode>
);
