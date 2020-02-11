import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
/* eslint-disable */
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware, { END } from 'redux-saga';
import localForage from 'localforage';

import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const makeStore = initialState => {
  let store;

  const composeEnhancers =
    (typeof window !== 'undefined' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;
    
  const isClient = typeof window !== 'undefined';

  if (isClient) {
    const persistConfig = {
      key: 'root',
      storage: localForage
    };

    store = createStore(
      persistReducer(persistConfig, combineReducers(reducers)),
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    store.__PERSISTOR = persistStore(store);
  } else {
    store = createStore(
      combineReducers(reducers),
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  }

  store.runSaga = () => {
    // Avoid running twice
    if (store.saga) return;
    store.saga = sagaMiddleware.run(rootSaga);
  };

  store.stopSaga = async () => {
    // Avoid running twice
    if (!store.saga) return;
    store.dispatch(END);
    await store.saga.done;
    store.saga = null;
  };

  store.execSagaTasks = async (isServer, tasks) => {
    // run saga
    store.runSaga();
    // dispatch saga tasks
    tasks(store.dispatch);
    // Stop running and wait for the tasks to be done
    await store.stopSaga();
    // Re-run on client side
    if (!isServer) {
      store.runSaga();
    }
  };

  // Initial run
  store.runSaga();

  return store;
};

export default makeStore;
