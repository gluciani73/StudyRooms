import axios from "axios";

export const GET_ANSWER_LIST = "GET_ANSWER_LIST";

const baseUrl =  'https://w9489.mocklab.io'; //'http://localhost:3001';

export const getAnswerList = (questionId) => {
    return function (dispatch){
        axios.get(`${baseUrl}/answers/${questionId}`)
            .catch(error => console.log("Action creator getAnswerList:", error))
            .then(response => {
                dispatch({
                    type: GET_ANSWER_LIST,
                    payload: response.data
                });
            });
    }
}

