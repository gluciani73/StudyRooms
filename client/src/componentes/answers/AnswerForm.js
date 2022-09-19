import React, {useState} from "react";
import './AnswerForm.css';

export default function AnswerForm ({answerInitial, buttonText, buttonAction, buttonCancel}) {

    const [answerItem, setAnswerItem] = useState(answerInitial ? answerInitial : {});
    const [errorAnswer, setErrorAnswer] = useState('');

    function handleChange(event) {
        setAnswerItem({...answerItem, [event.target.name]: event.target.value})
    }

    function validateAnswer() {
        if(!answerItem.answer || answerItem.answer.length === 0) {
            setErrorAnswer('The answer text can not be empty');
            return true;
        } else {
            setErrorAnswer('');
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateAnswer();
        if (error) {
            return;
        }
        buttonAction(answerItem);
    }

    return (
        <div>
            <form className='answerFormContainer' onSubmit={e => handleSubmit(e)}>
                <div className='inputLabelField'>
                    <label className="answerTitle">Answer: </label>
                    <textarea placeholder='Answer description'
                              className='answerTextarea'
                              onChange={(e) => handleChange(e)}
                              onBlur={() => validateAnswer()}
                              value={answerItem.answer}
                              name={'answer'}
                              rows={5}
                    />
                    <span className="errorMessage">{errorAnswer}</span>
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
