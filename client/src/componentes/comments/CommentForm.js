import React, {useState} from "react";
import './CommentForm.css';

export default function CommentForm ({commentInitial, buttonText, buttonAction, buttonCancel}) {

    const [commentItem, setCommentItem] = useState(commentInitial ? commentInitial : {});
    const [errorComment, setErrorComment] = useState('');

    function handleChange(event) {
        setCommentItem({...commentItem, [event.target.name]: event.target.value})
    }

    function validateComment() {
        if(!commentItem.comment || commentItem.comment.length === 0) {
            setErrorComment('The comment text can not be empty');
            return true;
        } else {
            setErrorComment('');
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateComment();
        if (error) {
            return;
        }
        buttonAction(commentItem);
    }

    return (
        <div>
            <form className='answerFormContainer' onSubmit={e => handleSubmit(e)}>
                <div className='inputLabelField'>
                    <label className="answerTitle">Comment: </label>
                    <textarea placeholder='Comment description'
                              className='answerTextarea'
                              onChange={(e) => handleChange(e)}
                              onBlur={() => validateComment()}
                              value={commentItem.comment}
                              name={'comment'}
                              rows={5}
                    />
                    <span className="errorMessage">{errorComment}</span>
                </div>

                <div>
                    <button className="buttonAction" type='submit'>
                        {buttonText ? buttonText : 'Action'}
                    </button>
                    {buttonCancel && (
                        <button className="buttonCancel"
                                onClick={() => buttonCancel()}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
