import React from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header';
import LeftDrawer from '../../components/LeftDrawer';
import * as appActions from '../App/actions';
import { makeSelectGlobal, makeSelectFirebaseAuth } from '../App/selectors';
import Auth from '../../containers/Auth';
import Theme from '../../theming/theme';
import Styles from './styles';
import { updateContentDimensions, getCurrentTheme } from '../App/appUtils';
import { findMenuItem } from '../../components/LeftDrawer/menuUtils';
import { withRouter, Route, Link } from 'react-router-dom';

const theme = new Theme();

class App extends React.Component {
  constructor(props) {
    super(props);

    let isMobileBrowser = false;

    if (
      /Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      isMobileBrowser = true;
    }

    this.state = {
      navDrawerOpen: false,
      currentTheme: theme.get(props.appStore.currentTheme),
      themeSelected: 'dark',
      isMobileBrowser
    };

    this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
    this.renderPages = this.renderPages.bind(this);
  }

  componentWillMount() {
    const { width } = this.props;
    this.setState({ navDrawerOpen: width === LARGE });

    // dispatch this action to load the menu
    this.props.actions.loadMenu();
  }

  componentDidMount() {
    window.addEventListener('resize', updateContentDimensions);
  }

  componentWillReceiveProps(nextProps) {
    /*     const nextRoute = nextProps.routes[nextProps.routes.length - 1];
    const currentRoute = this.props.routes[this.props.routes.length - 1];

    // Any change on routes are catch here
    if (nextRoute !== currentRoute) {
      let url = nextRoute.path;
      url = (url.indexOf('/') > -1 ? '' : '/') + url;
      const { foundMenuItem } = findMenuItem(this.props.appStore.menus, 'url', url);

      if (foundMenuItem) {
        // Select menu item
        this.props.actions.selectMenuItem(foundMenuItem.id);
      }
    } */

    if (this.props.width !== nextProps.width) {
      this.setState({ navDrawerOpen: nextProps.width === LARGE });
    }

    if (nextProps.appStore.currentTheme !== this.props.appStore.currentTheme) {
      this.setState({
        currentTheme: theme.get(nextProps.appStore.currentTheme)
      });
    }
  }

  componentWillUpdate() {
    updateContentDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', updateContentDimensions);
  }

  handleChangeRequestNavDrawer() {
    console.log('handleChangeRequestNavDrawer');

    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  renderPages() {
    const { width, navDrawerOpen } = this.state;
    const currentTheme = this.state.currentTheme;
    const styles = Styles(currentTheme, width, navDrawerOpen);

    const path = this.props.location.pathname;
    const currentRoute = path;

    return (
      <div
        className={
          this.props.appStore.currentTheme +
          (this.props.appStore.isBoxedLayout ? ' layout-boxed' : ' layout-fluid')
        }
      >
        <Header
          styles={styles.header}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
        />

        <LeftDrawer
          navDrawerOpen={navDrawerOpen}
          location={this.props.location}
          isMobileBrowser={this.state.isMobileBrowser}
          currentRoute={currentRoute}
          navDrawerToggle={this.handleChangeRequestNavDrawer}
        />

        <div className="main-container" style={styles.container}>
          <ReactCSSTransitionGroup
            transitionName="transition-animation"
            transitionAppear
            transitionAppearTimeout={1500}
            transitionEnterTimeout={0}
            transitionLeave={false}
          >
            {this.props.children}
          </ReactCSSTransitionGroup>

        </div>
      </div>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getCurrentTheme(this.props.appStore.currentTheme)}>
        {this.renderPages()}
      </MuiThemeProvider>
    );
  }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withWidth()(App)));
