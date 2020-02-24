import { DELETE_CATEGORIES, DISPLAY_CATEGORIES_TAB, EDIT_CATEGORIES, FETCH_CATEGORIES_BEGIN, FETCH_CATEGORIES_SUCCESS, HIDE_CATEGORIES_TAB, RESET_MENU, SET_CURRENT_CATEGORY } from "./CategoryActions";

const initialState = {
    categories: [],
    isLoading: true,
    error: null,
    currentCategory: undefined
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_MENU:
            return initialState;
        case FETCH_CATEGORIES_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                isLoading: false,
                categories: action.payload
            };
        case DISPLAY_CATEGORIES_TAB:
            return {
                ...state,
                displayCategories: true
            };
        case HIDE_CATEGORIES_TAB:
            return {
                ...state,
                displayCategories: false
            };
        case SET_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.payload
            };
        case EDIT_CATEGORIES:
            return {
                ...state
            };

        case DELETE_CATEGORIES:
            return {
                ...state
            };

        default:
            return state;
    }
};

export default CategoryReducer;
