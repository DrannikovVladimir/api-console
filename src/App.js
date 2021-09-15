import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import createStore from 'src/store';
import LoginPage from 'src/containers/LoginPage.jsx';
import ConsolePage from 'src/containers/ConsolePage.jsx';

const {store, persistor} = createStore();

const ConsoleRoute = ({children, path}) => {
  const authData = JSON.parse(localStorage.getItem('persist:auth'));

  return (
    <Route path={path}>
      {!!authData.sessionKey ? children : <Redirect to="/" />}
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
            <ConsoleRoute path="/console">
              <ConsolePage />
            </ConsoleRoute>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
