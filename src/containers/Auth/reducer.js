import { fromJS } from 'immutable';
import { initialState } from '../App/reducer';

const LOGIN = '@@reactReduxFirebase/LOGIN';

export default function authReducer(state = initialState, action) {
  if (action.type === LOGIN) {
    const menus = state.get('menus');
    const openViews = state.get('openViews');
    const menuItem = menus[0];
    const openedMenuItem = openViews[0];

    return state
      .set('userIsAuthenticated', true)
      .set('user', action.user)
      .set('authenticationErrorMessage', '')
      .set('selectedMenuIndex', 0)
      .set('selectedMenuItem', menuItem)
      .set('selectedOpenedMenuIndex', 0)
      .set('selectedOpenedMenuItem', openedMenuItem);
  } else return state;
}
