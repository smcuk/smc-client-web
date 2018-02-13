import * as ActionTypes from './constants';

export function updateProfileType(props) {


    return {
        type: ActionTypes.UPDATE_PROFILE_TYPE,
        payload: { ...props }
    };
}
