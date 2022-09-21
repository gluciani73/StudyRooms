import axios from "axios";
import {GET_QUESTIONLIST,ADD_QUESTION, GET_DETAILS, URL_BACK} from  "../../constants";
// addQuestions getQuestions



export function getQuestions() {
    return async function (dispatch) {
        const info = await axios.get(`http://localhost:3001/questions`,{ });
        return dispatch({
        type: GET_QUESTIONLIST,
        payload: info.data
    })
}}
export function addQuestions(data){
    return async function (dispatch){
        var info = await axios.post(`http://localhost:3001/questions`,data);
        return dispatch({
        type: ADD_QUESTION,
        payload: info.data
    })
}}


export function getDetail (id){
    return async function(dispach){
        try {
            var json = await axios.get(`http://localhost:3001/questions/${id}`);           
            return dispach({
                type: GET_DETAILS,
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error)
            
        }
    }}