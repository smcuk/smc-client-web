import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Drawer from 'material-ui/Drawer';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Avatar from 'material-ui/Avatar';
import * as appActions from '../../containers/App/actions';
import { makeSelectGlobal, makeSelectFirebaseAuth } from '../../containers/App/selectors';
import Theme from '../../theming/theme';
import Styles from './styles';
import OpenViewsItems from './OpenViewItems';
import MenuItems from './MenuItems';
import { findMenuItem, scrollToOpenViewsItem, scrollToMenuItem } from './menuUtils';
import PlaceHolder from '../../placeholderavatar.svg';

const theme = new Theme();

class LeftDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTheme: theme.get(props.appStore.currentTheme)
    };

    this.initialMenuItem = this.initialMenuItem.bind(this);
    this.handleClickMenu = this.handleClickMenu.bind(this);
    this.handleClickOpenView = this.handleClickOpenView.bind(this);
    this.navigateUrl = this.navigateUrl.bind(this);
    this.animateRootMenu = this.animateRootMenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateMenuDimensions);
  }

  componentWillReceiveProps(newProps) {
    if (
      newProps.appStore.menus.length > 0 &&
      newProps.appStore.menus.length !== this.props.appStore.menus.length
    ) {
      this.initialMenuItem(newProps.appStore.menus);
    }

    if (newProps.appStore.currentTheme !== this.props.appStore.currentTheme) {
      this.setState({
        currentTheme: theme.get(newProps.appStore.currentTheme)
      });
    }
  }

  componentWillUpdate() {
    this.updateMenuDimensions();
  }

  componentDidUpdate() {
    this.updateMenuDimensions();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateMenuDimensions);
  }

  updateMenuDimensions() {
    const menuElement = document.querySelector('.views-menu > div > div');

    if (menuElement) {
      const height = window.innerHeight - menuElement.offsetTop;
      menuElement.style.height = `${height - 15}px`;
    }
  }

  initialMenuItem(menus) {
    const url = this.props.location.pathname;
    const { foundMenuItem } = findMenuItem(menus, 'url', url);

    if (foundMenuItem && foundMenuItem.id) {
      this.props.actions.selectMenuItem(foundMenuItem.id);
      this.props.actions.openView(foundMenuItem);
      scrollToMenuItem(foundMenuItem, menus);
    }
  }

  handleClickMenu(menuItem) {
    this.navigateUrl(menuItem, true);
  }

  handleClickOpenView(menuItem) {
    this.navigateUrl(menuItem, false);
  }

  navigateUrl(menuItem, isNavigatingFromMenu) {
    if (menuItem && menuItem.url) {
      this.props.history.push(menuItem.url);

      const { foundMenuItem } = findMenuItem(this.props.appStore.openViews, 'url', menuItem.url);
      if (!foundMenuItem) {
        this.props.actions.openView(menuItem);
      }

      if (isNavigatingFromMenu) {
        scrollToOpenViewsItem(menuItem, this.props.appStore.openViews);
      } else {
        scrollToMenuItem(menuItem, this.props.appStore.menus);
      }
    }
  }

  animateRootMenu(menu, child) {
    let className = ' hide';

    if (
      (menu.open && child.animatingRootMenu && !menu.willCloseRootMenu) ||
      child.animatingRootMenu === undefined
    ) {
      className = '';
    }
    return className;
  }

  render() {
    const currentTheme = this.state.currentTheme;
    const styles = Styles(currentTheme);
    const { navDrawerOpen } = this.props;
    const { email, displayName } = this.props.auth || { email: '', displayName: '' };

    return (
      <Drawer
        className={`left-drawner${navDrawerOpen ? ' open' : ' close'}`}
        docked={!this.props.isMobileBrowser}
        open={navDrawerOpen}
        onRequestChange={this.props.navDrawerToggle}
      >
        <div style={styles.logo}>SeeMyChain</div>
        <div style={styles.avatar.div}>
          <Avatar
            src={(this.props.auth && this.props.auth.providerData[0].photoURL) || PlaceHolder}
            size={50}
            style={styles.avatar.icon}
          />
          <span style={styles.avatar.span}>
            {displayName ||
              email.substring(
                0,
                email.indexOf('@')
              )}
          </span>
        </div>
        {this.props.appStore.showOpenViews ? (
          <OpenViewsItems
            styles={styles}
            isMobileBrowser={this.props.isMobileBrowser}
            handleClickMenu={this.handleClickOpenView}
            animateRootMenu={this.animateRootMenu}
          />
        ) : null}
        <MenuItems
          styles={styles}
          isMobileBrowser={this.props.isMobileBrowser}
          animateRootMenu={this.animateRootMenu}
          handleClickMenu={this.handleClickMenu}
        />
      </Drawer>
    );
  }
}

LeftDrawer.propTypes = {
  navDrawerOpen: PropTypes.bool,
  actions: PropTypes.any,
  appStore: PropTypes.any,
  location: PropTypes.any,
  isMobileBrowser: PropTypes.bool,
  navDrawerToggle: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LeftDrawer));
