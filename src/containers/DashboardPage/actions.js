import * as ActionTypes from './constants';

export function updateProfileType(profileType) {
    return {
        type: ActionTypes.UPDATE_PROFILE_TYPE,
        profileType,
    };
}
