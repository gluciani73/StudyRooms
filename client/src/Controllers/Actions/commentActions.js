import axios from "axios";

export const GET_COMMENT_LIST = "GET_COMMENT_LIST";
export const CREATE_COMMENT_ITEM = "CREATE_COMMENT_ITEM";
export const UPDATE_COMMENT_ITEM = "UPDATE_COMMENT_ITEM";
export const DELETE_COMMENT_ITEM = "DELETE_COMMENT_ITEM";

const baseUrl =  'https://w9489.mocklab.io'; //'http://localhost:3001';

export const getCommentList = (questionId) => {
    return function (dispatch){
        axios.get(`${baseUrl}/comments/${questionId}`)
            .catch(error => console.log("Action creator getCommentList:", error))
            .then(response => {
                dispatch({
                    type: GET_COMMENT_LIST,
                    payload: response.data
                });
            });
    }
}

export const createCommentItem = (commentItem) => {
    return {
        type: CREATE_COMMENT_ITEM,
        payload: commentItem
    };
}

export const updateCommentItem = (commentItem) => {
    return {
        type: UPDATE_COMMENT_ITEM,
        payload: commentItem
    }
}

export const deleteCommentItem = (commentItem) => {
    return {
        type: DELETE_COMMENT_ITEM,
        payload: commentItem
    }
}
