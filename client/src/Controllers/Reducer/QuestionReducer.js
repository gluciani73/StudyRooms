import {GET_QUESTIONLIST, ADD_QUESTION, GET_DETAILS, FILTER_CATEGORY, FILTER_RATING, GET_CATEGORIES} from '../../constants'

const initialState ={
    allQuestions:[],
    questions:[],
    detail:[],
    categories:[]
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
        case GET_CATEGORIES:
            return{
                ...state,
                categories: action.payload
            }

        case GET_DETAILS:
            return {
                ...state,
                detail:action.payload
            }
        case FILTER_CATEGORY:
            const questionss = state.questions.data
            const filter = action.payload === "All" ? questionss : questionss.filter(e => e.categories.map(e=>e.category).includes(action.payload))
                return{
                    ...state,
                    allQuestions: filter
            }
        case FILTER_RATING:
            let sorted = action.payload === 'asc' ?
                state.questions.data.map(e=> e.ratingAverage).sort(function (a, b){
                    if(a.ratingAverage > b.ratingAverage){
                        return 1
                    }
                    if (b.ratingAverage > a.ratingAverage){
                        return -1
                    }
                    return 0
                }) :
                state.questions.sort(function (a, b){
                    if (a.ratingAverage > b.ratingAverage){
                        return -1
                    }
                    if (b.ratingAverage > a.ratingAverage){
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