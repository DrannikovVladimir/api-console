import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import createStore from 'src/store';
import LoginPage from 'src/containers/LoginPage.jsx';
import ConsolePage from 'src/containers/ConsolePage.jsx';

const {store, persistor} = createStore();
// console.log(localStorage);
// console.log(document.cookie);
// console.log(store.getState());
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
