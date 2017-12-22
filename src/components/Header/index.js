import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { createStructuredSelector } from 'reselect';
import FontIcon from 'material-ui/FontIcon';
import * as appActions from '../../containers/App/actions';
import { makeSelectGlobal, makeSelectFirebaseAuth } from '../../containers/App/selectors';
import Theme from '../../theming/theme';
import Styles from './styles';
import TabNav from './TabsNav';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import { compose } from 'redux';

const theme = new Theme();

// add this.props.firebase
class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.appStore.currentTheme)
    };

    this.signOut = this.signOut.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.appStore.currentTheme !== this.props.appStore.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.appStore.currentTheme)
      });
    }
  }

  signOut() {
    // this.props.actions.signOut();
    console.log('logout');
    this.props.firebase.logout();
  }

  googleLogin = loginData => {
    this.setState({ isLoading: true });
    return this.props.firebase
      .login({ provider: 'facebook', type: 'redirect' })
      .then(() => {
        this.setState({ isLoading: false });
        // this is where you can redirect to another route
      })
      .catch(error => {
        this.setState({ isLoading: false });
        console.log('there was an error', error);
        console.log('error prop:', this.props.authError); // thanks to connect
      });
  };

  render() {
    const { styles, handleChangeRequestNavDrawer, appStore, auth } = this.props;
    const style = Styles(appStore.isBoxedLayout, this.state.currentTheme);

    let authButton = null;
    if (isEmpty(auth)) {
      authButton = <MenuItem primaryText="Signin/Signup" onClick={this.googleLogin} />;
    } else {
      authButton = <MenuItem primaryText="Sign out" onClick={this.signOut} />;
    }

    return (
      <div>
        <AppBar
          style={{ ...styles, ...style.appBar }}
          title={<div>{this.props.appStore.showTabs ? <TabNav style={style} /> : null}</div>}
          iconElementLeft={
            <IconButton
              iconStyle={style.iconButton}
              style={style.menuButton}
              onClick={handleChangeRequestNavDrawer}
            >
              <FontIcon
                color={this.state.currentTheme.appBarMenuButtonColor}
                className="material-icons"
              >
                menu
              </FontIcon>
            </IconButton>
          }
          iconElementRight={
            <div style={style.iconsRightContainer}>
              <IconMenu
                color={this.state.currentTheme.appBarMenuButtonColor}
                iconButtonElement={
                  <IconButton>
                    <FontIcon
                      color={this.state.currentTheme.appBarMenuButtonColor}
                      className="material-icons"
                    >
                      more_vert_icon
                    </FontIcon>
                  </IconButton>
                }
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                {authButton}
              </IconMenu>
            </div>
          }
        />
      </div>
    );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
  handleChangeRequestNavDrawer: PropTypes.func,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  appStore: PropTypes.any
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

export default compose(firebaseConnect(), connect(mapStateToProps, mapDispatchToProps))(Header);
