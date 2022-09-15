import { CREATE_USER,GET_USERS } from "../../constants";
import { createUser,getUsers } from "../ApiReq/users";

export const createUserAction = (user) =>{
    return (dispatch) =>{
        const data =createUser(user)
        return dispatch({
            type:CREATE_USER,
            payload:data
        })
    }
}

export function getUserAction(){
    return async function(dispatch){
        const data = await getUsers();
        return dispatch({
            type:GET_USERS,
            payload:data
        })
    }
}