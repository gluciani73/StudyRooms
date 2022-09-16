import React, {useState} from "react";

export default function AnswerForm ({answerInitial, buttonText, buttonAction}) {

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
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label className="createTitle">Answer: </label>
                    <textarea placeholder='Answer description'
                              onChange={(e) => handleChange(e)}
                              onBlur={() => validateAnswer()}
                              value={answerItem.answer}
                              name={'answer'}
                              rows={5}
                    />
                    <span className="errorMessage">{errorAnswer}</span>
                </div>

                <div>
                    <button className="buttonAction">
                        {buttonText ? buttonText : 'Action'}
                    </button>
                </div>
            </form>
        </div>
    );
}
