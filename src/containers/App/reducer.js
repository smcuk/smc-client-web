import { fromJS } from 'immutable';
import * as ActionTypes from './constants';

export const initialState = fromJS({
  menus: [],
  openViews: [],
  selectedMenuIndex: 0,
  selectedMenuItem: null,
  selectedOpenedMenuIndex: 0,
  selectedOpenedMenuItem: null,
  currentTheme: 'lightTheme', // darkTheme, lightTheme, blueTheme, grayTheme, darkBlueTheme
  openSettingDrawer: false,
  showTabs: false,
  showOpenViews: false,
  isBoxedLayout: false
});

function setBodyBackground(currentTheme) {
  const body = document.querySelector('body');

  switch (currentTheme) {
    case 'darkTheme':
      body.style.backgroundColor = '#37474f';
      break;
    case 'lightTheme':
      body.style.backgroundColor = '#eee';
      break;
    case 'blueTheme':
      body.style.backgroundColor = '#3e6e99';
      break;
    case 'grayTheme':
      body.style.backgroundColor = '#575f6a';
      break;
    case 'darkBlueTheme':
      body.style.backgroundColor = '#303a47';
      break;
    default:
      body.style.backgroundColor = 'white';
      break;
  }
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_LAYOUT: {
      const currentTheme = state.get('currentTheme');
      setBodyBackground(currentTheme);

      return state.set('isBoxedLayout', action.isBoxedLayout);
    }
    case ActionTypes.CHANGE_THEME: {
      setBodyBackground(action.theme);

      return state.set('currentTheme', action.theme);
    }
    case ActionTypes.CHANGE_SHOWS_TABS:
      return state.set('showTabs', action.value);
    case ActionTypes.CHANGE_SHOW_OPEN_VIEWS:
      return state.set('showOpenViews', action.value);

    case ActionTypes.LOAD_MENU_SUCCESS: {
      const data = action.data;

      return state
        .set('menus', data.menus)
        .set('openViews', data.openViews)
        .set('selectedMenuItem', data.selectedMenuItem)
        .set('selectedOpenedMenuItem', data.selectedOpenedMenuItem);
    }
    case ActionTypes.OPEN_VIEW: {
      const openViews = state.get('openViews');

      if (openViews.indexOf(action.menuItem) === -1) {
        openViews.push(action.menuItem);
        return state.set('openViews', openViews);
      }
      return state;
    }
    case ActionTypes.CLOSE_VIEW: {
      const menus = state.get('menus');
      const openViews = Object.assign([], state.get('openViews'));

      let itemFound = openViews.find(item => item.id === action.id);

      const indexToBeRemoved = openViews.indexOf(itemFound);
      let openedIndex = 0;

      if (indexToBeRemoved > 0) {
        openedIndex = indexToBeRemoved - 1;
      }

      const itemOpenedFound = openViews[openedIndex];
      let menuIndex;

      menus.forEach(menu => {
        if (itemOpenedFound.id === menu.id) {
          itemFound = menu;
          menuIndex = menu.index;
        }
        if (menu.children) {
          menu.children.forEach(child => {
            if (itemOpenedFound.id === child.id) {
              itemFound = child;
              menuIndex = child.index;
            }
          });
        }
      });

      openViews.splice(indexToBeRemoved, 1);

      return state
        .set('openViews', openViews)
        .set('selectedMenuIndex', menuIndex)
        .set('selectedMenuItem', itemFound)
        .set('selectedOpenedMenuIndex', openedIndex)
        .set('selectedOpenedMenuItem', itemOpenedFound);
    }
    case ActionTypes.SELECT_MENU_ITEM: {
      const menus = state.get('menus');
      const openViews = state.get('openViews');

      let itemFound;
      let index;

      menus.forEach(menu => {
        if (action.id === menu.id) {
          itemFound = menu;
          index = menu.index;
        }
        if (menu.children) {
          menu.children.forEach(child => {
            if (action.id === child.id) {
              itemFound = child;
              itemFound.icon = menu.icon;
              index = child.index;
            }
          });
        }
      });

      let itemOpenedFound = openViews.find(item => item.id === itemFound.id);

      let openedIndex = 0;

      if (!itemOpenedFound) {
        itemOpenedFound = Object.assign({}, itemFound);
        openedIndex = openViews.length;
      } else {
        openedIndex = openViews.indexOf(itemOpenedFound);
      }

      return state
        .set('selectedMenuIndex', index)
        .set('selectedMenuItem', itemFound)
        .set('selectedOpenedMenuIndex', openedIndex)
        .set('selectedOpenedMenuItem', itemOpenedFound);
    }
    case ActionTypes.OPEN_SETTING_DRAWER:
      return state.set('openSettingDrawer', true);
    case ActionTypes.CLOSE_SETTING_DRAWER:
      return state.set('openSettingDrawer', false);
    case ActionTypes.ANIMATE_MENUS: {
      let menus = state.get('menus');

      menus = menus.map(item => {
        let newItem = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = { ...item, animating: true, willCloseMenu: action.willCloseMenu };
          } else {
            newItem = { ...item, animating: false };
          }

          newItem.children = newItem.children.map(child => {
            let newChild = child;
            newChild = {
              ...child,
              animating: newItem.animating,
              willCloseMenu: newItem.willCloseMenu
            };
            return newChild;
          });
        }

        return newItem;
      });

      return state.set('menus', menus);
    }
    case ActionTypes.TOGGLE_MENUS: {
      let menus = state.get('menus');

      menus = menus.map(item => {
        let newItem = item;

        if (item.children && item.children.length > 0) {
          if (item.id === action.menuId) {
            newItem = { ...item, open: !item.open, animating: false };
          } else {
            newItem = { ...item, open: false, animating: false };
          }
        }

        return newItem;
      });

      return state.set('menus', menus);
    }
    case ActionTypes.ANIMATE_ROOT_MENUS: {
      let menus = state.get(action.rootMenuName);

      menus = menus.map(item => {
        let newItem = item;

        newItem = { ...item, animatingRootMenu: true, willCloseRootMenu: action.willCloseMenu };

        return newItem;
      });

      return state.set(action.rootMenuName, menus);
    }
    case ActionTypes.TOGGLE_ROOT_MENUS: {
      let menus = state.get(action.rootMenuName);

      menus = menus.map(item => {
        let newItem = item;

        newItem = { ...item, animatingRootMenu: false };

        return newItem;
      });

      return state.set(action.rootMenuName, menus);
    }
    default:
      return state;
  }
}

export default appReducer;
