import { database } from "../../store";
export const DISPLAY_PRODUCTS_TAB = "DISPLAY_PRODUCTS_TAB";
export const HIDE_PRODUCTS_TAB = "HIDE_PRODUCTS_TAB";
export const PRODUCTS = "products";
export const SET_CURRENT_PRODUCT = "SET_CURRENT_PRODUCT";
export const SAVE_PRODUCTS = "SAVE_PRODUCTS";
export const SAVE_PRODUCTS_BEGIN = "SAVE_PRODUCTS_BEGIN";
export const SAVE_PRODUCTS_SUCCESS = "SAVE_PRODUCTS_SUCCESS";
export const SAVE_PRODUCTS_ERROR = "SAVE_PRODUCTS_ERROR";

export const EDIT_PRODUCTS = "EDIT_PRODUCTS";
export const EDIT_PRODUCTS_BEGIN = "ADD_PRODUCTS_BEGIN";
export const EDIT_PRODUCTS_SUCCESS = "ADD_PRODUCTS_SUCCESS";
export const EDIT_PRODUCTS_ERROR = "EDIT_PRODUCTS_ERROR";

export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const DELETE_PRODUCT_BEGIN = "DELETE_PRODUCT_BEGIN";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_ERROR = "DELETE_PRODUCT_ERROR";
export const RESET_MENU = "RESET_MENU";

export const SHOW_PRODUCT_EDIT_MODAL = "SHOW_PRODUCT_EDIT_MODAL";
export const HIDE_PRODUCT_EDIT_MODAL = "HIDE_PRODUCT_EDIT_MODAL";

export const getProductsListRef = () => {
    return database
        .ref()
        .child(PRODUCTS)
        .orderByChild("name");
};

export function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsBegin());
        getProductsListRef().on("value", querySnapshot => {
            const productsObj = querySnapshot.val();
            if (productsObj) {
                dispatch(fetchProductsSuccess(productsObj))
            } else {
                dispatch(fetchProductsError());
            }
        });
    };
}

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products
});

export const fetchProductsError = () => ({
    type: FETCH_PRODUCTS_ERROR
});

export const showProductEditModal = (product) => ({
    type: SHOW_PRODUCT_EDIT_MODAL,
    payload: product
});

export const hideProductEditModal = () => ({
    type: HIDE_PRODUCT_EDIT_MODAL
});

export function saveProduct(product) {
    return dispatch => {
        dispatch(hideProductEditModal());
        dispatch(saveProductsBegin());
        const newRef = getProductRef(product)
        product.id = newRef.key
        newRef
            .set({ ...product })
            .then(() => {
                dispatch(saveProductsSuccess());
            })
            .catch(() => {
                dispatch(saveProductsError());
            });
    };
}

export const getProductRef = (product) => {
    if (product.id && product.categoryId) {
        return database
            .ref()
            .child(PRODUCTS)
            .child(product.categoryId)
            .child(product.id);
    }
    return database
        .ref()
        .child(PRODUCTS)
        .child(product.categoryId)
        .push();

}

export const saveProductsBegin = () => ({
    type: SAVE_PRODUCTS_BEGIN
});

export const saveProductsSuccess = () => ({
    type: SAVE_PRODUCTS_SUCCESS
});

export const saveProductsError = error => ({
    type: SAVE_PRODUCTS_ERROR,
    payload: { error }
});

export const setCurrentProduct = product => ({
    type: SET_CURRENT_PRODUCT,
    payload: product
});

export function deleteProduct(product) {
    return dispatch => {
        dispatch(deleteProductBegin());
        const productRef = getProductRef(product);
        productRef.remove()
            .then(() => {
                dispatch(deleteProductSuccess());
            })
            .catch(error => {
                dispatch(deleteProductError(error));
            });
    };
}

export const deleteProductBegin = () => ({
    type: DELETE_PRODUCT_BEGIN
});

export const deleteProductSuccess = () => ({
    type: DELETE_PRODUCT_SUCCESS
});

export const deleteProductError = error => ({
    type: DELETE_PRODUCT_ERROR,
    payload: { error }
});
