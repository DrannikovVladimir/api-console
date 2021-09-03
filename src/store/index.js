import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, persistReducer} from 'redux-persist';
import requestReducer from './slices/requestSlice';
import storage from 'redux-persist/lib/storage';

import rootReducer from 'src/store/reducers/index';
import rootSaga from 'src/store/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const persistConfigAuth = {
  key: 'auth',
  storage,
  blacklist: ['authError'],
};

const persistConfigRequest = {
  key: 'request',
  storage,
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const {composeWithDevTools} = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(
    combineReducers({
      auth: persistReducer(persistConfigAuth, rootReducer.auth),
      request: persistReducer(persistConfigRequest, requestReducer),
    }),
    initialState,
    bindMiddleware([sagaMiddleware])
  );
  let persistor = persistStore(store);

  store.runSagaTask = () => {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  store.runSagaTask();
  return {
    store,
    persistor,
  };
}

export default configureStore;
