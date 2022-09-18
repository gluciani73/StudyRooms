import React from "react";
import AnswerForm from "./AnswerForm";
import {useDispatch} from "react-redux";
import {updateAnswerItem} from "../../Controllers/Actions/answerActions";

export default function AnswerEdit({userId, questionId, answerItem, handleAction, handleCancel}) {

    const dispatch = useDispatch();

    function handleEditButton(answerItem) {
        const answerUpdated = {...answerItem, userId, questionId}
        dispatch(updateAnswerItem(answerUpdated));
        handleAction();
    }

    function handleCancelButton() {
        handleCancel()
    }

    return (
        <div>
            <h3>Edit Answer</h3>
            <AnswerForm buttonText={'Save'}
                        buttonAction={handleEditButton}
                        buttonCancel={handleCancelButton}
                        answerInitial={answerItem}
            />
        </div>
    );
}
