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
            console.log(questionss)
                const filter = action.payload === "All" ? questionss : questionss.filter(e => e.categories.map((e)=>e.category).includes(action.payload))
                console.log(filter)
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