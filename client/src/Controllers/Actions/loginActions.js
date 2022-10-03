import axios from "axios"
import { decodeToken } from 'react-jwt'

export function backLogin(email) {
    return async function (dispatch) {
        try {
            const res = (await axios.post("/users/recovery", email)).data
            return dispatch({
                type: "RECOVER_LOGIN",
                payload: {
                    data: res.data,
                    errorRecover: false
                }
            })

        } catch (error) {
            return dispatch({
                type: "RECOVER_LOGIN",
                payload: {
                    data: error.response.data.error,
                    errorRecover: true
                }
            })
        }
    }
}
export function recoveryChange(recovery, accPass) {
    return {
        type: "RECOVERY_CHANGE",
        payload: {
            recovery: recovery,
            accPass: accPass
        }
    }
}

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
export function refreshUserInfo(dataUser, token) {
    return {
        type: "USER_REFRESH",
        payload: {
            data: dataUser,
            token: token
        }
    }
}
export function signInGoogle(token) {
    const userInfo = decodeToken(token)

    return {
        type: "SIGN_IN",
        payload: {
            token: token,
            data: userInfo
        }
    }
}
export function registerOnOff() {
    return {
        type: "CHANGE_LANDING"
    }
}
