import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCommentList, deleteCommentItem} from "../../Controllers/Actions/commentActions";
import {useParams} from "react-router-dom";
import './CommentList.css';
import CommentEdit from "../comments/CommentEdit";
import CommentCreate from "../comments/CommentCreate";

export default function CommentList () {

    const { questionId } = useParams();
    const userId = '2223456'; /*todo - update with auth*/
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.commentStore.commentList);
    const [showEditForm, setShowEditForm] = useState(false);
    const [commentEditId, setCommentEditId] = useState(null);

    useEffect(() => {
        if (commentList.length === 0) {
            dispatch(getCommentList(questionId));
        }
    }, [dispatch, questionId, commentList.length]);

    function handleShowEditForm(commentId) {
        setCommentEditId(commentId);
        setShowEditForm(!showEditForm);
    }

    function handleHideEditForm() {
        setCommentEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeleteCommentItem(commentItem) {
        dispatch(deleteCommentItem(commentItem));
    }

    function renderCommentItem(commentItem) {
        return (
            <div className='singleAnswer' key={commentItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Comment {commentItem.id}</h3>
                    <p>{commentItem.userName}</p>
                    <p>{commentItem.updatedAt}</p>
                </div>
                <p>{commentItem.comment}</p>
                {!(showEditForm && commentEditId === commentItem.id) && (
                    <>
                        <button className="buttonAction"
                                onClick={() => handleShowEditForm(commentItem.id)}
                                disabled={showEditForm}
                        >
                            Edit
                        </button>
                        <button className="buttonCancel"
                                onClick={() => handleDeleteCommentItem(commentItem)}
                                disabled={showEditForm}
                        >
                            Delete
                        </button>
                    </>
                )}
                {showEditForm && commentEditId === commentItem.id && (
                    <CommentEdit userId={userId}
                                 questionId={questionId}
                                 commentItem={commentItem}
                                 handleAction={handleHideEditForm}
                                 handleCancel={handleHideEditForm}
                    />
                )}

            </div>
        );
    }

    function renderCommentList() {
        if (commentList.length === 0) {
            return (
                <div className='questionListContainer'>
                    <h3>The store is empty...</h3>
                </div>
            );
        }
        console.log("commentList", commentList)
        return (
            <div className='questionListContainer'>
                <h2>Question {questionId}</h2>
                {commentList.map(item => renderCommentItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderCommentList()}
            <CommentCreate userId={userId}
                           questionId={questionId}
            />
        </div>
    );
}
