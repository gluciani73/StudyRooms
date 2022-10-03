import axios from "axios";
import { ADD_LIKES, DELETE_LIKES, URL_BACK, ADD_RATING } from "../../constants";


export function postLikesQuestions(data) {
    return async function (dispatch) {
        const token = localStorage.getItem("token")
        var info = await axios.post(`${URL_BACK}questions/like/${data.questionId}`,data, {headers:{"Authorization":`Bearer ${token}`}});
        
        return dispatch({
            type: ADD_LIKES,
            payload: info.data
        })
    }
}


export const deleteLikesQuestions = (data) => {
    return async function (dispatch) {
        const token = localStorage.getItem("token")
        var info = await axios.delete(`${URL_BACK}questions/like/${data.questionId}?userId=${data.userId}`, {headers:{"Authorization":`Bearer ${token}`}});
        return  dispatch({
                type: DELETE_LIKES,
                payload: info.data
        });
    }
};
    
export function rateQuestions(data) {
    return async function (dispatch) {
        console.log(data)
        const token = localStorage.getItem("token")
        await axios.put(`${URL_BACK}/questions/rate/${data.questionId}`, data, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator updateAnswerRating: ", error))
            .then((response) => {
                dispatch({
                    type: ADD_RATING,
                    payload: response.data
                });
            });
    }
}


