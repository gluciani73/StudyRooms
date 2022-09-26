import {ADD_LIKES, DELETE_LIKES} from '../../constants'

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
            default: return state
    }
}
export default likeReducer