const initialState={
    error:"",
    regisOnOff: true,
    userInfo: {},
    token:"",
    recovery:"",
    recover:"",
}

export default function Reducer(state = initialState, action) {

    
    switch (action.type) {
        case "RECOVERY_CHANGE":
            return{
                recovery: action.payload.recovery,
                acountOrPass: action.payload.accPass
            }

        case "USER_REFRESH":
            return{
                ...initialState,
                userInfo: action.payload.data,
                token : action.payload.token
            }
        case "SIGN_IN":
            return {
                ...initialState,
                userInfo: action.payload.data,
                token : action.payload.token
            }
        case "ERROR_SIGN_IN":
            return{
                ...initialState,
                error: action.payload
            }
        case "CHANGE_LANDING":
            let tf
            !state.regisOnOff ? tf = true : tf = false
            return {
                ...initialState,
                regisOnOff: tf
            }
        case "RECOVER_LOGIN":

            if(action.payload.errorRecover) {
                return{
                ...initialState,
                error: action.payload.data
            }}
            return{
                ...initialState,
                recover: action.payload.data
            }
        default: return state
    }
}