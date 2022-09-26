import axios from "axios";
import { ADD_LIKES, DELETE_LIKES, URL_BACK } from "../../constants";

export function postLikesQuestions(data) {
    return async function (dispatch) {
        var info = await axios.post(`${URL_BACK}questions/like/${data.questionId}`,data);
        
        return dispatch({
            type: ADD_LIKES,
            payload: info.data
        })
    }
}


export const deleteLikesQuestions = (data) => {
    return async function (dispatch) {
        var info = await axios.delete(`${URL_BACK}questions/like/${data.questionId}?userId=${data.userId}`);
        return  dispatch({
                type: DELETE_LIKES,
                payload: info.data
        });
    }
};
    