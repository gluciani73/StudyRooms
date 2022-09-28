import { GET_USER_LIST, UPDATE_USERS } from "../../constants";

const initialState ={
    userList:[],
}

export default function userReducer(state= initialState,{type,payload}){
    switch (type) {
        case GET_USER_LIST:
            return{
                ...state,
                userList: payload
            }

    default:
       return {...state};
    }
}