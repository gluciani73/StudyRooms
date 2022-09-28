import {ADD_LIKES, DELETE_LIKES,ADD_RATING, CHANGE_RATING} from '../../constants'

const initialState ={
    likes:[]
}

const likeReducer = (state = initialState, {type, payload} )=>{
    switch (type){
        case ADD_LIKES:
            return {
                ... state,
                likes:payload
            }
        case DELETE_LIKES:
            return {
                ... state,
                likes:state.likes.filter(e=>e.id !==payload.id && e.questionId===payload.questionId)
            }
        case ADD_RATING:
        return {
                ... state,
                likes:payload
            }
        case CHANGE_RATING:
            return {
                ...state,
                likes: state.likes.map(rate =>
                    rate.id === payload.id ? payload : item
                )
            };
    

            default: return state
    }
}
export default likeReducer