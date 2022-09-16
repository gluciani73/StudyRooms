import { combineReducers } from "redux";
import userReducer from "./userReducer";
import answerReducer from "./answerReducer";

export default combineReducers({
    userReducer,
    answerStore: answerReducer,
})
