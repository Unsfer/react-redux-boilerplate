import { fork } from 'redux-saga/effects';
import { requestIncrementIfOdd } from './CounterSaga';

function* root() {
  yield fork(requestIncrementIfOdd);
}
root.sagaID = 'root';

export default root;
