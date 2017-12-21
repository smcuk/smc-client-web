import React from 'react';

// import Data from '../../data';
import { userIsAuthenticated } from '../Auth/auth-routing';
import PageBase from '../../components/PageBase';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
// import { reduxFirebase as fbReduxSettings } from 'config';
import { connect } from 'react-redux';

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
      <PageBase navigation="SeeMyChain / Dashboard" noWrapContent loading={this.state.loading} />
    );
  }
}

export default connect(({ firebase }) => ({
  auth: pathToJS(firebase, 'auth'),
  account: pathToJS(firebase, 'profile')
}))(DashboardPage);

// export default userIsAuthenticated(
//   firebaseConnect(
//     connect(({ firebase }) => ({
//       auth: pathToJS(firebase, 'auth'),
//       account: pathToJS(firebase, 'profile')
//     }))
//   )(DashboardPage)
// );
