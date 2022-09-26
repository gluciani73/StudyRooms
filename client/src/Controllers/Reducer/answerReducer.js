import {
    GET_ANSWER_LIST,
    CREATE_ANSWER_ITEM,
    UPDATE_ANSWER_ITEM,
    DELETE_ANSWER_ITEM,
    UPDATE_ANSWER_VOTE,
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
            };

        case CREATE_ANSWER_ITEM:
            return {
                ...state,
                answerList: [...state.answerList, payload]
            };

        case UPDATE_ANSWER_ITEM:
            return {
                ...state,
                answerList: state.answerList.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case DELETE_ANSWER_ITEM:
            return {
                ...state,
                answerList: state.answerList.filter(item =>
                    item.id !== payload.id && item.questionId === payload.questionId
                )
            };

        case UPDATE_ANSWER_VOTE:
            const answerItem = state.answerList.find(item =>
                item.id === payload.answerId);
            const newAnswerItem = {
                ...answerItem,
                voteCount: answerItem.voteCount++
            }
            return {
                ...state,
                answerList: [...state.answerList, newAnswerItem]
            };

        default:
            return state;
    }
}

export default answerReducer;
