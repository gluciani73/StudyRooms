import { CREATE_USER,GET_USERS, URL_BACK} from "../../constants";
import axios from 'axios'

export const createUserAction = (user) =>{
    return async function (dispatch){
       try {
        const data =(await axios.post(`${URL_BACK}/signup`,user)).data;
        console.log(data)
        return dispatch({
            type:CREATE_USER,
            payload:data
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