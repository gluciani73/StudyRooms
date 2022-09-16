import React from "react";
import AnswerForm from "./AnswerForm";
import {useDispatch} from "react-redux";
import {createAnswerItem} from "../../Actions"

export default function AnswerCreate({userId, questionId})  {

    const dispatch = useDispatch();

    function handleCreateButton(answerItem) {
        const answerUpdated = {...answerItem, userId, questionId}
        dispatch(createAnswerItem(answerUpdated));
    }

    return (
        <div>
            <h1>Create Answer</h1>
            <AnswerForm buttonText={'Create'}
                        buttonAction={handleCreateButton}
            />
        </div>
    );
}
