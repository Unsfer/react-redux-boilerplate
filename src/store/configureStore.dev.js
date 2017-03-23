import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import createSagaMiddleware from 'redux-saga';
import enhanceStoreToControlSagas from './enhanceStoreToControlSagas';
import sagaMonitor from './sagaMonitor';

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

// let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  enhanceStoreToControlSagas(store, sagaMiddleware);
  return store;
}
