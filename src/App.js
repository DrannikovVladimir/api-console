import React from 'react';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import createStore from 'src/store';
import LoginPage from 'src/containers/LoginPage.jsx';
import ConsolePage from 'src/containers/ConsolePage.jsx';

const {store, persistor} = createStore();

const ConsoleRoute = ({ children, path }) => {
  const state = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => !!state.auth.sessionKey?.length);
  console.log(state);

  return (
    <Route path={path}>
      {isLoggedIn ? children : <Redirect to="/" />}
    </Route>
  );
};

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route path="/console">
              <ConsolePage />
            </Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
