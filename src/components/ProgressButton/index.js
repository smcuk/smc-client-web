import React from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import { green500, green700 } from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import Spinner from '../../components/Spinner';

const classes = {
  root: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    margin: 0,
    position: 'relative'
  },
  buttonSuccess: {
    backgroundColor: green500,
    '&:hover': {
      backgroundColor: green700
    }
  },
  fabProgress: {
    color: '',
    position: 'absolute',
    top: -2,
    left: -2
  },
  buttonProgress: {
    color: green500,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
};

class ProgressButton extends React.Component {
  render() {
    const { loading, success, style } = this.props;

    const buttonClassname = classNames({
      [classes.buttonSuccess]: success
    });

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <RaisedButton
            primary
            className={buttonClassname}
            disabled={loading}
            onClick={this.props.onSignIn}
            style={style}
            label={this.props.label}
          />
          {loading && (
            <Spinner
              style={{
                display: 'inline-block'
              }}
              name="circle"
              color="darkgrey"
            />
          )}
        </div>
      </div>
    );
  }
}

ProgressButton.propTypes = {
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired
};

export default ProgressButton;
