/**
 * Create the store with dynamic reducers
 */

import { StoreEnhancer, configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducer';

const sagaMiddleware = createSagaMiddleware({});

export function configureAppStore() {
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga : sagaMiddleware.run,
    }) ] as StoreEnhancer[];

  const rootReducer = createReducer();

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middlewares);
    },
    devTools: process.env.NODE_ENV !== 'production',
    enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),
  });

  if (process.env.NODE_ENV !== 'production' && (module as any).hot) {
    (module as any).hot.accept('./reducer', () => store.replaceReducer(rootReducer));
  }

  return store;
}

export const store = configureAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
