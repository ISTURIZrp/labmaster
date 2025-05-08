import React from 'react';
import AuthLoginForm from './components/AuthLoginForm';
import LayoutMainDashboard from './components/LayoutMainDashboard';

const App = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <>
      {!currentUser ? (
        <AuthLoginForm />
      ) : (
        <LayoutMainDashboard />
      )}
    </>
  );
};

export default App;

// DONE