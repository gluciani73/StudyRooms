import axios from "axios";

export const GET_CATEGORY_LIST = "GET_CATEGORY_LIST";
export const CREATE_CATEGORY_ITEM = "CREATE_CATEGORY_ITEM";
export const UPDATE_CATEGORY_ITEM = "UPDATE_CATEGORY_ITEM";
export const DELETE_CATEGORY_ITEM = "DELETE_CATEGORY_ITEM";
export const SORT_CATEGORY_LIST = "SORT_CATEGORY_LIST";

export const getCategoryList = () => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.get(`/categories`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator getCategoryList:", error))
            .then(response => {
                dispatch({
                    type: GET_CATEGORY_LIST,
                    payload: response.data.data
                });
            });
    }
}

export const createCategoryItem = (categoryItem) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.post(`/categories`, categoryItem, {headers:{"Authorization":`Bearer ${token}`}})

            .catch(error => console.log("Action creator createCategoryItem: ", error))
            .then(response => {
                dispatch({
                    type: CREATE_CATEGORY_ITEM,
                    payload: response.data.data
                });
            });
    }
}

export const updateCategoryItem = (categoryItem) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.put(`/categories/${categoryItem.id}`, categoryItem, {headers:{"Authorization":`Bearer ${token}`}})

            .catch(error => console.log("Action creator updateCategoryItem: ", error))
            .then(response => {
                dispatch({
                    type: UPDATE_CATEGORY_ITEM,
                    payload: response.data.data
                });
            });
    }
}

export const deleteCategoryItem = (categoryItem) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.delete(`/categories/${categoryItem.id}`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator deleteCategoryItem: ", error))
            .then(() => {
                dispatch({
                    type: DELETE_CATEGORY_ITEM,
                    payload: { id: categoryItem.id}
                });
            });
    }
}

export const sortCategoryList = (sortOption) => {
    return {
        type: SORT_CATEGORY_LIST,
        payload: sortOption
    }
}
