import {GET_QUESTIONLIST, ADD_QUESTION} from '../Actions/questionsActions'

const initialState ={
    allQuestions:[],
    questions:[]
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

            default:
                return state;
        }
    }

    export default questionReducer