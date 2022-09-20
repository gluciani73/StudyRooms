import {
    GET_COMMENT_LIST,
    CREATE_COMMENT_ITEM,
    DELETE_COMMENT_ITEM,
    UPDATE_COMMENT_ITEM,
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

        case CREATE_COMMENT_ITEM:
            return {
                ...state,
                commentList: [...state.commentList, payload]
            };

        case UPDATE_COMMENT_ITEM:
            return {
                ...state,
                commentList: state.commentList.map(item =>
                    item.id === payload.id ? payload : item
                )
            };

        case DELETE_COMMENT_ITEM:
            return {
                ...state,
                commentList: state.commentList.filter(item =>
                    item.id !== payload.id && item.questionId === payload.questionId
                )
            };

        default:
            return state;
    }
}

export default commentReducer;