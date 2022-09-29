import { GET_USER_LIST, UPDATE_USERS, CREATE_USER,GET_ERROR } from "../../constants";

const initialState ={
    userList:[],
    error:""
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
                userList: getOrderedList(userListUpdated)
            };
            case GET_ERROR:
                return{
                    ...initialState,
                    error:payload
                }

        case CREATE_USER:
            return {
                ...state,
                userList: getOrderedList([...state.userList, payload])
            }

    default:
       return {...state};
    }
}

function getOrderedList(originalList) {
    return originalList.sort((a, b) =>
        (a.id > b.id) ? 1 : -1
    );
}