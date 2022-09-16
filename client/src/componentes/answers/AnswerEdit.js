import React from "react";
import AnswerForm from "./AnswerForm";
import {useDispatch} from "react-redux";
//import {saveAnswerItem} from "../../Actions";

export default function AnswerEdit({userId, questionId, answerItem, handleCancel}) {

    const dispatch = useDispatch();

    function handleEditButton(answerItem) {
        const answerUpdated = {...answerItem, userId, questionId}
        //dispatch(saveAnswerItem(answerUpdated));
    }

    function handleCancelButton() {
        handleCancel()
    }

    return (
        <div>
            <h3>Edit Answer</h3>
            <AnswerForm buttonText={'Edit'}
                        buttonAction={handleEditButton}
                        buttonCancel={handleCancelButton}
                        answerInitial={answerItem}
            />
        </div>
    );
}
