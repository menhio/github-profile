import React from 'react';
import Main from './components/Main'
import UserContextProvider from './contexts/UserContext'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Profile from './components/Profile'

export default App => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/profile" exact component={Profile} />
        </Switch>
      </UserContextProvider>
    </BrowserRouter>
  );
}