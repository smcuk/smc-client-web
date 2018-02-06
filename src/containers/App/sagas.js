import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import menuapi from '../../components/LeftDrawer/MenuItems/menuapi';

import {
  LOAD_MENU,
  LOAD_MENU_SUCCESS,
  LOAD_MENU_FAILED,
} from './constants';

// worker Saga: will be fired on LOAD_MENU actions
export function* fetchMenu(action) {
  try {
    const data = yield call(menuapi.getMenu, action);
    yield put({ type: LOAD_MENU_SUCCESS, data });
  } catch (e) {
    yield put({ type: LOAD_MENU_FAILED, message: e.message });
  }
}

/**
 * Watches for LOAD_MENU actions and calls fetchMenu when one comes in.
 * By using `takeLatest` only the result of the latest API call is applied.
 */

export function* appSaga() {
  yield takeLatest(LOAD_MENU, fetchMenu);
}

// All sagas to be loaded
export default [appSaga];
