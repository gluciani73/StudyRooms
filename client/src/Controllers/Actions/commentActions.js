import axios from "axios";

export const GET_COMMENT_LIST = "GET_COMMENT_LIST";

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
