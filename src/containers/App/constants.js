/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
export const LOAD_MENU = 'app/LOAD_MENU';
export const LOAD_MENU_SUCCESS = 'app/LOAD_MENU_SUCCESS';
export const LOAD_MENU_FAILED = 'app/LOAD_MENU_FAILED';
export const OPEN_VIEW = 'app/OPEN_VIEW';
export const CLOSE_VIEW = 'app/CLOSE_VIEW';
export const SELECT_MENU_ITEM = 'app/SELECT_MENU_ITEM';



export const OPEN_SETTING_DRAWER = 'app/OPEN_SETTING_DRAWER';
export const CLOSE_SETTING_DRAWER = 'app/CLOSE_SETTING_DRAWER';
export const CHANGE_THEME = 'app/CHANGE_THEME';
export const ANIMATE_MENUS = 'app/ANIMATE_MENUS';
export const TOGGLE_MENUS = 'app/TOGGLE_MENUS';
export const ANIMATE_ROOT_MENUS = 'app/ANIMATE_ROOT_MENUS';
export const TOGGLE_ROOT_MENUS = 'app/TOGGLE_ROOT_MENUS';
export const CHANGE_SHOWS_TABS = 'app/CHANGE_SHOWS_TABS';
export const CHANGE_SHOW_OPEN_VIEWS = 'app/CHANGE_SHOW_OPEN_VIEWS';
export const CHANGE_LAYOUT = 'app/CHANGE_LAYOUT';

