import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import cookie from 'react-cookies';
import ReactGA from 'react-ga';

import { useInput } from '../Components/hooks';
import SkipToAnswers from '../Components/SkipToAnswers';
import { makeid } from '../Functions/Generics';
import history from "../history";
import { user_info_url, user_name_checking_url } from "../backend/Apis";

import ShowEye from '../Images/eye.png';
import HideEye from '../Images/eyecross.png';
import { getApiRequestCall } from '../backend/ApiRequests';
import { func } from 'prop-types';

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 50px;
`

const AppName = styled.div`
    color: #000;
    font-size: 42px;
    font-weight: bold;
    margin: 10px auto 35px auto;
`

const SignUpHeading = styled.p`
    width: 300px;
    padding-left: 10px;
    text-align: center;
    font-size: 20px;
    color: gray;
`

const OR = styled.div`
    font-size: 12px;
    margin-top: 20px;
    color: gray;
`

const LoginRedirect = styled.div`
    color: #000;
    letter-spacing: 0.5px;
    font-size: 14px;
    
    &>span {
        cursor: pointer;
        color: #09198A;
        font-weight: bold;
    }

    &:hover{
        &>span {
            text-decoration: underline;
        }
    }

    @media(max-width: 700px){
        &>span {
            cursor: default;
        }

        &:hover{
            &>span {
                text-decoration: none;
            }
        }
    }
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div``

const Input = styled.input`
    width: 300px;
    height: 50px;
    color: #000;
    border-radius: 7px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.6px;
    border: none;
    border: 1px solid #eee;
    padding: 10px;
    outline: none;
    margin: ${props => props.margin || '20px auto 0px auto'};

    &::placeholder{
        color: #d3d3d3;
    }

    &:focus{
        outline: 0;
        border: 1px solid #09198A;
    }
`

const ErrorLabel = styled.span`
    z-index: 999;
    color: red;
    font-size: 11px;
    font-weight: 500;
    background: #fff;
    letter-spacing: 1px;
    position: absolute;
    padding: 0 5px;
    margin: ${props => props.margin || '0'};
`

const Button = styled.div`
    background: #09198A;
    height: ${props => props.login ? '60px' : '40px'};
    vertical-align: middle;
    line-height: 40px;
    width: 300px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin: 30px auto 20px auto;
    cursor: pointer;
    letter-spacing: 1px;
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};
    opacity: ${props => props.disabled ? '0.7' : '1'};
    
    @media(max-width: 700px){
        cursor: default;
    }
`

const LoaderLine = keyframes`
    0% {
        margin-left: 0px;
        width: 10px;
    }

    25% {
        width: 30px;
    }

    50% {
        width: 50px;
    }

    75% {
        width: 30px;
    }

    100% {
        margin-left: 260px;
        width: 10px;
    }
`

const LineLoader = styled.div`
    width: 10px;
    height: 5px;
    border-radius: 30px;
    background: white;
    animation: ${LoaderLine} .7s alternate infinite ease-in-out;
`
const PasswordWrapper = styled.div``

const PasswordHiderIcon = styled.img`
    height: 20px;
    width: 20px;
    position: absolute;
    margin-left: -30px;
    margin-top: 35px;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

const UsernameTaken = styled.div`
    font-size: 10px;
    letter-spacing: 1px;
    background: red;
    width: max-content;
    color: white;
    padding: 3px 10px;
    border-radius: 5px;
    margin: 5px 0 0 5px;
    font-weight: bold;
    opacity: 0.6;
`

const ValidatingUsername = styled.div`
    color: #48C9B0;
    font-size: 10px;
    letter-spacing: 1px;
    margin: 5px 0 0 5px;
`

const ErrMsg = styled(UsernameTaken)`
    margin: 0px auto 20px auto;
