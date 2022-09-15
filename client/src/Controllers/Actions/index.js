import axios from "axios"




export const createUserAction =(user)=>{
    return  async (dispatch) =>{
        try {
            const postUser = await axios.post('http://localhost:3001/auth/signup',user);
            dispatch({
                type:'CREATE_USER',
                payload:postUser.data
            })
        } catch (error) {
            console.log(error)
            return error
        }
    }
}
