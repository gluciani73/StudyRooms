const initialState={
    error:""
}

export default function Reducer(state = initialState, action) {

    switch (action.type) {
        case "SIGN_IN":
            return {
                ...initialState,
                error: action.payload
            }
        default: return state
    }
}