`

function SignUp() {

    const [errorMsg, setErrorMsg] = useState('');
    const email = useInput('');
    const password = useInput('');
    const phone = useInput('');
    const name = useInput('');
    const [validatingUsername, setValidatingUsername] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [showResponse, setShowResponse] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [verifyingCredentials, setVerifyingCredentials] = useState(false);
    const passswordRef = useRef(null);

    useEffect(() => {
        ReactGA.pageview('/signup');
    }, [])

    function ValidateSignUpFields() {

        let usernameErrorFlag, emailErrorFlag, passErrorFlag = false;

        // Name validation
        if (name.value.length === 0) {
            usernameErrorFlag = false;
            setNameErrorMsg('Required')
        } else if (name.value.length) {
            if (!name.value.match(/^[a-zA-Z_ ]+$/)) {
                usernameErrorFlag = false;
                setNameErrorMsg('Enter correct name')
            }
        }

        // Email Validation
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value.length !== 0 && email.value !== undefined && email.value !== '') {
            if (!regex.test(email.value)) {
                setEmailErrorMsg('Invalid Email')
                emailErrorFlag = true
            } else {
                emailErrorFlag = false
            }
        } else {
            setEmailErrorMsg('Required');
            emailErrorFlag = true
        }

        // Password Vaidation

        if (password.value === '' || password.value.length === 0 || password.value === undefined) {
            setPasswordErrorMsg('Required');
            passErrorFlag = true
        } else if (password.value.length < 8) {
            setPasswordErrorMsg('Minimum 8 chars');
            passErrorFlag = true
        } else {
            passErrorFlag = false
        }

        return usernameErrorFlag || passErrorFlag || emailErrorFlag
    }

    function enterPressed(e) {
        let code = e.keyCode || e.which;
        if (code === 13) {
            SignUpNewUser();
        }
    }

    const SignUpNewUser = () => {
        if (!ValidateSignUpFields() && usernameAvailable) {
            setVerifyingCredentials(true);
            import('../backend/ApiRequests').then(obj => {
                let payload = {
                    userName: name.value,
                    userId: email.value,
                    password: password.value,
                    phoneNumber: phone.value
                };
                obj.postApiRequestCall(user_info_url, payload, function (response) {
                    try {
                        if (response && response.data) {
                            setErrorMsg('');
                            cookie.save('__u_id__', email.value);
                            localStorage.setItem('__u_info__', JSON.stringify(payload));
                            ReactGA.event({
                                category: 'Auth',
                                action: 'User SignUp',
                                label: `User Signed Up on ${(new Date()).toDateString()} at ${(new Date()).getHours()}:${(new Date()).getMinutes()}`
                            });
                            history.push({
                                pathname: '/qna',
                                search: `wall?u_id=${makeid(6)}`,
                                state: { detail: payload }
                            });
                            setVerifyingCredentials(false);
                        } else {
                            setErrorMsg('Something wrong');
                            setVerifyingCredentials(false);
                            ReactGA.event({
                                category: 'Auth',
                                action: 'User Sign Up',
                                label: `Sign Up Error`
                            });
                        }
                    } catch (e) {
                        setErrorMsg('Something wrong');
                        setVerifyingCredentials(false);
                        ReactGA.event({
                            category: 'Auth',
                            action: 'User Sign Up',
                            label: `Sign Up Error ${e}`
                        });
                    }
                })
            });
        } else {
            console.log('Fix Errors')
            setVerifyingCredentials(false);
        }
    };

    function validateUsername() {
        let params = {
            userName: name.value
        }
        setValidatingUsername(true);
        if (name.value.length) {
            setShowResponse(true);
            getApiRequestCall(user_name_checking_url, params, function (response) {
                try {
                    if (response.data === true) {
                        setUsernameAvailable(true);
                        setValidatingUsername(false);
                    } else {
                        setUsernameAvailable(false);
                        setValidatingUsername(false);
                        ReactGA.event({
                            category: 'Auth',
                            action: 'User Sign Up',
                            label: `User tried for existing username.`
                        });
                    }
                } catch (e) {
                    setUsernameAvailable(true);
                    setValidatingUsername(false);
                    ReactGA.event({
                        category: 'Auth',
                        action: 'User Sign Up',
                        label: `Username Check Error ${e}`
                    });
                }
            });
        } else {
            setShowResponse(false);
        }
    }

    const logInRedirect = () => {
        history.push('/login');
    };

    function togglePassword() {
        setShowPass(!showPass);
        passswordRef.current.focus();
    }

    useEffect(() => {
        setPasswordErrorMsg('')
    }, [password.value]);

    useEffect(() => {
        setEmailErrorMsg('')
    }, [email.value]);

    useEffect(() => {
        setNameErrorMsg('')
    }, [name.value]);


    useEffect(() => {
        setPhoneErrorMsg('')
    }, [phone.value]);


    return (
        <SignUpWrapper>
            <AppName>Are You ?</AppName>
            {/* <TagLine>Share your answers with out "you are" questions. Happy sharing!</TagLine> */}
            <SignUpHeading>Sign Up</SignUpHeading>
            <InputWrapper>
                <InputContainer>
                    <Input
                        {...name}
                        placeholder={'Username'}
                        onKeyPress={(e) => enterPressed(e)}
                        disabled={verifyingCredentials}
                        onBlur={validateUsername}
                    />
                    {
                        nameErrorMsg.length ?
                            <ErrorLabel
                                margin={nameErrorMsg === 'Required' ? '13.5px 0px 0px -70px' : nameErrorMsg === 'Enter correct name' ? '13.5px 0px 0px -120px' : '13.5px 0px 0px -127px'}>{nameErrorMsg}</ErrorLabel> : null
                    }
                    {
                        showResponse ?
                            validatingUsername ?
                                <ValidatingUsername>Validating username...</ValidatingUsername> :
                                usernameAvailable ? <ValidatingUsername>Username Available.</ValidatingUsername> :
                                    <UsernameTaken>Username already taken.</UsernameTaken> : null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        {...email}
                        placeholder={'Email'}
                        onKeyPress={(e) => enterPressed(e)}
                        disabled={verifyingCredentials}
                    />
                    {
                        emailErrorMsg.length ?
                            <ErrorLabel
                                margin={emailErrorMsg === 'Required' ? '13.5px 0px 0px -70px' : emailErrorMsg === 'Invalid Email' ? '13.5px 0px 0px -92px' : '13.5px 0px 0px -127px'}>{emailErrorMsg}</ErrorLabel> : null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        {...phone}
                        type="number"
                        placeholder={'Phone (Optional)'}
                        onKeyPress={(e) => enterPressed(e)}
                        disabled={verifyingCredentials}
                    />
                    {
                        phoneErrorMsg.length ?
                            <ErrorLabel
                                margin={phoneErrorMsg === 'Required' ? '13.5px 0px 0px -70px' : phoneErrorMsg === 'Invalid number' ? '13.5px 0px 0px -103px' : '13.5px 0px 0px -127px'}>{phoneErrorMsg}</ErrorLabel> : null
                    }
                </InputContainer>
                <PasswordWrapper>
                    <Input
                        ref={passswordRef}
                        {...password}
                        type={showPass ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Password"
                        onKeyPress={(e) => enterPressed(e)}
                        disabled={verifyingCredentials}
                    />
                    {
                        <PasswordHiderIcon src={showPass ? ShowEye : HideEye}
                            onClick={togglePassword}
                            alt={'pass'} />
                    }
                    {
                        passwordErrorMsg.length ?
                            <ErrorLabel
                                margin={passwordErrorMsg === 'Required' ? '13.5px 0px 0px -70px' : '13.5px 0px 0px -115px'}>{passwordErrorMsg}</ErrorLabel> : null
                    }
                </PasswordWrapper>
            </InputWrapper>
            <Button
                onClick={verifyingCredentials ? null : SignUpNewUser}
                disabled={verifyingCredentials}
                login={verifyingCredentials}>
                <span>{!verifyingCredentials ? "Sign Up" : 'Signing you up ...'}</span>
                {
                    verifyingCredentials ?
                        <LineLoader /> : null
                }
            </Button>
            {
                errorMsg.length ?
                    <ErrMsg>{errorMsg}</ErrMsg> : null
            }
            <LoginRedirect>Already a member? <span onClick={logInRedirect}>Login</span></LoginRedirect>
            <OR>or</OR>
            <SkipToAnswers origin={'Sign Up Page'} />
        </SignUpWrapper>
    );
}



export default SignUp;