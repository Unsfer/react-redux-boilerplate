import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../../components/Counter';
import * as CounterActions from '../../actions/CounterActions';
import { requestIncrementIfOdd } from '../../sagas/CounterSaga';

class CounterApp extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { store } = this.context;
    store.runSaga(requestIncrementIfOdd);
  }

  componentWillUnmount() {
    const { store } = this.context;
    store.stopSagaByName(requestIncrementIfOdd.sagaID);
  }

  render() {
    const { counter, dispatch } = this.props;
    return (
      <Counter counter={counter}
        {...bindActionCreators(CounterActions, dispatch)}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
});

export default connect(mapStateToProps)(CounterApp);
