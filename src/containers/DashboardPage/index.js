import React from 'react';

// import Data from '../../data';
import { userIsAuthenticatedRedir } from '../Auth/auth-routing';
import PageBase from '../../components/PageBase';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Layout from '../Layout';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    return (
      <Layout>
        <PageBase navigation="SeeMyChain / Dashboard" noWrapContent loading={this.state.loading}>
          <span>GRRRRR</span>
        </PageBase>
      </Layout>
    );
  }
}

export default compose(
  firebaseConnect(),
  userIsAuthenticatedRedir,
  connect(({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  }))
)(DashboardPage);
