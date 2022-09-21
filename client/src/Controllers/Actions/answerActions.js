import axios from "axios";

export const GET_ANSWER_LIST = "GET_ANSWER_LIST";
export const CREATE_ANSWER_ITEM = "CREATE_ANSWER_ITEM";
export const UPDATE_ANSWER_ITEM = "UPDATE_ANSWER_ITEM";
export const DELETE_ANSWER_ITEM = "DELETE_ANSWER_ITEM";

const baseUrl = 'http://localhost:3001'; //'https://w9489.mocklab.io';

export const getAnswerList = (questionId) => {
    return function (dispatch){
        axios.get(`${baseUrl}/answers/${questionId}`)
            .catch(error => console.log("Action creator getAnswerList:", error))
            .then(response => {
                dispatch({
                    type: GET_ANSWER_LIST,
                    payload: response.data.data
                });
            });
    }
}

export const createAnswerItem = (answerItem) => {
    return function (dispatch) {
        axios.post(`${baseUrl}/answers`, answerItem)
            .catch(error => console.log("Action creator createAnswerItem: ", error))
            .then(response => {
                dispatch({
                    type: CREATE_ANSWER_ITEM,
                    payload: response.data.data
                });
            });
    }
}

export const updateAnswerItem = (answerItem) => {
    return function (dispatch) {
        axios.put(`${baseUrl}/answers/${answerItem.id}`, answerItem)
            .catch(error => console.log("Action creator updateAnswerItem: ", error))
            .then(response => {
                dispatch({
                    type: UPDATE_ANSWER_ITEM,
                    payload: response.data
                });
            });
    }
}

export const deleteAnswerItem = (answerItem) => {
    return {
        type: DELETE_ANSWER_ITEM,
        payload: answerItem
    }
}

