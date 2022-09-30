import axios from "axios";
import {
  GET_QUESTIONLIST,
  ADD_QUESTION,
  GET_DETAILS,
  URL_BACK,
  GET_CATEGORIES,
  SEARCH_QUESTION,
  LOGICALDELETEQ
} from "../../constants";
// addQuestions getQuestions

const token = localStorage.getItem("token")

export function getQuestions() {
    return async function (dispatch) {
        const info = await axios.get(`${URL_BACK}questions`, {headers:{"Authorization":`Bearer ${token}`}}, {});
        return dispatch({
            type: GET_QUESTIONLIST,
            payload: info.data
        })
    }
}
export function getCategories(){
    return async function (dispatch){
        const categories = await axios.get(`${URL_BACK}categories`, {headers:{"Authorization":`Bearer ${token}`}}, {})
        return dispatch({
            type:GET_CATEGORIES,
            payload: categories.data
        })
    }
}
export function addQuestions(data) {
    return async function (dispatch) {
        var info = await axios.post(`${URL_BACK}questions`,{headers:{"Authorization":`Bearer ${token}`}} , data);
        return dispatch({
            type: ADD_QUESTION,
            payload: info.data
        })
    }
}

export function getDetail(id) {
    return async function (dispach) {
        try {
            var json = await axios.get(`${URL_BACK}questions/${id}`, {headers:{"Authorization":`Bearer ${token}`}});
            return dispach({
                type: GET_DETAILS,
                payload: json.data
            })
        } catch (error) {
            console.log(error)

        }
    }
  };
export function searchQuestion(text) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${URL_BACK}search/question?string=${text}`);
      console.log(json.data)
      return dispatch({
        type: SEARCH_QUESTION,
        payload: json.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function logDelete(id, input){
  return async function (dispatch){
      try {
          var json = await axios.delete(`/questions/${id}`,input)
          return dispatch({
              type: LOGICALDELETEQ,
              payload: json.data
              
          })
      }catch (error){
              console.log(error)
          }
        }}