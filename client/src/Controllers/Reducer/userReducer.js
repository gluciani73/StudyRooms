import {
    GET_USER_LIST,
    UPDATE_USERS,
    CREATE_USER,
    GET_ERROR,
    ASC,
    DSC,
    SORT_USER_LIST_BY_TYPE,
    SORT_USER_LIST_BY_FIELD,
    FILTER_USER_LIST_BY_ADMIN,
    FILTER_USER_LIST_BY_PREMIUM,
    FILTER_USER_LIST_BY_ACTIVE,
} from "../../constants";

export const SORT_BY_ID = "SORT_BY_ID";
export const SORT_BY_USER_NAME = "SORT_BY_USER_NAME";
export const SORT_BY_FIRST_NAME = "SORT_BY_FIRST_NAME";
export const SORT_BY_LAST_NAME = "SORT_BY_LAST_NAME";
export const SORT_BY_EMAIL = "SORT_BY_EMAIL";

export const FILTER_BY_ADMIN = "FILTER_BY_ADMIN";
export const FILTER_BY_PREMIUM = "FILTER_BY_PREMIUM";
export const FILTER_BY_ACTIVE = "FILTER_BY_ACTIVE";

const initialState ={
    userList:[],
    error:"",
    changePassword:"",
    sortOptionType: ASC,
    sortOptionField: SORT_BY_ID,
    filterByAdmin : false,
    filterByPremium: false,
    filterByActive : true,
}

export default function userReducer(state= initialState,{type,payload}){
    let filterOptions;
    const sortOption = state.sortOptionField + state.sortOptionType;
    switch (type) {
        case GET_USER_LIST:
            return{
                ...state,
                userList: getFilteredList(payload, state, sortOption),
            }

        case UPDATE_USERS: //update user list
            const userListUpdated = state.userList.map(item =>
                item.id === payload.id ? payload : item
            )
            return {
                ...state,
                userList: getFilteredList(userListUpdated, state, sortOption),
                error:"",
                changePassword:"Contraseña cambiada"
            };

        case CREATE_USER:
            return {
                ...state,
                userList: getFilteredList([...state.userList, payload], state, sortOption)
            }

        case SORT_USER_LIST_BY_TYPE:
            return {
                ...state,
                sortOptionType: payload,
                userList: getFilteredList(state.userList, state, state.sortOptionField + payload)
            }

        case SORT_USER_LIST_BY_FIELD:
            return {
                ...state,
                sortOptionField: payload,
                userList: getFilteredList(state.userList, state, payload + state.sortOptionType)
            }

        case FILTER_USER_LIST_BY_ADMIN:
            filterOptions = {...state, filterByAdmin : !state.filterByAdmin}
            return {
                ...state,
                ...filterOptions,
                userList: getFilteredList(state.userList, filterOptions, sortOption)
            }

        case FILTER_USER_LIST_BY_PREMIUM:
            filterOptions = {...state, filterByPremium : !state.filterByPremium}
            return {
                ...state,
                ...filterOptions,
                userList: getFilteredList(state.userList, filterOptions, sortOption)
            }

        case FILTER_USER_LIST_BY_ACTIVE:
            filterOptions = {...state, filterByActive : !state.filterByActive}
            return {
                ...state,
                ...filterOptions,
                userList: getFilteredList(state.userList, filterOptions, sortOption)
            }

        case GET_ERROR:
                return{
                    ...initialState,
                    error:payload,
                    changePassword:""
                }

        case "ERROR":
            return{
                ...initialState,
                error:payload
            }

    default:
       return {...state};
    }
}

function getFilteredList(originalList, state, sortOption) {

    const updatedList = originalList.filter(item =>
        item.isAdmin === state.filterByAdmin &&
        item.isPremium === state.filterByPremium &&
        item.active === state.filterByActive
    )
    return getOrderedList(updatedList, sortOption);
}

function getOrderedList(originalList, sortOption) {

    switch (sortOption) {

        case SORT_BY_ID + ASC:
            return originalList.sort((a, b) =>
                (a.id > b.id) ? 1 : -1);

        case SORT_BY_ID + DSC:
            return originalList.sort((a, b) =>
                (a.id > b.id) ? -1 : 1);

        case SORT_BY_USER_NAME + ASC:
            return originalList.sort((a, b) =>
                (a.userName.toLowerCase() > b.userName.toLowerCase()) ? 1 : -1);

        case SORT_BY_USER_NAME + DSC:
            return originalList.sort((a, b) =>
                (a.userName.toLowerCase() > b.userName.toLowerCase()) ? -1 : 1);

        case SORT_BY_FIRST_NAME + ASC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : -1);

        case SORT_BY_FIRST_NAME + DSC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? -1 : 1);

        case SORT_BY_LAST_NAME + ASC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : -1);

        case SORT_BY_LAST_NAME + DSC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? -1 : 1);

        case SORT_BY_EMAIL + ASC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? 1 : -1);

        case SORT_BY_EMAIL + DSC:
            return originalList.sort((a, b) =>
                (a.firstName.toLowerCase() > b.firstName.toLowerCase()) ? -1 : 1);

        default: //returns the original list without change.
            return originalList;
    }
}