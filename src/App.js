import React from 'react';
import Main from './components/Main'
import UserContextProvider from './contexts/UserContext'

export default App => {
  return (
    <UserContextProvider>
      <Main />
    </UserContextProvider>
  );
}