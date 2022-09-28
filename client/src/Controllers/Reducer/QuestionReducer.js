import { GET_QUESTIONLIST, ADD_QUESTION, GET_DETAILS, FILTER_CATEGORY, FILTER_RATING, GET_CATEGORIES, FILTER_CATEGORY2 } from '../../constants'

const initialState = {
    allQuestions: [],
    questions: [],
    detail: [],
    categories: []
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
                questions: [...state.questions, action.payload]
            }
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.payload
            }

        case GET_DETAILS:
            return {
                ...state,
                detail: action.payload
            }
        case FILTER_CATEGORY:
            const questionss = state.questions.data
            const filter = action.payload === "All" ? state.questions.data : questionss.filter(e => e.categories.map(e => e.category).includes(action.payload))
            return {
                ...state,
                allQuestions: {
                    data: filter,
                    error: null
                }
            }
        case FILTER_CATEGORY2:
            const questionss2 = state.questions.data
            console.log(questionss2)
            const filter2 = action.payload === "All" ? state.questions.data : questionss2.filter(e => e.categories.map(e => e.category).includes(action.payload))
            return {
                ...state,
                allQuestions: {
                    data: filter2,
                    error: null
                }
            }

        //case LOGICALDELETEQ:
          //  const questions = state.questions.data

     


        case FILTER_RATING:
            const arra = state.allQuestions.data.sort(function (a, b) {
                if (action.payload === "asc") {
                    if (a.votesxquestions.length > b.votesxquestions.length) return 1
                    if (b.votesxquestions.length > a.votesxquestions.length) return -1
                    return 0
                }
                if (action.payload === "des") {
                    if (a.votesxquestions.length > b.votesxquestions.length) return -1
                    if (b.votesxquestions.length > a.votesxquestions.length) return 1
                    return 0
                }
            })
            return {
                ...state,
                allQuestions: {
                    error: null,
                    data: arra.slice()
                }
            }

        default:
            return state;
    }
}



export default questionReducer