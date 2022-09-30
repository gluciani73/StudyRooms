import {
    GET_CATEGORY_LIST,
    CREATE_CATEGORY_ITEM,
    UPDATE_CATEGORY_ITEM,
    DELETE_CATEGORY_ITEM,
    SORT_CATEGORY_LIST,
} from "../Actions/categoryActions";

export const SORT_BY_ID_ASC = "SORT_BY_ID_ASC";
export const SORT_BY_ID_DSC = "SORT_BY_ID_DSC";
export const SORT_BY_NAME_ASC = "SORT_BY_NAME_ASC";
export const SORT_BY_NAME_DSC = "SORT_BY_NAME_DSC";

const initialState={
    categoryList: null,
    sortOption: SORT_BY_NAME_ASC,
}

const categoryReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case GET_CATEGORY_LIST:
            return {
                ...state,
                categoryList: payload
            };

        case CREATE_CATEGORY_ITEM:
            return {
                ...state,
                categoryList: [...state.categoryList, payload]
            };

        case UPDATE_CATEGORY_ITEM:
            return {
                ...state,
                categoryList: state.categoryList.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case DELETE_CATEGORY_ITEM:
            return {
                ...state,
                categoryList: state.categoryList.filter(item =>
                    item.id !== payload.id && item.questionId === payload.questionId
                )
            };

        case SORT_CATEGORY_LIST:
            return {
                ...state,
                sortOption: payload,
                categoryList: getOrderedList(state.categoryList, payload)
            }

        default:
            return state;
    }
}

function getOrderedList(categoryListOriginal, sortOption) {

    switch (sortOption) {

        case SORT_BY_ID_ASC:
            return categoryListOriginal.sort((a, b) =>
                (a.id > b.id) ? 1 : -1);

        case SORT_BY_ID_DSC:
            return categoryListOriginal.sort((a, b) =>
                (a.id > b.id) ? -1 : 1);

        case SORT_BY_NAME_ASC:
            return categoryListOriginal.sort((a, b) =>
                (a.category.toLowerCase() > b.category.toLowerCase()) ? 1 : -1);

        case SORT_BY_NAME_DSC:
            return categoryListOriginal.sort((a, b) =>
                (a.category.toLowerCase() > b.category.toLowerCase()) ? -1 : 1);

        default: //returns the original list without change.
            return categoryListOriginal;
    }
}

export default categoryReducer;
