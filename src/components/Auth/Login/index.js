import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import { blue200 } from 'material-ui/styles/colors';
import styles from '../styles';
import Logo from '../../../logo.png';
import './login.css';

class Login extends React.PureComponent {
  render() {
    return (
      <div className="signup-container">
        <button className="signup-button signup-button-email" onClick={this.props.onSignInEmail}>
          <span className="signup-icon-svg">
            <svg className="signup-svg svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
              <path d="M4 6v13h17V6H4zm5.906 7.968l2.594 2.124 2.594-2.124 4.146 4.02H5.76l4.146-4.02zm-4.888 3.326V9.966l4.097 3.354-4.097 3.974zm10.867-3.974l4.097-3.354v7.328l-4.097-3.974zm4.097-6.308v1.643L12.5 14.78 5.018 8.655V7.012h14.964z" />
            </svg>{' '}
          </span>
          <div className="signup-button-labelset">
            <span className="signup-button-label signup-text">Continue with Email</span>
          </div>
        </button>
        <button
          className="signup-button signup-button-facebook"
          onClick={this.props.onSignInFacebook}
        >
          <span className="signup-icon-svg">
            <svg className="signup-svg svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
              <path d="M21 12.646C21 7.65 16.97 3.6 12 3.6s-9 4.05-9 9.046a9.026 9.026 0 0 0 7.59 8.924v-6.376H8.395V12.64h2.193v-1.88c0-2.186 1.328-3.375 3.267-3.375.93 0 1.728.07 1.96.1V9.77H14.47c-1.055 0-1.26.503-1.26 1.242v1.63h2.517l-.33 2.554H13.21V21.6c4.398-.597 7.79-4.373 7.79-8.954" />
            </svg>
          </span>
          <div className="signup-button-labelset">
            <span className="signup-button-label signup-text">Continue with Facebook</span>
            <span className="signup-button-label signup-subtext">We won't post without asking</span>
          </div>
        </button>
        <button
          className="signup-button signup-button-twitter"
          onClick={this.props.onSignInTwitter}
        >
          <span className="signup-icon-svg">
            <svg className="signup-svg svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
              <path d="M21.725 5.338c-.744.47-1.605.804-2.513 1.006a3.978 3.978 0 0 0-2.942-1.293c-2.22 0-4.02 1.81-4.02 4.02 0 .32.034.63.07.94-3.31-.18-6.27-1.78-8.255-4.23a4.544 4.544 0 0 0-.574 2.01c.04 1.43.74 2.66 1.8 3.38-.63-.01-1.25-.19-1.79-.5v.08c0 1.93 1.38 3.56 3.23 3.95-.34.07-.7.12-1.07.14-.25-.02-.5-.04-.72-.07.49 1.58 1.97 2.74 3.74 2.8a8.49 8.49 0 0 1-5.02 1.72c-.3-.03-.62-.04-.93-.07A11.447 11.447 0 0 0 8.88 21c7.386 0 11.43-6.13 11.414-11.414.015-.21.01-.38 0-.578a7.604 7.604 0 0 0 2.01-2.08 7.27 7.27 0 0 1-2.297.645 3.856 3.856 0 0 0 1.72-2.23" />
            </svg>
          </span>
          <div className="signup-button-labelset">
            <span className="signup-button-label signup-text">Continue with Twitter</span>
            <span className="signup-button-label signup-subtext">We won't post without asking</span>
          </div>
        </button>
        <button className="signup-button signup-button-google" onClick={this.props.onSignInGoogle}>
          <span className="signup-icon-svg">
            <svg className="signup-svg svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                  fill="#4285F4"
                />
                <path
                  d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                  fill="#34A853"
                />
                <path
                  d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                  fill="#EA4335"
                />
              </g>
            </svg>{' '}
          </span>
          <div className="signup-button-labelset">
            <span className="signup-button-label signup-text">Continue with Google</span>
          </div>
        </button>
      </div>
    );

    return (
      <div id="login-form">
        <div style={styles.boxContainer}>
          <Paper style={styles.paper}>
            <div style={styles.logoContainer}>
              <img style={{ width: 295, height: 54, fill: blue200 }} src={Logo} alt="Globi" />
            </div>
            {this.props.errorMessage ? (
              <div>
                <p style={styles.errorMessage}>* {this.props.errorMessage}</p>
              </div>
            ) : null}

            <form>
              <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth
                value={this.props.email}
                onChange={this.props.onEmailChange}
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth
                type="password"
                value={this.props.password}
                onChange={this.props.onPasswordChange}
              />

              <div style={styles.buttonsContainer}>
                <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  checked={this.props.rememberMe}
                  onCheck={this.props.onRememberMeChange}
                />

                <RaisedButton
                  label="Login"
                  primary
                  style={styles.boxBtn}
                  onClick={this.props.onSignIn}
                />
              </div>
            </form>
          </Paper>

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="Forgot Password?"
              onClick={this.props.onForgotPassword}
              style={styles.flatButton}
              icon={<FontIcon className="material-icons">help</FontIcon>}
            />
            <FlatButton
              label="Register"
              onClick={this.props.onRegister}
              style={styles.flatButton}
              icon={<FontIcon className="material-icons">person_add</FontIcon>}
            />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  rememberMe: PropTypes.any.isRequired,
  onRememberMeChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
  onSignInFacebook: PropTypes.func.isRequired,
  onSignInGoogle: PropTypes.func.isRequired,
  onSignInTwitter: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default Login;
