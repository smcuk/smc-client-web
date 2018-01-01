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
import Logo from '../../../logo.svg';
import ProgressButton from '../../ProgressButton';

class Login extends React.PureComponent {
  render() {
    return (
      <div id="login-form">
        <div style={styles.boxContainer}>
          <Paper style={styles.paper}>
            <div style={styles.logoContainer}>
              <img style={{ width: 295, height: 54 }} src={Logo} alt="SeeMyChain" />
            </div>

            {this.props.errorMessage ? (
              <div>
                <p style={styles.errorMessage}>* {this.props.errorMessage}</p>
              </div>
            ) : null}

            <form>
              <TextField
                style={styles.textField}
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth
                name="userid"
                value={this.props.email}
                onChange={this.props.onEmailChange}
                autoComplete="on"
              />
              <TextField
                style={styles.textField}
                name="password"
                hintText="Password"
                floatingLabelText="Password"
                fullWidth
                type="password"
                value={this.props.password}
                onChange={this.props.onPasswordChange}
                autoComplete="on"
              />

              <div style={styles.buttonsContainer}>
                {/* <Checkbox
                  label="Remember me"
                  style={styles.checkRemember.style}
                  labelStyle={styles.checkRemember.labelStyle}
                  iconStyle={styles.checkRemember.iconStyle}
                  checked={this.props.rememberMe}
                  onCheck={this.props.onRememberMeChange}
                /> */}

                <ProgressButton
                  style={Object.assign(styles.boxBtnSignin, styles.flatButton)}
                  label="Login"
                  onSignIn={this.props.onSignIn}
                  success={true}
                  loading={this.props.loading}
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

          <div style={styles.buttonsDiv}>
            <FlatButton
              label="← All signin options"
              onClick={this.props.hideEmailLogin}
              style={styles.flatButton}
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
  onForgotPassword: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Login;
