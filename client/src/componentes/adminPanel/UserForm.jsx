import React, {useState} from "react";
import '../answers/AnswerForm.css';
import './UserForm.css';

export default function UserForm({buttonText, buttonAction, buttonCancel}) {

    const userInitialStatus = {
        userName: '',
        firstName: '',
        lastName: '',
        avatar: '',
        email: '',
        isAdmin: false,
        isPremium: false,
        active: false,
        password: '',
        passConfirm: '',
    };
    const [userItem, setUserItem] = useState(userInitialStatus);
    const [errorList, setErrorList] = useState({});

    const regexName = /^[\dA-Za-z\s-]*$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
    const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    function handleChange(event) {
        setUserItem({...userItem, [event.target.name]: event.target.value})
    }

    function validateUserName() {
        if (!userItem.userName || userItem.userName.length === 0) {
            setErrorList({...errorList, userName: 'The user name can not be empty'});
            return true;
        } else if (userItem.userName.length > 10) {
            setErrorList({...errorList, userName: 'The user name can not greater than 10'});
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

    function validateUrl() {
        if (!userItem.avatar || userItem.avatar.length === 0) {
            setErrorList({...errorList, avatar: "The avatar's url can not be empty"});
            return true;
        } else if (!regexUrl.test(userItem.avatar)) {
            setErrorList({...errorList, avatar: "The avatar's url is not well formed."});
            return true;
        } else {
            setErrorList({...errorList, avatar: undefined});
            return false;
        }
    }

    function validatePassword() {
        return validatePasswordValue("password", "password")
    }

    function validatePassConfirm() {
        return validatePasswordValue("passConfirm", "confirmed password")
    }

    function validatePasswordValue(passField, fieldName) {
        const errorListNew = {...errorList}
        if (!userItem[passField] || userItem[passField].length === 0) {
            errorListNew[passField] = `The ${fieldName} can not be empty`
            setErrorList(errorListNew);
            return true;
        } else if (userItem[passField].length < 8 ) {
            errorListNew[passField] = `The ${fieldName} should be 8 letters minimum.`;
            setErrorList(errorListNew);
            return true;
        } else if (userItem[passField].length > 16 ) {
            errorListNew[passField] = `The ${fieldName} should be 16 letters maximum.`;
            setErrorList(errorListNew);
            return true;
        }
        else if (!regexPassword.test(userItem[passField])) {
            errorListNew[passField] = `The confirm ${fieldName} contains numbers, lower and upper letters and special characters.`;
            setErrorList(errorListNew);
            return true;
        } else if (userItem.password !== userItem.passConfirm) {
            setErrorList({...errorList, passConfirm: "The password and confirmed password do not match."});
            return true;
        } else {
            errorListNew[passField] = undefined;
            setErrorList(errorListNew);
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validateUserName() &&
            validateFirstName() &&
            validateLastName() &&
            validateEmail() &&
            validateUrl()
        ) {
            return;
        }
        buttonAction({...userItem});
        setUserItem(userInitialStatus);
    }

    return (
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className='userFormContainer'>

                    <div>
                        <div className='inputLabelField'>
                            <label className="answerTitle">User name: </label>
                            <input placeholder='User name'
                                   className='inputField'
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
                                   className='inputField'
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
                                   className='inputField'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateLastName()}
                                   value={userItem.lastName}
                                   name={'lastName'}
                            />
                            <span className="errorMessage">{errorList.lastName}</span>
                        </div>

                        <div className='inputLabelField'>
                            <label className="answerTitle">Avatar's url: </label>
                            <input placeholder="Avatar's url"
                                   className='inputField'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validateUrl()}
                                   value={userItem.avatar}
                                   name={'avatar'}
                            />
                            <span className="errorMessage">{errorList.avatar}</span>
                        </div>
                    </div>

                    <div>
                        <div className='inputLabelField'>
                            <label className="answerTitle">Email: </label>
                            <input placeholder='Email'
                                   className='inputField'
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

                        <div className='inputLabelField'>
                            <label className="answerTitle">Password: </label>
                            <input placeholder='Password'
                                   className='inputField'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validatePassword()}
                                   value={userItem.password}
                                   name={'password'}
                                   type="password"
                            />
                            <span className="errorMessage">{errorList.password}</span>
                        </div>

                        <div className='inputLabelField'>
                            <label className="answerTitle">Confirm password: </label>
                            <input placeholder='Confirm password'
                                   className='inputField'
                                   onChange={(e) => handleChange(e)}
                                   onBlur={() => validatePassConfirm()}
                                   value={userItem.passConfirm}
                                   name={'passConfirm'}
                                   type="password"
                            />
                            <span className="errorMessage">{errorList.passConfirm}</span>
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
