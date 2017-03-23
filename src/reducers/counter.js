import { INCREMENT_COUNTER, DECREMENT_COUNTER, LOADING_COUNTER, ERROR_COUNTER } from '../actions/CounterActions';

const initialState = {
  value: 0,
  loading: false,
  error: null,
};

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { ...state, value: (state.value || 0) + 1, loading: false, error: null };
    case DECREMENT_COUNTER:
      return { ...state, value: (state.value || 0) - 1, loading: false, error: null };
    case LOADING_COUNTER:
      return { ...state, loading: true, error: null };
    case ERROR_COUNTER:
      return { ...state, loading: false, error: action.error || true };
    default:
      return state;
  }
}
