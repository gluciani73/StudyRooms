import { combineReducers } from "redux";
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";
import questionReducer from './QuestionReducer'
import loginReducer from './loginReducer'

export default combineReducers({
    userReducer,
    answerStore: answerReducer,
    questionReducer,
    loginReducer
})
