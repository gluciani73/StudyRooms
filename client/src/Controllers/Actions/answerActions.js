import axios from "axios";

export const GET_ANSWER_LIST = "GET_ANSWER_LIST";
export const CREATE_ANSWER_ITEM = "CREATE_ANSWER_ITEM";
export const UPDATE_ANSWER_ITEM = "UPDATE_ANSWER_ITEM";
export const DELETE_ANSWER_ITEM = "DELETE_ANSWER_ITEM";
export const UPDATE_ANSWER_VOTE = "UPDATE_ANSWER_VOTE";
export const UPDATE_ANSWER_RATE = "UPDATE_ANSWER_RATE";
export const SORT_ANSWER_LIST = "SORT_ANSWER_LIST";

export const getAnswerList = (questionId) => {
    return function (dispatch) {
        axios.get(`/answers/${questionId}`)
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

        axios.post(`/answers`, answerItem)

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

        axios.put(`/answers/${answerItem.id}`, answerItem)

            .catch(error => console.log("Action creator updateAnswerItem: ", error))
            .then(response => {
                dispatch({
                    type: UPDATE_ANSWER_ITEM,
                    payload: response.data.data
                });
            });
    }
}

export const deleteAnswerItem = (answerItem) => {
    return function (dispatch) {

        axios.delete(`/answers/${answerItem.id}`)
            .catch(error => console.log("Action creator deleteAnswerItem: ", error))
            .then(() => {
                dispatch({
                    type: DELETE_ANSWER_ITEM,
                    payload: { id: answerItem.id, questionId: answerItem.questionId }
                });
            });
    }
}

export const updateAnswerVote = (voteInfo) => {
    return function (dispatch) {

        axios.post(`/answers/vote/${voteInfo.answerId}`, voteInfo)
            .catch(error => console.log("Action creator updateAnswerVote: ", error))
            .then(() => {
                dispatch({
                    type: UPDATE_ANSWER_VOTE,
                    payload: voteInfo
                });
            });
    }
}

export const sortAnswerList = (sortOption) => {
    return {
        type: SORT_ANSWER_LIST,
        payload: sortOption
    }
}

export const updateAnswerRating = (ratingInfo) => {
    return function (dispatch) {

        axios.put(`/answers/rating/${ratingInfo.answerId}`, ratingInfo)
            .catch(error => console.log("Action creator updateAnswerRating: ", error))
            .then((response) => {
                dispatch({
                    type: UPDATE_ANSWER_RATE,
                    payload: response.data
                });
            });
    }
}

