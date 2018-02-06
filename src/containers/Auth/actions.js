import * as ActionTypes from './constants';

export function signIn(payload) {
    return {
        type: ActionTypes.SIGN_IN,
        payload,
    };
}

export function signInFacebook(payload) {
    return {
        type: ActionTypes.SIGN_IN_FACEBOOK,
        payload,
    };
}

export function signInGoogle(payload) {
    return {
        type: ActionTypes.SIGN_IN_GOOGLE,
        payload,
    };
}

export function clearAuthenticationMessage() {
    return {
        type: ActionTypes.CLEAR_AUTHENTICATION_MESSAGE,
    };
}

export function register(payload) {
    return {
        type: ActionTypes.REGISTER,
        payload,
    };
}

export function resetPassword(payload) {
    return {
        type: ActionTypes.RESET_PASSWORD,
        payload,
    };
}

export function signOut() {
    return {
        type: ActionTypes.SIGN_OUT,
    };
}
