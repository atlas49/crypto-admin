import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainPage from './pages/Main'

import AppContextProvider from '@state/context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const App = () => {
  return (
    <AppContextProvider>
      <MainPage />
    </AppContextProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
