import {
    GET_ANSWER_LIST,
    CREATE_ANSWER_ITEM,
    UPDATE_ANSWER_ITEM,
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
        case UPDATE_ANSWER_ITEM:
            const answerListUpdated = state.answerList.map(item => item.id === payload.id ? payload : item);
            return {
                ...state,
                answerList: answerListUpdated
            }
        default:
            return state;
    }
}

export default answerReducer;
