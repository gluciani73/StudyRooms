import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCommentList} from "../../Controllers/Actions/commentActions";
import {useParams} from "react-router-dom";
import './CommentList.css';

export default function CommentList () {

    const { questionId } = useParams();
    const dispatch = useDispatch();
    const commentList = useSelector(state => state.commentStore.commentList);

    useEffect(() => {
        if (commentList.length === 0) {
            dispatch(getCommentList(questionId));
        }
    }, [dispatch, questionId, commentList.length]);

    function renderAnswerItem(commentItem) {
        return (
            <div className='singleAnswer' key={commentItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Comment {commentItem.id}</h3>
                    <p>{commentItem.userName}</p>
                    <p>{commentItem.updatedAt}</p>
                </div>
                <p>{commentItem.comment}</p>
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
            <div className='questionListContainer'>
                <h2>Comment {questionId}</h2>
                {commentList.map(item => renderAnswerItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderCommentList()}
        </div>
    );
}
