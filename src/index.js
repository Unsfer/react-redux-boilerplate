import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, useRouterHistory } from 'react-router';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import Counter from './containers/Counter';
import extendRouter from './helpers/extendRouter';
import extendLocation from './helpers/extendLocation';
// import sagas from './sagas'

const store = configureStore();
// we can run all sagas here, but imho better pass store to components and let them decide which sagas needs to run
// store.runSaga(sagas);

const history = useRouterHistory(createHistory)({
  basename: process.env.PUBLIC_URL
});

class RootWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    location: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired,
  }

  getChildContext = () => ({
    location: extendLocation(this.props.location, this.props.params),
    router: extendRouter(this.props.router, this.props.location.basename),
    store,
  });

  render () {
    return (
      <Root store={store}>{this.props.children}</Root>
    );
  }
};

ReactDOM.render((
  <Router history={history}>
    <Route component={RootWrapper}>
      <Route path="/" component={Counter} />
      {/* <Route path="/" getComponents={
        (location, cb) => {
          cb(null, (props) => (
            <Counter />
          ));
        }}
      /> */}
    </Route>
  </Router>
),
  document.getElementById('root')
);
