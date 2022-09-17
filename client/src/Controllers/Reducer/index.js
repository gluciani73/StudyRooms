import { combineReducers } from "redux";
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";
import questionReducer from './QuestionReducer'

export default combineReducers({
    userReducer,
    answerStore: answerReducer,
    questionReducer
})
