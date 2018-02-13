import { takeLatest, select } from 'redux-saga/effects'
import * as ActionTypes from './constants';



function* updateProfile(action) {
    try {
        yield action.payload.updateProfile({ profile: action.payload.profile, userType: action.payload.userType })
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}

export default function* updateProfileLatest() {

    yield takeLatest(ActionTypes.UPDATE_PROFILE_TYPE, updateProfile);

}
