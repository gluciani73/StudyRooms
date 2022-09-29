import axios from "axios";
import { ADD_LIKES, DELETE_LIKES, URL_BACK } from "../../constants";
const token = localStorage.getItem("token")

export function postLikesQuestions(data) {
    return async function (dispatch) {
        var info = await axios.post(`${URL_BACK}questions/like/${data.questionId}`, {headers:{"Authorization":`Bearer ${token}`}} ,data);
        
        return dispatch({
            type: ADD_LIKES,
            payload: info.data
        })
    }
}


export const deleteLikesQuestions = (data) => {
    return async function (dispatch) {
        var info = await axios.delete(`${URL_BACK}questions/like/${data.questionId}?userId=${data.userId}`, {headers:{"Authorization":`Bearer ${token}`}});
        return  dispatch({
                type: DELETE_LIKES,
                payload: info.data
        });
    }
};
    