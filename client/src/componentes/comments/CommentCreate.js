import React from "react";
import CommentForm from "./CommentForm";
import {useDispatch} from "react-redux";
import {createCommentItem} from "../../Controllers/Actions/commentActions"
import './CommentCreate.css';

export default function CommentCreate({userId, questionId})  {

    const dispatch = useDispatch();

    function handleCreateButton(commentItem) {
        const commentUpdated = {...commentItem, userId, questionId}
        dispatch(createCommentItem(commentUpdated));
    }

    return (
        <div className='createCommentContainer'>
            <h1 className='createAnswerTitle'>Create Comment</h1>
            <CommentForm buttonText={'Create'}
                         buttonAction={handleCreateButton}
            />
        </div>
    );
}
