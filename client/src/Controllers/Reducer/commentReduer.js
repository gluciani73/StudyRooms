import {
    GET_COMMENT_LIST,
} from "../Actions/commentActions";

const initialState={
    commentList: [],
}

const commentReducer = (state = initialState, {type, payload}) => {
    switch (type) {

        case GET_COMMENT_LIST:
            return {
                ...state,
                commentList: payload
            }

        default:
            return state;
    }
}

export default commentReducer;