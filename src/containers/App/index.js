import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as appActions from './actions';
import { makeSelectGlobal, makeSelectFirebaseAuth } from './selectors';
import Auth from '../../containers/Auth';

import { withRouter, Route } from 'react-router-dom';
import Dashboard from '../../containers/DashboardPage';

import Home from '../../components/Home';
import './App.css';

export class App extends React.Component {
  render = () => {
    return (
      <div>
        {' '}
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Auth} />
      </div>
    );
  };
}

App.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number,
  location: PropTypes.object,
  routes: PropTypes.any,
  appStore: PropTypes.any,
  actions: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  appStore: makeSelectGlobal(),
  auth: makeSelectFirebaseAuth()
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
