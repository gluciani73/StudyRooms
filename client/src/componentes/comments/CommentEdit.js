import React from "react";
import CommentForm from "./CommentForm";
import {useDispatch} from "react-redux";
import {updateCommentItem} from "../../Controllers/Actions/commentActions";

export default function CommentEdit({userId, questionId, commentItem, handleAction, handleCancel}) {

    const dispatch = useDispatch();

    function handleEditButton(commentItem) {
        const commentUpdated = {...commentItem, userId, questionId}
        dispatch(updateCommentItem(commentUpdated));
        handleAction();
    }

    function handleCancelButton() {
        handleCancel()
    }

    return (
        <div>
            <h3>Edit Comment</h3>
            <CommentForm buttonText={'Save'}
                         buttonAction={handleEditButton}
                         buttonCancel={handleCancelButton}
                         commentInitial={commentItem}
            />
        </div>
    );
}
