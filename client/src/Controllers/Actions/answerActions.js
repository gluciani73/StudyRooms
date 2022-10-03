import axios from "axios";

export const GET_ANSWER_LIST = "GET_ANSWER_LIST";
export const CREATE_ANSWER_ITEM = "CREATE_ANSWER_ITEM";
export const UPDATE_ANSWER_ITEM = "UPDATE_ANSWER_ITEM";
export const DELETE_ANSWER_ITEM = "DELETE_ANSWER_ITEM";
export const UPDATE_ANSWER_VOTE = "UPDATE_ANSWER_VOTE";
export const DELETE_ANSWER_VOTE = "DELETE_ANSWER_VOTE";
export const UPDATE_ANSWER_RATE = "UPDATE_ANSWER_RATE";
export const SORT_ANSWER_LIST = "SORT_ANSWER_LIST";
export const GET_RATING_LIST = "GET_RATING_LIST";
export const GET_VOTING_LIST = "GET_VOTING_LIST";

export const getAnswerList = (questionId) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.get(`/answers/${questionId}`, {headers:{"Authorization":`Bearer ${token}`}})
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
        const token = localStorage.getItem("token")
        axios.post(`/answers`, answerItem, {headers:{"Authorization":`Bearer ${token}`}})

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
        const token = localStorage.getItem("token")
        axios.put(`/answers/${answerItem.id}`, answerItem, {headers:{"Authorization":`Bearer ${token}`}})

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
        const token = localStorage.getItem("token")
        axios.delete(`/answers/${answerItem.id}`, {headers:{"Authorization":`Bearer ${token}`}})
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
        const token = localStorage.getItem("token")
        axios.post(`/answers/vote/${voteInfo.answerId}`, voteInfo, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator updateAnswerVote: ", error))
            .then(response => {
                dispatch({
                    type: UPDATE_ANSWER_VOTE,
                    payload: {
                        ...voteInfo,
                        votingList: response.data.votingList
                    }
                });
            });
    }
}

export const deleteAnswerVote = (voteInfo) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.delete(`/answers/${voteInfo.answerId}/vote/${voteInfo.userId}`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator updateAnswerVote: ", error))
            .then(response => {
                dispatch({
                    type: DELETE_ANSWER_VOTE,
                    payload: {
                        ...voteInfo,
                        votingList: response.data.votingList
                    }
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
        const token = localStorage.getItem("token")
        axios.put(`/answers/rating/${ratingInfo.answerId}`, ratingInfo, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator updateAnswerRating: ", error))
            .then((response) => {
                dispatch({
                    type: UPDATE_ANSWER_RATE,
                    payload: response.data
                });
            });
    }
}

export const getRatingList = (userId, questionId) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.get(`/answers/${questionId}/rating/${userId}`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator getRatingList: ", error))
            .then((response) => {
                dispatch({
                    type: GET_RATING_LIST,
                    payload: response.data
                });
            });
    }
}

export const getVotingList = (userId, questionId) => {
    return function (dispatch) {
        const token = localStorage.getItem("token")
        axios.get(`/answers/${questionId}/voting/${userId}`, {headers:{"Authorization":`Bearer ${token}`}})
            .catch(error => console.log("Action creator getVotingList: ", error))
            .then((response) => {
                dispatch({
                    type: GET_VOTING_LIST,
                    payload: response.data
                });
            });
    }
}
