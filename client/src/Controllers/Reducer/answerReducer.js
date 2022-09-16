import {
    GET_ANSWER_LIST,
    CREATE_ANSWER_ITEM,
} from "../Actions/answerActions";

const initialState={
    answerList: [],
}

const answerReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ANSWER_LIST:
            return {
                ...state,
                answerList: payload
            }
        case CREATE_ANSWER_ITEM:
            return {
                ...state,
                answerList: [...state.answerList, payload]
            }
        default:
            return state;
    }
}

export default answerReducer;
