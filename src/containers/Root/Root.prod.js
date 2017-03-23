import React, { Component } from 'react';
import { Provider } from 'react-redux';
import styles from './index.css';

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div className={styles.app}>
          {this.props.children}
        </div>
      </Provider>
    );
  }
}
