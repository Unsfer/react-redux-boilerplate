export const INCREMENT_COUNTER = 'Counter/INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'Counter/DECREMENT_COUNTER';
export const REQUEST_INCREMENT_IF_ODD = 'Counter/REQUEST_INCREMENT_IF_ODD';
export const LOADING_COUNTER = 'Counter/LOADING_COUNTER';
export const ERROR_COUNTER = 'Counter/ERROR_COUNTER';

export function increment() {
  return {
    type: INCREMENT_COUNTER,
  };
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER,
  };
}

export function requestIncrement() {
  return {
    type: REQUEST_INCREMENT_IF_ODD,
  }
}

export function startLoading() {
  return {
    type: LOADING_COUNTER,
  };
}

export function setError(error) {
  return {
    type: ERROR_COUNTER,
    error,
  };
}
