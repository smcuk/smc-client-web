import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectGlobal, makeSelectFirebaseAuth } from '../App/selectors';
import ThemeDefault from '../../theming/themes/theme-default';
import ThemeLight from '../../theming/themes/theme-default';
import * as appActions from '../../containers/App/actions';
import EmailLogin from '../../components/Auth/EmailLogin';
import Register from '../../components/Auth/Register';
import ForgotPassword from '../../components/Auth/ForgotPassword';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import { compose } from 'redux';
import Loading from '../../components/Loading';
import { userIsNotAuthenticatedRedir } from '../Auth/auth-routing';
import { withRouter } from 'react-router-dom';
import AuthOptions from '../../components/Auth/AuthOptions';

// add this.props.firebase
class AuthPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);

    this.state = {
      login: {
        email: '', // default values, leave it empty when implementing your logic
        password: '', // default values, leave it empty when implementing your logic
        rememberMe: false
      },
      register: {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      forgotPassword: {
        email: ''
      },
      showEmailLogin: false,
      showForgotPassword: false,
      showRegister: false,
      errorMessage: '',
      isLoading: false,
      isSigningIn: false
    };

    this.showLogin = this.showLogin.bind(this);
    this.showForgotPassword = this.showForgotPassword.bind(this);
    this.showRegister = this.showRegister.bind(this);

    this.register = this.register.bind(this);
    this.registerFullNameChanged = this.registerFullNameChanged.bind(this);
    this.registerEmailChanged = this.registerEmailChanged.bind(this);
    this.registerPasswordChanged = this.registerPasswordChanged.bind(this);
    this.registerConfirmPasswordChanged = this.registerConfirmPasswordChanged.bind(this);

    this.resetPassword = this.resetPassword.bind(this);
    this.forgotPasswordEmailChanged = this.forgotPasswordEmailChanged.bind(this);

    this.signIn = this.signIn.bind(this);
    this.loginEmailChanged = this.loginEmailChanged.bind(this);
    this.loginPasswordChanged = this.loginPasswordChanged.bind(this);
    this.loginRememberMeChanged = this.loginRememberMeChanged.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.appStore.authenticationErrorMessage !==
      this.props.appStore.authenticationErrorMessage
    ) {
      this.setState({
        errorMessage: newProps.appStore.authenticationErrorMessage
      });
    }
  }

  signIn() {
    // validations goes here

    const payload = {
      email: this.state.login.email,
      password: this.state.login.password,
      rememberMe: this.state.login.rememberMe
    };

    this.setState({ isSigningIn: true });
    this.props.firebase
      .login(payload)
      .then(() => {
        this.setState({ isSigningIn: false });
        // this is where you can redirect to another route
      })
      .catch(error => {
        this.setState({ isSigningIn: false });
        console.log('there was an error', error);
        console.log('error prop:', this.props.authError); // thanks to connect
      });
  }

  signInFacebook = loginData => {
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

  signInTwitter = loginData => {
    this.setState({ isLoading: true });
    return this.props.firebase
      .login({ provider: 'twitter', type: 'redirect' })
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

  signInGoogle = loginData => {
    this.setState({ isLoading: true });
    return this.props.firebase
      .login({ provider: 'google', type: 'redirect' })
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

  loginEmailChanged(event) {
    const login = this.state.login;
    login.email = event.target.value;

    this.setState({
      login
    });

    this.props.actions.clearAuthenticationMessage();
  }

  loginPasswordChanged(event) {
    const login = this.state.login;
    login.password = event.target.value;

    this.setState({
      login
    });

    this.props.actions.clearAuthenticationMessage();
  }

  loginRememberMeChanged() {
    const login = this.state.login;
    login.rememberMe = !login.rememberMe;

    this.setState({
      login
    });
  }

  register() {
    // validations goes here

    const payload = {
      email: this.state.register.email,
      password: this.state.register.password
    };

    this.props.firebase.createUser(payload);
  }

  registerFullNameChanged(event) {
    const register = this.state.register;
    register.fullName = event.target.value;

    this.setState({
      register
    });
  }

  registerEmailChanged(event) {
    const register = this.state.register;
    register.email = event.target.value;

    this.setState({
      register
    });
  }

  registerPasswordChanged(event) {
    const register = this.state.register;
    register.password = event.target.value;

    this.setState({
      register
    });
  }

  registerConfirmPasswordChanged(event) {
    const register = this.state.register;
    register.confirmPassword = event.target.value;

    this.setState({
      register
    });
  }

  resetPassword() {
    // validations goes here

    const payload = {
      email: this.state.forgotPassword.email
    };

    this.props.actions.resetPassword(payload);
  }

  forgotPasswordEmailChanged(event) {
    this.setState({
      forgotPassword: {
        email: event.target.value
      }
    });
  }

  showLogin() {
    this.setState({
      showRegister: false,
      showForgotPassword: false
    });
  }

  showRegister() {
    this.setState({
      showRegister: true,
      showForgotPassword: false
    });
  }

  showEmailLogin = () => {
    this.setState({
      showEmailLogin: true
    });
  };

  hideEmailLogin = () => {
    this.setState({
      showEmailLogin: false
    });
  };

  showForgotPassword() {
    this.setState({
      showRegister: false,
      showForgotPassword: true
    });
  }

  render() {
    const { auth } = this.props;

    if (!isLoaded(auth) || this.state.isLoading) {
      return <Loading />;
    }

    if (isEmpty(auth)) {
      return (
        <MuiThemeProvider muiTheme={ThemeLight}>
          <div>
            {this.state.showRegister ? (
              <div>
                <Register
                  fullName={this.state.register.fullName}
                  onFullNameChange={this.registerFullNameChanged}
                  email={this.state.register.email}
                  onEmailChange={this.registerEmailChanged}
                  password={this.state.register.password}
                  onPasswordChange={this.registerPasswordChanged}
                  confirmPassword={this.state.register.confirmPassword}
                  onConfirmPasswordChange={this.registerConfirmPasswordChanged}
                  onRegister={this.register}
                  onGoBack={this.showLogin}
                />
              </div>
            ) : (
                <div>
                  {this.state.showForgotPassword ? (
                    <ForgotPassword
                      email={this.state.forgotPassword.email}
                      onEmailChange={this.forgotPasswordEmailChanged}
                      onGoBack={this.showLogin}
                    />
                  ) : (
                      <div>
                        {!this.state.showEmailLogin ? (
                          <AuthOptions
                            onSignInFacebook={this.signInFacebook}
                            onSignInGoogle={this.signInGoogle}
                            onSignInTwitter={this.signInTwitter}
                            showEmailLogin={this.showEmailLogin}
                          />
                        ) : (
                            <EmailLogin
                              email={this.state.login.email}
                              onEmailChange={this.loginEmailChanged}
                              password={this.state.login.password}
                              onPasswordChange={this.loginPasswordChanged}
                              onRegister={this.showRegister}
                              onSignIn={this.signIn}
                              rememberMe={this.state.login.rememberMe}
                              onRememberMeChange={this.loginRememberMeChanged}
                              onForgotPassword={this.showForgotPassword}
                              errorMessage={this.state.errorMessage}
                              hideEmailLogin={this.hideEmailLogin}
                              loading={this.state.isSigningIn}
                            />
                          )}
                      </div>
                    )}
                </div>
              )}
          </div>
        </MuiThemeProvider>
      );
    }
  }
}

AuthPage.propTypes = {
  actions: PropTypes.any,
  appStore: PropTypes.any,
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  })
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

export default compose(
  firebaseConnect(),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  userIsNotAuthenticatedRedir
)(AuthPage);
