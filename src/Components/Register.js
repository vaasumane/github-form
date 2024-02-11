import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faEye, faEyeSlash, faCheck } from '@fortawesome/free-solid-svg-icons';
import firebase, { auth, firestore } from '../Config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [showForm, setShowForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [passwordValid, setPasswordValid] = useState(false);
    const [usernameValid, setUsernameValid] = useState(false);
    const [loading, setloading] = useState(false);


    const handleAnimationEnd = () => {
        setShowForm(true);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const validateEmail = (value) => {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (isValid) {
            setEmail(value);
            setErrorText('');
        } else {
            setErrorText('Please enter valid email');
        }
        setEmailValid(isValid);
        return isValid;
    };

    const validatePassword = (value) => {
        const isValid = value.length >= 8;
        setErrorText('');
        if (value.length < 0) {
            setErrorText('Make sure it is at least 8 characters');
            setPasswordValid(false);
            return;
        }
        if (value.length < 8) {
            setErrorText('Make sure it is at least 8 characters');
            setPasswordValid(false);
            return;
        }
        if (!value.match(/[A-z]/)) {
            setErrorText('At least one letter');
            setPasswordValid(false);
            return;
        }
        if (!value.match(/[A-Z]/)) {
            setErrorText('At least one Capital letter');
            setPasswordValid(false);
            return;
        }
        if (!value.match(/\d/)) {
            setErrorText('At least one number');
            setPasswordValid(false);
            return;
        }
        if (!value.match(/\W|_/g)) {
            setErrorText('At least one special character');
            setPasswordValid(false);
            return;
        }
        setPasswordValid(true);
        setPassword(value);

        return isValid;
    };

    const validateUsername = (value) => {
        const isValid = value.trim().length > 0;
        if (isValid) {
            setUsernameValid(value);
            setErrorText('');
        } else {
            setErrorText('Please enter username');
        }
        setUsername(value);
        return isValid;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'email':
                validateEmail(value);
                break;
            case 'password':
                validatePassword(value);
                break;
            case 'username':
                validateUsername(value);
                break;
            default:
                break;
        }
    };
    const handleClick = (event) => {
        const button = event.target;
        button.classList.add("d-none");
        const buttonId = button.getAttribute('data-continue-to');
        const buttonDiv = document.getElementById(buttonId);
        console.log(buttonDiv);

        if (buttonDiv) {
            buttonDiv.classList.remove("d-none");
        }
    };
    const onFocusChange = (event) => {
        const inputElement = event.target;
        let parentElement = inputElement.parentElement;

        console.log(parentElement);
        const nearestButton = parentElement.querySelector(`button.signup-continue-button`);
        const allButtons = document.querySelectorAll('button.signup-continue-button');
        allButtons.forEach(button => {
            button.classList.add('d-none');
        });
        if (nearestButton) {
            nearestButton.classList.remove("d-none")
        }
        event.stopPropagation();
    };
    const handleSubmit = async () => {
        setloading(true);

        await firebase.firestore().collection("users").add({
            username: username,
            email: email,
            password: password,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function () {
            toast.success("User Added Successfully");
            setTimeout(function(){
                window.location.reload();
            },3000);
        });
    }
    return (
        <>
            <div className='row justify-content-center pt-12 '>
                <div className='col-lg-6'>
                    <Card className='card-bg-color p-4'>
                        <div className='typewriter'>
                            <p >Welcome to GitHub!</p>
                            <p onAnimationEnd={handleAnimationEnd}> Let’s begin the adventure</p>
                        </div>
                        {showForm && (
                            <form className='form-register'>
                                <div id="email-container" className="js-continue-step-container signup-continue-step-container mt-4 px-sm-0 px-4" data-step-state="active">
                                    <div className="mb-1">
                                        <label htmlFor="email" className="signup-text-prompt">
                                            Enter your email<sup aria-hidden="true">*</sup>
                                        </label>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className='text-center'><FontAwesomeIcon icon={!emailValid ? faArrowRight : faCheck} className={!emailValid ? "" : "text-success"} /></span>
                                        <input name='email' type='email' id='email' className='bg-transparent border-0 w-100' onChange={handleChange} onFocus={onFocusChange} />
                                        <button type="button" className={!emailValid ? 'signup-continue-button' : 'signup-continue-button confirm-button'} data-continue-to="password-container" disabled={!emailValid} onClick={handleClick}>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                                <div id="password-container" className="js-continue-step-container signup-continue-step-container mt-4 px-sm-0 px-4 d-none" >
                                    <div className="mb-1">
                                        <label htmlFor="password" className="signup-text-prompt">
                                            Create a password<sup aria-hidden="true">*</sup>
                                        </label>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className='text-center'><FontAwesomeIcon icon={!passwordValid ? faArrowRight : faCheck} className={!passwordValid ? "" : "text-success"} /></span>
                                        <input name='password' id='password' className='bg-transparent border-0 w-100' type={showPassword ? "text" : "password"} onChange={handleChange} onFocus={onFocusChange} />
                                        <span className='text-center ' onClick={togglePasswordVisibility}> <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></span>
                                        <button type="button" className={!passwordValid ? 'signup-continue-button' : 'signup-continue-button confirm-button'} data-continue-to="username-container" disabled={!passwordValid} onClick={handleClick}>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                                <div id="username-container" className="js-continue-step-container signup-continue-step-container mt-4 px-sm-0 px-4 d-none" data-step-state="active">
                                    <div className="mb-1">
                                        <label htmlFor="username" className="signup-text-prompt">
                                            Enter a username<sup aria-hidden="true">*</sup>
                                        </label>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <span className='text-center'><FontAwesomeIcon icon={!usernameValid ? faArrowRight : faCheck} className={!usernameValid ? "" : "text-success"} /></span>
                                        <input name='username' type='text' id='username' className='bg-transparent border-0 w-100' onChange={handleChange} onFocus={onFocusChange} />
                                        <button type="button" className={!usernameValid ? 'signup-continue-button' : 'signup-continue-button confirm-button'} data-continue-to="create-container" disabled={!usernameValid} onClick={handleClick}>
                                            Continue
                                        </button>
                                    </div>
                                </div>
                                <div className='py-3 text-center d-none' id="create-container">
                                    <button type="button" className='signup-continue-button1 ' onClick={handleSubmit}>
                                        {loading ? 'Loading...' : 'Create an account'}
                                    </button>
                                    <ToastContainer
                                        position="top-right"
                                        autoClose={3000}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    />
                                </div>
                            </form>
                        )}
                    </Card>
                    <div>
                        <p className='errorText py-4 text-gray-light-mktg'>{errorText}</p>
                    </div>
                </div>

            </div>
        </>
    )
}
