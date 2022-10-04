import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCommentList, deleteCommentItem} from "../../Controllers/Actions/commentActions";
import './CommentList.css';
import CommentEdit from "../comments/CommentEdit";
import CommentCreate from "../comments/CommentCreate";

export default function CommentList ({questionId, comments}) {

    
    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userId = userInfo.id;
    const dispatch = useDispatch();
    //const commentList = useSelector(state => state.commentStore.commentList);
    const commentList = comments

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

    function showCreateForm() {
        return(userInfo && userInfo.id);
    }

    function renderCommentItem(commentItem) {
        return (
            <div className='singleAnswer' key={commentItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Comment from {commentItem.user.userName}</h3>
                    <p><b>Last update:</b> {commentItem.updatedAt}</p>
                </div>
                <p>{commentItem.comment}</p>
                {userId === commentItem.userId && !(showEditForm && commentEditId === commentItem.id) && (
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
        return (
            <div className='commentListContainer'>
                <h2>Comment list</h2>
                {commentList.map(item => renderCommentItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderCommentList()}
            {showCreateForm() &&
                <CommentCreate userId={userId}
                               questionId={questionId}
                />
            }
        </div>
    );
}
