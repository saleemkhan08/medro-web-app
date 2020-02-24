import { database } from "../../store";
export const DISPLAY_CATEGORIES_TAB = "DISPLAY_CATEGORIES_TAB";
export const HIDE_CATEGORIES_TAB = "HIDE_CATEGORIES_TAB";
export const CATEGORIES = "categories";
export const SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY";

export const ADD_CATEGORY_BEGIN = "ADD_CATEGORY_BEGIN";
export const ADD_CATEGORY_SUCCESS = "ADD_CATEGORY_SUCCESS";
export const ADD_CATEGORY_ERROR = "ADD_CATEGORY_ERROR";

export const REMOVE_CATEGORY_BEGIN = "REMOVE_CATEGORY_BEGIN";
export const REMOVE_CATEGORY_SUCESS = "REMOVE_CATEGORY_SUCESS";
export const REMOVE_CATEGORY_ERROR = "REMOVE_CATEGORY_ERROR";

export const EDIT_CATEGORIES = "EDIT_CATEGORIES";
export const EDIT_CATEGORIES_BEGIN = "ADD_CATEGORIES_BEGIN";
export const EDIT_CATEGORIES_SUCCESS = "ADD_CATEGORIES_SUCCESS";
export const EDIT_CATEGORIES_ERROR = "EDIT_CATEGORIES_ERROR";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const FETCH_CATEGORIES_BEGIN = "FETCH_CATEGORIES_BEGIN";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";

export const DELETE_CATEGORIES = "DELETE_CATEGORIES";
export const DELETE_CATEGORIES_BEGIN = "DELETE_CATEGORIES_BEGIN";
export const DELETE_CATEGORIES_SUCCESS = "DELETE_CATEGORIES_SUCCESS";
export const DELETE_CATEGORIES_ERROR = "DELETE_CATEGORIES_ERROR";
export const RESET_MENU = "RESET_MENU";

export const getCategoryRef = () => {
    return database
        .ref()
        .child(CATEGORIES)
        .orderByChild("name");
};

export function fetchCategories() {
    return dispatch => {
        dispatch(fetchCategoriesBegin());
        getCategoryRef().on("value", querySnapshot => {
            const categories_obj = querySnapshot.val();
            if (categories_obj) {
                const categories = [];
                const uids = Object.keys(categories_obj);
                uids.forEach(uid => {
                    categories.push(categories_obj[uid]);
                });
                dispatch(fetchCategoriesSuccess(categories));
                dispatch(setCurrentCategory(categories[0]));
            } else {
                dispatch(fetchCategoriesError());
            }
        });
    };
}

export const setCurrentCategory = category => ({
    type: SET_CURRENT_CATEGORY,
    payload: category
})

export const fetchCategoriesBegin = () => ({
    type: FETCH_CATEGORIES_BEGIN
});

export const fetchCategoriesSuccess = categories => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories
});

export const fetchCategoriesError = () => ({
    type: FETCH_CATEGORIES_ERROR
});

export function addCategory(name) {
    return dispatch => {
        dispatch(addCategoryBegin());
        const newRef = database
            .ref()
            .child(CATEGORIES)
            .push();
        newRef
            .set({ name: name, id: newRef.key })
            .then(() => {
                dispatch(addCategorySuccess());
            })
            .catch(() => {
                dispatch(addCategoryError());
            });
    };
}

export const addCategoryBegin = () => ({
    type: ADD_CATEGORY_BEGIN
});

export const addCategorySuccess = () => ({
    type: ADD_CATEGORY_SUCCESS
});

export const addCategoryError = () => ({
    type: ADD_CATEGORY_ERROR
});

export function removeCategory(categoryId) {
    return dispatch => {
        dispatch(removeCategoryBegin(categoryId));
        const query = database
            .ref()
            .child(CATEGORIES)
            .child(categoryId);
        query
            .remove()
            .then(() => {
                dispatch(removeCategorySuccess(categoryId));
            })
            .catch(() => {
                dispatch(removeCategoryError(categoryId));
            });
    };
}

export const removeCategoryBegin = id => ({
    type: REMOVE_CATEGORY_BEGIN,
    payload: id
});

export const removeCategorySuccess = id => ({
    type: REMOVE_CATEGORY_SUCESS,
    payload: id
});

export const removeCategoryError = id => ({
    type: REMOVE_CATEGORY_ERROR,
    payload: id
});


export function editCategory(id, name) {
    return dispatch => {
        dispatch(editCategoryBegin());
        const ref = database
            .ref()
            .child(CATEGORIES)
            .child(id);
        ref
            .set({
                name: name,
                id: id
            })
            .then(() => {
                dispatch(editCategorySuccess());
            })
            .catch(() => {
                dispatch(editCategoryError());
            });
    };
}

export const editCategoryBegin = () => ({
    type: EDIT_CATEGORIES_BEGIN
});

export const editCategorySuccess = () => ({
    type: EDIT_CATEGORIES_SUCCESS
});

export const editCategoryError = () => ({
    type: EDIT_CATEGORIES_ERROR
});