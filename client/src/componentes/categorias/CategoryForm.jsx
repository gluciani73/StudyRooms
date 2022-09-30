import React, {useState} from "react";
import '../answers/AnswerForm.css';

export default function CategoryForm ({categoryInitial, buttonText, buttonAction, buttonCancel}) {

    const categoryInitialStatus = {
        category: ''
    }

    const [categoryItem, setCategoryItem] = useState(categoryInitial ? {...categoryInitial} : categoryInitialStatus);
    const [errorList, setErrorList] = useState('');

    function handleChange(event) {
        setCategoryItem({...categoryItem, [event.target.name]: event.target.value})
    }

    function validateCategory() {
        if(!categoryItem.category || categoryItem.category.length === 0) {
            setErrorList('The category text can not be empty');
            return true;
        } else {
            setErrorList('');
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const error = validateCategory();
        if (error) {
            return;
        }
        buttonAction(categoryItem);
    }

    return (
        <div>
            <form className='answerFormContainer' onSubmit={e => handleSubmit(e)}>
                <div className='inputLabelField'>
                    <label className="answerTitle">Category: </label>
                    <input placeholder='Category description'
                              className='answerTextarea'
                              onChange={(e) => handleChange(e)}
                              onBlur={() => validateCategory()}
                              value={categoryItem.category}
                              name={'category'}
                    />
                    <span className="errorMessage">{errorList}</span>
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
