import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import createStore from 'src/store';
import LoginPage from 'src/containers/LoginPage.jsx';
import ConsolePage from 'src/containers/ConsolePage.jsx';

const {store, persistor} = createStore();

const getAuth = (authData) => {
  if (!authData) {
    return false;
  }

  return authData.sessionKey !== 'null';
}

const ConsoleRoute = ({children, exact, path}) => {
  const authData = JSON.parse(localStorage.getItem('persist:auth'));
  const auth = getAuth(authData);

  return (
    <Route path={path} exact={exact}>
      {auth
        ? children
        : <Redirect to="/login" />}
    </Route>
  );
};

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <ConsoleRoute exact path="/">
              <ConsolePage />
            </ConsoleRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
