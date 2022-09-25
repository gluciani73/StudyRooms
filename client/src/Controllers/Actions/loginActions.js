import axios from "axios"
import { decodeToken } from 'react-jwt'

export function signIn(user) {
    return async function (dispatch) {
        try {
            const res = (await axios.post(`/users/signin`, user)).data
            localStorage.setItem("token", res.token)
            return dispatch({
                type: "SIGN_IN",
                payload: res
            }
            )
        } catch (error) {
            return dispatch({
                type: "ERROR_SIGN_IN",
                payload: error.response.data.error
            }
            )
        }
    }
}

export function signInGoogle(token){
    const userInfo = decodeToken(token)
    return {
        type:"SIGN_IN",
        payload:{
            token,
            data: {...userInfo}
        }
    }
}
export function registerOnOff() {
    return {
        type: "CHANGE_LANDING"
    }
}
