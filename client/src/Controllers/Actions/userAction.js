import { CREATE_USER, GET_USERS, UPDATE_USERS } from "../../constants";
import axios from 'axios'

export const createUserAction = (user) => {
    return async function (dispatch) {
        try {
            const data = (await axios.post(`/users/signup`, user)).data;
            return dispatch({
                type: CREATE_USER,
                payload: data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const editUserAction = (user, userId)=>{
    return async function (dispatch){
        try {
            const sendInfo = (await axios.put(`/users/update/${userId}`, user)).data;
            console.log(sendInfo)
            return dispatch({
                type:UPDATE_USERS,
                payload:sendInfo
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export function getUserAction(){
//     return async function(dispatch){
//         const data = await getUsers();
//         return dispatch({
//             type:GET_USERS,
//             payload:data
//         })
//     }
// }