import axios from "axios";
// addQuestions getQuestions

export function addQuestions(payload) {
    return async function (dispatch) {        
        const info = await axios.post("http://localhost:3001/question", payload);
        return dispatch({
        type: 'ADD_QUESTION',
        payload: info.data
    })
}
}

export function getQuestions() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/question",{ });
        return dispatch({
        type: 'GET_QUESTION',
        payload: info.data
    })
}
}
