import {
    CREATE_USER,
    GET_ERROR,
    GET_USER_LIST,
    UPDATE_USERS,
    SORT_USER_LIST_BY_TYPE,
    SORT_USER_LIST_BY_FIELD,
    FILTER_USER_LIST_BY_ADMIN,
    FILTER_USER_LIST_BY_PREMIUM,
    FILTER_USER_LIST_BY_ACTIVE,
} from "../../constants";
import axios from 'axios'


export const createUserAction = (user) => {
    return async function (dispatch) {
        try {
            const token = localStorage.getItem("token")
            const data = (await axios.post(`/users/signup`, user, {headers:{"Authorization":`Bearer ${token}`}})).data;
            return dispatch({
                type: CREATE_USER,
                payload: data.data
            })
        } catch (error) {
            return dispatch({
                type: "ERROR",
                payload: error.response.data.error
            }
            )
        }
    }
}


export const editUserAction = (user, userId)=>{
    return async function (dispatch){
        try {
            const token = localStorage.getItem("token")
            const sendInfo = (await axios.put(`/users/update/${userId}`, user, {headers:{"Authorization":`Bearer ${token}`}})).data;
            localStorage.setItem("token", sendInfo.token)
            return dispatch({
                type:UPDATE_USERS,
                payload:sendInfo.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const changePassword = (user, userId)=>{

    return async function (dispatch){
        try {
            const token = localStorage.getItem("token")
            const sendInfo = (await axios.put(`/users/changePassword/${userId}`, user, {headers:{"Authorization":`Bearer ${token}`}})).data;
            return dispatch({
                type:UPDATE_USERS,
                payload:sendInfo
            })
        } catch (error) {
            console.log(error)
            return dispatch({
                type:GET_ERROR,
                payload:error.response.data.error
            })
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

export const getUserList = () => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.get(`/users`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator getUserList:", error))
            .then(response => {
                dispatch({
                    type: GET_USER_LIST,
                    payload: response.data
                });
            });
    }
}

export const sortUserListByType = (sortOption) => {
    return {
        type: SORT_USER_LIST_BY_TYPE,
        payload: sortOption
    }
}

export const sortUserListByField = (sortOption) => {
    return {
        type: SORT_USER_LIST_BY_FIELD,
        payload: sortOption
    }
}

export const filterUserListByAdmin = () => {
    return {
        type: FILTER_USER_LIST_BY_ADMIN,
        payload: true
    }
}

export const filterUserListByPremium = () => {
    return {
        type: FILTER_USER_LIST_BY_PREMIUM,
        payload: true
    }
}

export const filterUserListByActive = () => {
    return {
        type: FILTER_USER_LIST_BY_ACTIVE,
        payload: true
    }
}