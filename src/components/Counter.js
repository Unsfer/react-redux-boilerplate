import React, { Component, PropTypes } from 'react';

export default class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    requestIncrement: PropTypes.func.isRequired,
    counter: PropTypes.object.isRequired
  };

  render() {
    const { increment, requestIncrement, decrement, counter } = this.props;
    return (
      <div>
        Clicked: {counter.value} times
        {' '}
        {!counter.error && counter.loading && <div>wait...</div>}
        {!counter.loading &&
          <div>
            <button onClick={increment}>+</button>
            {' '}
            <button onClick={decrement}>-</button>
            {' '}
            <button onClick={requestIncrement}>async increment if odd</button>
          </div>
        }
        {counter.error && <div style={{ color: 'red' }}>{`Error: ${counter.error}`}</div>}
      </div>
    );
  }
}
