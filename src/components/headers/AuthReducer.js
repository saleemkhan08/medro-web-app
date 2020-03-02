
import { ADMIN_LOGGED_IN, HIDE_LOGIN_REQUIRED, ON_LOGIN, ON_LOGOUT, SHOW_LOGIN_REQUIRED, SHOW_TOAST_MSG } from "./AuthActions";

const initialState = {
    user: {},
    isLoggedIn: false,
    isAdmin: false,
    showLoginRequired: false,
    loginRequiredMsg: "",
    toastMsg: undefined,
    parentId: ""
};

const CategoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case SHOW_TOAST_MSG:
            const toggleClass = action.payload ? "show-toast-anim" : ""
            return {
                ...state,
                toastMsgShowClass: toggleClass,
                toastMsg: action.payload,
                parentId: action.payload2
            }
        case HIDE_LOGIN_REQUIRED:
            return {
                ...state,
                showLoginRequired: false
            };
        case SHOW_LOGIN_REQUIRED:
            return {
                ...state,
                showLoginRequired: true,
                loginRequiredMsg: action.payload
            };
        case ADMIN_LOGGED_IN:
            return {
                ...state,
                isAdmin: true
            };

        case ON_LOGIN:
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true
            };

        case ON_LOGOUT:
            return {
                ...state,
                user: {},
                isLoggedIn: false,
                isAdmin: false
            };
        default:
            return state;
    }
};

export default CategoryReducer;
