import {GET_QUESTIONLIST, ADD_QUESTION, GET_DETAILS, FILTER_CATEGORY, FILTER_RATING} from '../../constants'

const initialState ={
    allQuestions:[],
    questions:[],
    detail:[]
}

const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_QUESTIONLIST:
        return {
                ...state,
                questions: action.payload,
                allQuestions: action.payload
            }
        case ADD_QUESTION:
        return {
            ...state,
            questions:[...state.questions, action.payload]
        }

        case GET_DETAILS:
            return {
                ...state,
                detail:action.payload
            }
        case FILTER_CATEGORY:
            const questionss = state.questions
                const filter = action.payload === "All" ? questionss : questionss.filter(e => e.categories === action.payload)
                return{
                    ...state,
                    questions: filter
            }
        case FILTER_RATING:
            let sorted = action.payload === 'asc' ?
                state.questions.sort(function (a, b){
                    if(a.rating > b.rating){
                        return 1
                    }
                    if (b.rating > a.rating){
                        return -1
                    }
                    return 0
                }) :
                state.questions.sort(function (a, b){
                    if (a.rating > b.rating){
                        return -1
                    }
                    if (b.rating > a.rating){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    questions: sorted
            }

            default:
                return state;
        }
    }

    

    export default questionReducer