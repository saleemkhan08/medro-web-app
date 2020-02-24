
import { ON_LOGIN, ON_LOGOUT } from "./AuthActions";

const initialState = {
    user: {},
    isLoggedIn: false
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
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
                isLoggedIn: false
            };
        default:
            return state;
    }
};

export default CategoryReducer;
