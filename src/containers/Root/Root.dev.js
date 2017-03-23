import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import DevTools from '../DevTools';
import styles from './index.css';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div>
          <div className={styles.app}>
            {this.props.children}
          </div>
          <DevTools />
        </div>
      </Provider>
    );
  }
}
