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
<<<<<<< HEAD
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
=======

export function getQuestions() {
  return async function (dispatch) {
    const info = await axios.get(`${URL_BACK}questions`, {});
    return dispatch({
      type: GET_QUESTIONLIST,
      payload: info.data,
    });
  };
}
export function getCategories() {
  return async function (dispatch) {
    const categories = await axios.get(`${URL_BACK}categories`, {});
    return dispatch({
      type: GET_CATEGORIES,
      payload: categories.data,
    });
  };
}
export function addQuestions(data) {
  return async function (dispatch) {
    var info = await axios.post(`${URL_BACK}questions`, data);
    return dispatch({
      type: ADD_QUESTION,
      payload: info.data,
    });
  };
>>>>>>> 03749eb5c0353d29bf45ff6849cba355255e1c96
}

export function getDetail(id) {
<<<<<<< HEAD
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
=======
  return async function (dispach) {
    try {
      var json = await axios.get(`${URL_BACK}questions/${id}`);
      return dispach({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
>>>>>>> 03749eb5c0353d29bf45ff6849cba355255e1c96
    }
  };
}
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
          var json = await axios.put(`/questions/active/${id}`,input)
          return dispatch({
              type: LOGICALDELETEQ,
              payload: json.data
              
          })
      }catch (error){
              console.log(error)
          }
        }}