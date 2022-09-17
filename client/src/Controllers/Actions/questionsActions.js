import axios from "axios";
// addQuestions getQuestions

export const GET_QUESTIONLIST= "GET_QUESTIONSLIST";

export function getQuestions() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/questions",{ });
        return dispatch({
        type: GET_QUESTIONLIST,
        payload: info.data
    })
}
}
