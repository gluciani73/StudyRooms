import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswerList, deleteAnswerItem} from "../../Controllers/Actions/answerActions";
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

    function handleHideEditForm() {
        setAnswerEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeleteAnswerItem(answerItem) {
        dispatch(deleteAnswerItem(answerItem));
    }

    function renderAnswerItem(answerItem) {
        return (
            <div className='singleAnswer' key={answerItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Answer {answerItem.id}</h3>
                    <p>John Smith{answerItem.id}</p>
                </div>
                <p>{answerItem.answer}</p>
                {!(showEditForm && answerEditId === answerItem.id) && (
                    <>
                        <button className="buttonAction"
                                onClick={() => handleShowEditForm(answerItem.id)}
                                disabled={showEditForm}
                        >
                            Edit
                        </button>
                        <button className="buttonCancel"
                        onClick={() => handleDeleteAnswerItem(answerItem)}
                        disabled={showEditForm}
                        >
                        Delete
                        </button>
                    </>
                )}
                {showEditForm && answerEditId === answerItem.id && (
                    <AnswerEdit userId={'2223456' /*todo - update with auth*/}
                                questionId={questionId}
                                answerItem={answerItem}
                                handleAction={handleHideEditForm}
                                handleCancel={handleHideEditForm}
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
