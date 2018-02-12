import { fromJS } from 'immutable';
import * as ActionTypes from './constants';

export const initialState = fromJS({
    auth: {},
    authenticationErrorMessage: '',
    registrationErrorMessage: '',
    userIsAuthenticated: false,
});

export default function authReducer(state = initialState, action) {


    switch (action.type) {
        // Authentication process
        case ActionTypes.LOGIN: {
            console.log('state:', state.get('user'));

            // const menus = state.get('menus');
            // const openViews = state.get('openViews');
            // const menuItem = menus[0];
            // const openedMenuItem = openViews[0];

            return state
                .set('userIsAuthenticated', true)
                .set('auth', action.auth)
                .set('authenticationErrorMessage', '')
            // .set('selectedMenuIndex', 0)
            // .set('selectedMenuItem', menuItem)
            // .set('selectedOpenedMenuIndex', 0)
            // .set('selectedOpenedMenuItem', openedMenuItem);
        }

        case ActionTypes.AUTHENTICATION_FAILED: {
            return state.set('authenticationErrorMessage', action.message);
        }
        case ActionTypes.CLEAR_AUTHENTICATION_MESSAGE: {
            return state.set('authenticationErrorMessage', '');
        }
        case ActionTypes.REGISTRATION_FAILED: {
            return state.set('registrationErrorMessage', action.message);
        }

        case ActionTypes.LOGOUT:
            return state
                .set('userIsAuthenticated', false)
                .set('auth', {})
                .set('authenticationErrorMessage', '');
        // End of Authentication process
        default:
            return state;
    }

}