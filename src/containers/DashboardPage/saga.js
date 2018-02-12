import { takeLatest } from 'redux-saga/effects'


function* updateProfile({ firebase, profile, auth }) {
    try {
        yield firebase.updateProfile({ ...profile, userType: 'buyer' })
    } catch (err) {
        console.log('Error in saga!:', err)
    }
}


export default function* updateProfileLatest() {
    yield takeLatest("UPDATE_PROFILE_TYPE", updateProfile);
}