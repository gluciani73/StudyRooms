import axios from "axios"

export function signIn( user ){ 
    return async function (dispatch){
        try {
        const res = (await axios.post(`http://localhost:3001/users/signin`, user)).data
        console.log(res.token);
        localStorage.setItem("token", res.token)
        console.log(localStorage);
        return dispatch({
            type: "SIGN_IN",
            payload: res
           }
        )
        } catch (error) {
            return dispatch({
                type: "SIGN_IN",
                payload: error.response.data.error
               }
            )
        }
    }
}
