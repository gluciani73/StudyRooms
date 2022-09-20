import { combineReducers } from "redux";
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";
import questionReducer from './QuestionReducer'
import loginReducer from './loginReducer'
import commentReducer from './commentReducer';

export default combineReducers({
    userReducer,
    answerStore: answerReducer,
    questionReducer,
    loginReducer,
    commentStore: commentReducer,
})
