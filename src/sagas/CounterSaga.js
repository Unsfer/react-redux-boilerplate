import { take, put, call, select } from 'redux-saga/effects';
import * as actions from '../actions/CounterActions';
import { counter as counterSelector } from '../reducers/selectors';

export function asyncCheckCounter(counter) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (counter && counter.value % 2 !== 0) {
        resolve();
      } else {
        reject('Not odd!');
      }
    }, 3000);
  });
}

export function* asyncIncrementIfOdd() {
  const counter = yield select(counterSelector);
  yield put( actions.startLoading() );
  try {
    yield asyncCheckCounter(counter);
    yield put(actions.increment());
  } catch (err) {
    yield put(actions.setError(err));
  }
}

export function* requestIncrementIfOdd() {
  while (true) {
    /* const args = */yield take(actions.REQUEST_INCREMENT_IF_ODD)
    yield call(asyncIncrementIfOdd /*, args */);
  }
}
requestIncrementIfOdd.sagaID = 'requestIncrementIfOdd';
