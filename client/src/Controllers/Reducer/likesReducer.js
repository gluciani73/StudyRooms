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
            const questionRateItem = state.questionList.find(item =>
                item.id === payload.questionItem.questionId);
            const newQuestionRateItem = {
                ...questionRateItem,
                ratingCount: payload.questionItem.ratingCount,
                ratingAverage: payload.questionItem.ratingAverage
            }
            const questionRateListFiltered = state.questionList.filter(item =>
                item.id !== payload.questionItem.answerId
            )
            return {
                ...state,
                ratingList: payload.ratingList,
                questionList: getOrderedList([...questionRateListFiltered, newQuestionRateItem], state.sortOption)
            };
        
            default: return state
    }
}
export default likeReducer