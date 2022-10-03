import { 
    GET_USER_LIST, 
    UPDATE_USERS, 
    CREATE_USER, 
    GET_ERROR,
    ASC,
    DSC,
    SORT_USER_LIST_BY_TYPE,
    SORT_USER_LIST_BY_FIELD,
} from "../../constants";

export const SORT_BY_ID = "SORT_BY_ID";
export const SORT_BY_USER_NAME = "SORT_BY_USER_NAME";
export const SORT_BY_FIRST_NAME = "SORT_BY_FIRST_NAME";
export const SORT_BY_LAST_NAME = "SORT_BY_LAST_NAME";
export const SORT_BY_EMAIL = "SORT_BY_EMAIL";

const initialState ={
    userList:[],
    error:"",
    changePassword:"",
    sortOptionType: ASC,
    sortOptionField: SORT_BY_ID,
}

export default function userReducer(state= initialState,{type,payload}){
    switch (type) {
        case GET_USER_LIST:
            return{
                ...state,
                userList: payload
            }

        case UPDATE_USERS: //update user list
            const userListUpdated = state.userList.map(item =>
                item.id === payload.id ? payload : item
            )
            return {
                ...state,
                userList: getOrderedList(userListUpdated),
                error:"",
                changePassword:"Contraseña cambiada"
            };

        case CREATE_USER:
            return {
                ...state,
                userList: getOrderedList([...state.userList, payload])
            }

        case SORT_USER_LIST_BY_TYPE:
            return {
                ...state,
                sortOptionType: payload,
                userList: getOrderedList(state.userList, state.sortOptionField + payload)
            }

        case SORT_USER_LIST_BY_FIELD:
            return {
                ...state,
                sortOptionField: payload,
                userList: getOrderedList(state.userList, payload + state.sortOptionType)
            }

        case GET_ERROR:
                return{
                    ...initialState,
                    error:payload,
                    changePassword:""
                }

    default:
       return {...state};
    }
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