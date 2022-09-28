import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactStars from 'react-stars'; //source: https://www.npmjs.com/package/react-stars
import {getAnswerList, deleteAnswerItem, updateAnswerVote, sortAnswerList, updateAnswerRating, getRatingList} from "../../Controllers/Actions/answerActions";
import {SORT_BY_DATE_ASC, SORT_BY_DATE_DSC, SORT_BY_VOTES_ASC, SORT_BY_VOTES_DSC, SORT_BY_RATE_ASC, SORT_BY_RATE_DSC} from "../../Controllers/Reducer/answerReducer";
import AnswerCreate from "./AnswerCreate";
import './AnswerList.css';
import AnswerEdit from "./AnswerEdit";
import upVote from '../../recursos/thumbs.png'
import sweetalert from 'sweetalert';

export default function AnswerList ({questionId}) {

    
    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userId = userInfo.id;
    const dispatch = useDispatch();
    const answerList = useSelector(state => state.answerStore.answerList);
    const ratingList = useSelector(state => state.answerStore.ratingList);
    const [showEditForm, setShowEditForm] = useState(false);
    const [answerEditId, setAnswerEditId] = useState(null);
    const sortOption = useSelector(state => state.answerStore.sortOption);

    useEffect(() => {
        if (questionId && answerList.length === 0) {
            dispatch(getAnswerList(questionId));
        }
    }, [dispatch, questionId, answerList.length]);

    useEffect(() => {
        if (userId && questionId && !ratingList) {
            dispatch(getRatingList(userId, questionId));
        }
    }, [dispatch, userId, answerList, ratingList])

    function handleShowEditForm(answerId) {
        setAnswerEditId(answerId);
        setShowEditForm(!showEditForm);
    }

    function handleHideEditForm() {
        setAnswerEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeleteAnswerItem(answerItem) {
        sweetalert({
            title:"Action confirmation",
            text: "Do your really want to delete your answer?",
            icon: "warning",
            buttons: ["Cancel", "Delete"],
            dangerMode: true,
        }).then(value => {
            if(value) {
                dispatch(deleteAnswerItem(answerItem));
            }
        });
    }

    function showCreateForm() {
        if(!userInfo || !userInfo.id) {
            return false;
        }
        const answerItem = answerList.find(item =>
            item.userId === userId
        )
        return !answerItem;
    }

    function handleVoteUpClick(answerId, answerUserId) {
        if(userId !== answerUserId) {
            dispatch(updateAnswerVote({
                userId,
                answerId
            }));
        }
        else {
            sweetalert({
                title:"Action not allowed",
                text: `You can not vote for your own answer.`
            });
        }
    }

    function handleOrderChange(event) {
        dispatch(sortAnswerList(event.target.value));
    }

    function handleRateChange(answerUserId, answerId, rating) {
        if(userId !== answerUserId) {
            dispatch(updateAnswerRating({userId, questionId, answerId, rating}));
        }
        else {
            sweetalert({
                title:"Action not allowed",
                text: `You can not rate your own answer.`
            });
        }
    }

    function renderAnswerItem(answerItem) {
        let ratingValue = 0;
        if (ratingList && ratingList.length !== 0) {
            const ratingItem = ratingList.find(item =>
                item.id === answerItem.id &&
                item.ratingxanswers &&
                item.ratingxanswers.length !== 0 &&
                item.ratingxanswers[0].userId === userId
            );
            if (ratingItem) {
                ratingValue = Number(ratingItem.ratingxanswers[0].rating);
            }
        }
        return (
            <div className='singleAnswer' key={answerItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Answer from {answerItem.user.userName}</h3>
                    <div>
                        <div className="ratingContainer">
                            <span><b>Rating:</b> {Number(answerItem.ratingAverage).toFixed(1)} </span>
                            <ReactStars
                                className="stars"
                                value={Number(answerItem.ratingAverage)}
                                edit={false}
                                size={20}
                            />
                            <span>({answerItem.ratingCount} rates) </span>
                        </div>
                        <span className="voteLike" onClick={() => handleVoteUpClick(answerItem.id, answerItem.userId)}>
                            <img src={upVote} alt="" height="20px" width="20px" /> {answerItem.voteCount} likes
                        </span>
                        <span> <b>Last update:</b> {answerItem.updatedAt}</span>
                    </div>
                </div>
                <p>{answerItem.answer}</p>
                {userId === answerItem.userId && !(showEditForm && answerEditId === answerItem.id) && (
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
                {userId && (
                    <ReactStars
                        value={ratingValue}
                        onChange={(newRate) => handleRateChange(answerItem.userId, answerItem.id, newRate)}
                        edit={true}
                        size={30}
                    />
                )}
                {showEditForm && answerEditId === answerItem.id && (
                    <AnswerEdit userId={answerItem.userId}
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
                <div className='answerListContainer'>
                    <h3>The store is empty...</h3>
                </div>
            );
        }
        return (
            <div className='answerListContainer'>
                <div className="singleAnswerTitle">
                    <h2>Answer List</h2>
                    <div className='filterSelect'>
                        <label htmlFor="sort-list"><b>Order by: </b></label>
                        <select id="sort-list"
                                onChange={(e) => {handleOrderChange(e)}}
                                value={sortOption}
                        >
                            <option value={SORT_BY_DATE_ASC}>Date ascending</option>
                            <option value={SORT_BY_DATE_DSC}>Date descending</option>
                            <option value={SORT_BY_VOTES_ASC}>Votes ascending</option>
                            <option value={SORT_BY_VOTES_DSC}>Votes descending</option>
                            <option value={SORT_BY_RATE_ASC}>Rating ascending</option>
                            <option value={SORT_BY_RATE_DSC}>Rating descending</option>
                        </select>
                    </div>
                </div>
                {answerList.map(item => renderAnswerItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderAnswerList()}
            {showCreateForm() &&
                <AnswerCreate userId={userId}
                              questionId={questionId}
                />
            }
        </div>
    );
}
