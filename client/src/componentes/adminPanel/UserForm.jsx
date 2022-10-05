import React, {useState} from "react";
import '../answers/AnswerForm.css';
import './UserForm.css';

export default function UserForm({userInitial, buttonText, buttonAction, buttonCancel}) {

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
    const [userItem, setUserItem] = useState(userInitial ? {...userInitial} : userInitialStatus);
    const [errorUserName, setErrorUserName] = useState('');
    const [errorFirstName, setErrorFirstName] = useState('');
    const [errorLastName, setErrorLastName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorUrl, setErrorUrl] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorPassConfirm, setErrorPassConfirm] = useState('');

    const regexName = /^[\dA-Za-z\s-]*$/;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //source: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const regexUrl = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g;
    const regexPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

    function handleChange(event) {
        setUserItem({...userItem, [event.target.name]: event.target.value})
    }

    function handleCheckboxChange(event) {
        setUserItem({...userItem, [event.target.name]: !userItem[event.target.name]})
    }

    function validateUserName() {
        if (!userItem.userName || userItem.userName.length === 0) {
            setErrorUserName('The user name can not be empty');
            return true;
        } else if (userItem.userName.length > 10) {
            setErrorUserName('The user name can not greater than 10');
            return true;
        } else if (!regexName.test(userItem.userName)) {
            setErrorUserName('The user name should contain only letters and numbers.');
            return true;
        } else {
            setErrorUserName('');
            return false;
        }
    }

    function validateFirstName() {
        if (!userItem.firstName || userItem.firstName.length === 0) {
            setErrorFirstName('The first name can not be empty');
            return true;
        } else if (userItem.firstName.length < 3) {
            setErrorFirstName('The first name can not less than 3');
            return true;
        } else if (userItem.firstName.length > 15) {
            setErrorFirstName('The first name can not greater than 15');
            return true;
        } else if (!regexName.test(userItem.firstName)) {
            setErrorFirstName('The first name should contain only letters and numbers.');
            return true;
        } else {
            setErrorFirstName('');
            return false;
        }
    }

    function validateLastName() {
        if (!userItem.lastName || userItem.lastName.length === 0) {
            setErrorLastName('The last name can not be empty');
            return true;
        } else if (userItem.lastName.length < 3) {
            setErrorLastName('The last name can not less than 3');
            return true;
        } else if (userItem.lastName.length > 15) {
            setErrorLastName('The last name can not greater than 15');
            return true;
        } else if (!regexName.test(userItem.lastName)) {
            setErrorLastName('The last name should contain only letters and numbers.');
            return true;
        } else {
            setErrorLastName('');
            return false;
        }
    }

    function validateEmail() {
        if (!userItem.email || userItem.email.length === 0) {
            setErrorEmail('The email can not be empty');
            return true;
        } else if (!regexEmail.test(userItem.email)) {
            setErrorEmail('The email is not well formed.');
            return true;
        } else {
            setErrorEmail('');
            return false;
        }
    }

    function validateUrl() {
        if (!userItem.avatar || userItem.avatar.length === 0) {
            setErrorUrl("The avatar's url can not be empty");
            return true;
        } else if (!regexUrl.test(userItem.avatar)) {
            setErrorUrl("The avatar's url is not well formed.");
            return true;
        } else {
            setErrorUrl('');
            return false;
        }
    }

    function validatePassword() {
        return validatePasswordValue("password", "password", setErrorPassword)
    }

    function validatePassConfirm() {
        return validatePasswordValue("passConfirm", "confirmed password", setErrorPassConfirm)
    }

    function validatePasswordValue(passField, fieldName, setErrorMessage) {
        if (!userItem[passField] || userItem[passField].length === 0) {
            setErrorMessage(`The ${fieldName} can not be empty`);
            return true;
        } else if (userItem[passField].length < 8 ) {
            setErrorMessage(`The ${fieldName} should be 8 letters minimum.`);
            return true;
        } else if (userItem[passField].length > 16 ) {
            setErrorMessage(`The ${fieldName} should be 16 letters maximum.`);
            return true;
        }
        else if (!regexPassword.test(userItem[passField])) {
            setErrorMessage(`The confirm ${fieldName} contains numbers, lower and upper letters and special characters.`);
            return true;
        } else if (userItem.password !== userItem.passConfirm) {
            setErrorPassConfirm("The password and confirmed password do not match.");
            return true;
        } else {
            setErrorMessage('');
            return false;
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const isErrorUserName = validateUserName();
        const isErrorFirstName = validateFirstName();
        const isErrorLastName = validateLastName();
        const isErrorEmail = validateEmail();
        const isErrorUrl = validateUrl();
        const isErrorPassword = validatePassword();
        const isErrorPassConfirm = validatePassConfirm();

        if (isErrorUserName ||
            isErrorFirstName ||
            isErrorLastName ||
            isErrorEmail ||
            isErrorUrl ||
            isErrorPassword ||
            isErrorPassConfirm
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
                            <span className="errorMessage">{errorUserName}</span>
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
                            <span className="errorMessage">{errorFirstName}</span>
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
                            <span className="errorMessage">{errorLastName}</span>
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
                            <span className="errorMessage">{errorUrl}</span>
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
                            <span className="errorMessage">{errorEmail}</span>
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Admin: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleCheckboxChange(e)}
                                   checked={userItem.isAdmin}
                                   name={'isAdmin'}
                            />
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Premium: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleCheckboxChange(e)}
                                   checked={userItem.isPremium}
                                   name={'isPremium'}
                            />
                        </div>

                        <div className='inputSelectField'>
                            <label className="userLabelSelect">Is Active: </label>
                            <input type="checkbox"
                                   onChange={(e) => handleCheckboxChange(e)}
                                   checked={userItem.active}
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
                            <span className="errorMessage">{errorPassword}</span>
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
                            <span className="errorMessage">{errorPassConfirm}</span>
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
