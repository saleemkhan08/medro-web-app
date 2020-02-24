import { DELETE_PRODUCT, DISPLAY_PRODUCTS_TAB, EDIT_PRODUCTS, FETCH_PRODUCTS_BEGIN, FETCH_PRODUCTS_SUCCESS, HIDE_PRODUCTS_TAB, HIDE_PRODUCT_EDIT_MODAL, SAVE_PRODUCTS, SET_CURRENT_PRODUCT, SHOW_PRODUCT_EDIT_MODAL } from "./ProductActions";

const initialState = {
    products: [],
    isLoading: true,
    error: null,
    currentProduct: undefined,
    showProdEditModal: false
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_PRODUCT_EDIT_MODAL:
            return {
                ...state,
                showProdEditModal: true,
                currentProduct: action.payload
            };
        case HIDE_PRODUCT_EDIT_MODAL:
            return {
                ...state,
                showProdEditModal: false
            };

        case FETCH_PRODUCTS_BEGIN:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                products: action.payload
            };
        case DISPLAY_PRODUCTS_TAB:
            return {
                ...state,
                displayProducts: true
            };
        case HIDE_PRODUCTS_TAB:
            return {
                ...state,
                displayProducts: false
            };
        case SET_CURRENT_PRODUCT:
            return {
                ...state,
                currentProduct: action.payload
            };
        case EDIT_PRODUCTS:
            return {
                ...state
            };

        case DELETE_PRODUCT:
            return {
                ...state
            };

        case SAVE_PRODUCTS:
            return {
                ...state
            };
        default:
            return state;
    }
};

export default ProductReducer;
