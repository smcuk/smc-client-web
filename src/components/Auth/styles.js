import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import { grey500, white, red500 } from 'material-ui/styles/colors';

const styles = {
  boxContainer: {
    display: 'flex',
    margin: 0,
    padding: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'auto',
    minHeight: '100vh',
    backgroundColor: 'darkgrey'
  },
  logoImg: {
    marginRight: 10,
    minWidth: 25
  },
  title: {
    fontSize: 22,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    height: 60
  },
  paper: {
    padding: 20,
    overflow: 'auto'
    // backgroundColor: 'rgb(240, 236, 236)'
  },
  buttonsDiv: {
    textAlign: 'center',
    padding: 10
  },
  flatButton: {
    color: 'white'
  },
  checkRemember: {
    style: {
      float: 'left',
      maxWidth: 180,
      paddingTop: 5
    },
    labelStyle: {
      color: grey500
    },
    iconStyle: {
      color: grey500,
      borderColor: grey500,
      fill: grey500
    }
  },
  boxBtn: {
    float: 'right'
  },
  btn: {
    background: '#4f81e9',
    color: white,
    padding: 7,
    borderRadius: 2,
    margin: 2,
    fontSize: 13
  },
  btnSpan: {
    marginLeft: 5
  },
  buttonsContainer: {
    marginTop: 50
  },
  errorMessage: {
    color: red500
  },
  instructions: {
    textAlign: 'center',
    color: grey500
  },
  logoContainer: {
    textAlign: 'center',
    width: 360,
    height: 80,
    paddingTop: 20
  },
  logoImage: {
    width: 295,
    height: 54
  },
  logoSmallContainer: {
    position: 'absolute',
    right: 20,
    top: 20
  }
};

export default styles;
