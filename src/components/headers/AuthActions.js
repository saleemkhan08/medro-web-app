import firebase from "firebase/app";
import { auth } from "../../store";
export const ON_LOGIN = "ON_LOGIN";
export const ON_LOGOUT = "ON_LOGOUT";
export const ADMIN_LOGGED_IN = "ADMIN_LOGGED_IN";
export const HIDE_LOGIN_REQUIRED = "HIDE_LOGIN_REQUIRED";
export const SHOW_LOGIN_REQUIRED = "SHOW_LOGIN_REQUIRED";
export const SHOW_TOAST_MSG = "SHOW_TOAST_MSG";

export const hideLoginRequired = () => ({
    type: HIDE_LOGIN_REQUIRED
})

export const showToastMsg = (msg, parentId) => ({
    type: SHOW_TOAST_MSG,
    payload: msg,
    payload2: parentId
})

export const showLoginRequired = (msg) => ({
    type: SHOW_LOGIN_REQUIRED,
    payload: msg
});

export const onLoginSuccess = (user) => ({
    type: ON_LOGIN,
    payload: user
});

export function login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
}

export function logout() {
    auth.signOut();
}

export function onLogin(user) {
    return dispatch => {
        if (process.env.REACT_APP_ADMIN_1 === user.email || process.env.REACT_APP_ADMIN_2 === user.email) {
            dispatch(adminLoggedIn(user));
        }
        dispatch(onLoginSuccess(user));
    };
}
export const adminLoggedIn = () => ({
    type: ADMIN_LOGGED_IN
});

export const onLogout = () => ({
    type: ON_LOGOUT
});