import React, {useState} from "react";
import '../answers/AnswerForm.css';
import './UserForm.css';

export default function UserForm({userInitial, buttonText, buttonAction, buttonCancel}) {

    const [userItem, setUserItem] = useState(userInitial ? userInitial : {});
    const [errorList, setErrorList] = useState({});

    const regexName = /^[\dA-Za-z\s-]*$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

    function handleChange(event) {
        setUserItem({...userItem, [event.target.name]: event.target.value})
    }

    function validateUserName() {
        if (!userItem.userName || userItem.userName.length === 0) {
            setErrorList({...errorList, userName: 'The user name can not be empty'});
            return true;
        } else if (!regexName.test(userItem.userName)) {
            setErrorList({...errorList, userName: 'The user name should contain only letters and numbers.'});
            return true;
        } else {
            setErrorList({...errorList, userName: undefined});
            return false;
        }
    }

    function validateFirstName() {
        if (!userItem.firstName || userItem.firstName.length === 0) {
            setErrorList({...errorList, firstName: 'The first name can not be empty'});
            return true;
        } else if (!regexName.test(userItem.firstName)) {
            setErrorList({...errorList, firstName: 'The first name should contain only letters and numbers.'});
            return true;
        } else {
            setErrorList({...errorList, firstName: undefined});
            return false;
        }
    }

    function validateLastName() {
        if (!userItem.lastName || userItem.lastName.length === 0) {
            setErrorList({...errorList, lastName: 'The last name can not be empty'});
            return true;
        } else if (!regexName.test(userItem.lastName)) {
            setErrorList({...errorList, lastName: 'The last name should contain only letters and numbers.'});
            return true;
        } else {
            setErrorList({...errorList, lastName: undefined});
            return false;
        }
    }

    function validateEmail() {
        if (!userItem.email || userItem.email.length === 0) {
            setErrorList({...errorList, email: 'The email can not be empty'});
            return true;
        } else if (!regexEmail.test(userItem.email)) {
            setErrorList({...errorList, email: 'The email is not well formed.'});
            return true;
        } else {
            setErrorList({...errorList, email: undefined});
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateUserName() ||
            validateFirstName() ||
            validateLastName() ||
            validateEmail()
        ) {
            return;
        }
        buttonAction(userItem);
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='userFormContainer'>

                    <div>
                        <div className='inputLabelField'>
                            <label className="answerTitle">User name: </label>
                            <input placeholder='User name'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateUserName()}
                                   value={userItem.userName}
                                   name={'userName'}
                            />
                            <span className="errorMessage">{errorList.userName}</span>
                        </div>

                        <div className='inputLabelField'>
                            <label className="answerTitle">First name: </label>
                            <input placeholder='First name'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateFirstName()}
                                   value={userItem.firstName}
                                   name={'firstName'}
                            />
                            <span className="errorMessage">{errorList.firstName}</span>
                        </div>

                        <div className='inputLabelField'>
                            <label className="answerTitle">Last name: </label>
                            <input placeholder='Last name'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateLastName()}
                                   value={userItem.lastName}
                                   name={'lastName'}
                            />
                            <span className="errorMessage">{errorList.lastName}</span>
                        </div>
                    </div>

                    <div>
                        <div className='inputLabelField'>
                            <label className="answerTitle">Email: </label>
                            <input placeholder='Email'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateEmail()}
                                   value={userItem.email}
                                   name={'email'}
                            />
                            <span className="errorMessage">{errorList.email}</span>
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Admin: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleChange(e)}
                                   value={userItem.isAdmin}
                                   name={'isAdmin'}
                            />
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Premium: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleChange(e)}
                                   value={userItem.isPremium}
                                   name={'isPremium'}
                            />
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Active: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleChange(e)}
                                   value={userItem.active}
                                   name={'active'}
                            />
                        </div>
                    </div>
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
