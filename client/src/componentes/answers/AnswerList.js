import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswerList} from "../../Controllers/Actions/answerActions";
import {useParams} from "react-router-dom";
import AnswerCreate from "./AnswerCreate";
import './AnswerList.css';
import AnswerEdit from "./AnswerEdit";

export default function AnswerList () {

    const { questionId } = useParams();
    const dispatch = useDispatch();
    const answerList = useSelector(state => state.answerStore.answerList);
    const [showEditForm, setShowEditForm] = useState(false);
    const [answerEditId, setAnswerEditId] = useState(null);

    useEffect(() => {
        if (answerList.length === 0) {
            dispatch(getAnswerList(questionId));
        }
    }, [dispatch, questionId, answerList.length]);

    function handleShowEditForm(answerId) {
        setAnswerEditId(answerId);
        setShowEditForm(!showEditForm);
    }

    function handleEditCancel() {
        setAnswerEditId(null);
        setShowEditForm(!showEditForm);
    }

    function renderAnswerItem(answerItem) {
        return (
            <div className='singleAnswer' key={answerItem.id}>
                <h3>Answer {answerItem.id}</h3>
                <p>{answerItem.answer}</p>
                {!(showEditForm && answerEditId === answerItem.id) && (
                    <button className="buttonEdit"
                            onClick={e => handleShowEditForm(answerItem.id)}
                            disabled={showEditForm}
                    >
                        Edit
                    </button>
                )}
                {showEditForm && answerEditId === answerItem.id && (
                    <AnswerEdit userId={'2223456' /*todo - update with auth*/}
                                questionId={questionId}
                                answerItem={answerItem}
                                handleCancel={handleEditCancel}
                    />
                )}
            </div>
        );
    }

    function renderAnswerList() {
        if (answerList.length === 0) {
            return (
                <div className='questionListContainer'>
                    <h3>The store is empty...</h3>
                </div>
            );
        }
        return (
            <div className='questionListContainer'>
                <h2>Question {questionId}</h2>
                {answerList.map(item => renderAnswerItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderAnswerList()}
            <AnswerCreate userId={'2223456' /*todo - update with auth*/}
                          questionId={questionId}
            />
        </div>
    );
}
