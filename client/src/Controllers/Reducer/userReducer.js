import { GET_USERS, UPDATE_USERS } from "../../constants";

const initialState ={
    users:[],
}

export default function userReducer(state= initialState,{type,payload}){
    switch (type) {
        case GET_USERS:
            return{
                ...state,
                users:payload
            }
    default:
       return {...state};
    }
}