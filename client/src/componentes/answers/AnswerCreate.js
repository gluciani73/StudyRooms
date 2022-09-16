import React from "react";
import AnswerForm from "./AnswerForm";
import {useDispatch} from "react-redux";
import {createAnswerItem} from "../../Actions"
import './AnswerCreate.css';

export default function AnswerCreate({userId, questionId})  {

    const dispatch = useDispatch();

    function handleCreateButton(answerItem) {
        const answerUpdated = {...answerItem, userId, questionId}
        dispatch(createAnswerItem(answerUpdated));
    }

    return (
        <div className='createAnswerContainer'>
            <h1 className='createAnswerTitle'>Create Answer</h1>
            <AnswerForm buttonText={'Create'}
                        buttonAction={handleCreateButton}
            />
        </div>
    );
}
