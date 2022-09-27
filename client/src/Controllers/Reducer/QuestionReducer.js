import {GET_QUESTIONLIST, ADD_QUESTION, GET_DETAILS, FILTER_CATEGORY, FILTER_RATING, GET_CATEGORIES, FILTER_CATEGORY2} from '../../constants'

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
            case FILTER_CATEGORY2:
            const questionss2 = state.questions.data
            console.log(questionss2)
            const filter2 = action.payload === "All" ? questionss2 : questionss2.filter(e => e.categories.map(e=>e.category).includes(action.payload))
                return{
                    ...state,
                    allQuestions: filter2
            }
        case FILTER_RATING:
                let arra = state.allQuestions.data.sort( function (a,b) {
                if(a.votesxquestions.length > b.votesxquestions.length){
                    return 1
                }else return -1
            })
            console.log(arra);

            default:
                return state;
        }
    }

    

    export default questionReducer