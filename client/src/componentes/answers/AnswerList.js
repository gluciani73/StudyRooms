import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswerList} from "../../Controllers/Actions/answerActions";
import {useParams} from "react-router-dom";
import AnswerCreate from "./AnswerCreate";
import './AnswerList.css';

export default function AnswerList () {

    const { questionId } = useParams();
    const dispatch = useDispatch();
    const answerList = useSelector(state => state.answerList);
    
    useEffect(() => {
        if (answerList.length === 0) {
            dispatch(getAnswerList(questionId));
        }
    }, [dispatch, questionId, answerList.length]);

    function renderAnswerItem(answerItem) {
        return (
            <div className='singleAnswer' key={answerItem.id}>
                <h3>Answer {answerItem.id}</h3>
                <p>{answerItem.answer}</p>
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
