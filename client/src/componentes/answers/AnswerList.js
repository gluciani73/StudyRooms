import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswerList} from "../../Actions";
import {useParams} from "react-router-dom";
import AnswerCreate from "./AnswerCreate";

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
            <div key={answerItem.id}>
                <h3>Answer {answerItem.id}</h3>
                <p>{answerItem.answer}</p>
                <hr/>
            </div>
        );
    }

    function renderAnswerList() {
        if (answerList.length === 0) {
            return (
                <div>
                    <h3>The store is empty...</h3>
                </div>
            );
        }
        return (
            <div>
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
