import {
    GET_ANSWER_LIST,
} from "../Actions";

const initialState={
    answerList: [],
}

const rooReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_ANSWER_LIST:
            return {
                ...state,
                answerList: payload
            }
        default:
            return state;
    }
}

export default rooReducer;
