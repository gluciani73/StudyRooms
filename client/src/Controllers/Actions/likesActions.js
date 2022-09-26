import axios from "axios";
import { ADD_LIKES, DELETE_LIKES, URL_BACK } from "../../constants";

export function postLikesQuestions(data,questionId) {
    return async function (dispatch) {
        var info = await axios.post(`${URL_BACK}questions/like/${questionId}`,data);
        return dispatch({
            type: ADD_LIKES,
            payload: info.data
        })
    }
}

export const deleteLikesQuestions = (data, questionId) => {
    return function (dispatch) {
        var info = axios.delete(`${URL_BACK}questions/like/${questionId}`,data);
        return  dispatch({
                    type: DELETE_LIKES,
                    payload: info.data
        });
    }
};
    