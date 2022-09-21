const initialState={
    error:"",
    regisOnOff: true,
    userInfo: [],
    token:""
}

export default function Reducer(state = initialState, action) {

    switch (action.type) {
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
        default: return state
    }
}