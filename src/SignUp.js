import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import cookie from 'react-cookies';

import { useInput } from './hooks';
import SkipToAnswers from './SkipToAnswers';
import { makeid } from './Generics';
import history from "./history";
import { user_info_url } from "./backend/Apis";

import ShowEye from './eye.png';
import HideEye from './eyecross.png';

const SignUpWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  /* padding-bottom: 30px; */
`

const AppName = styled.div`
    color: #000;
    font-size: 42px;
    font-weight: bold;
    margin: 0px auto 35px auto;
`

const TagLine = styled.div`
    color: #000;
    font-size: 14px;
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
    margin: 0 auto 20px auto;

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
    margin: 20px auto;
    cursor: pointer;
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

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
    margin-top: 14px;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`


function SignUp() {

    const [errorMsg, setErrorMsg] = useState('');

    const email = useInput('');
    const password = useInput('');
    const phone = useInput('');
    const name = useInput('');
    const [showPass, setShowPass] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [verifyingCredentials, setVerifyingCredentials] = useState(false);
    const passswordRef = useRef(null);

    function ValidateSignUpFields() {

        let errFlag = false;

        // Name validation
        if (name.value.length === 0) {
            errFlag = false;
            setNameErrorMsg('Required')
        } else if (name.value.length) {
            if (!name.value.match(/^[a-zA-Z_ ]+$/)) {
                errFlag = false;
                setNameErrorMsg('Enter correct name')
            }
        }
        // Number validation
        if (phone.value.length === 0) {
            errFlag = false;
            setPhoneErrorMsg('Required')
        } else if (
            !phone.value.match(/^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/) ||
            phone.value.length !== 10
        ) {
            errFlag = false;
            setPhoneErrorMsg('Invalid number')
        }


        // Email Validation
        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value.length !== 0 && email.value !== undefined && email.value !== '') {
            if (!regex.test(email.value)) {
                setEmailErrorMsg('Invalid Email')
                errFlag = true
            } else {
                errFlag = false
            }
        } else {
            setEmailErrorMsg('Required');
            errFlag = true
        }

        // Password Vaidation

        if (password.value === '' || password.value.length === 0 || password.value === undefined) {
            setPasswordErrorMsg('Required');
            errFlag = true
        } else {
            errFlag = false
        }

        return errFlag
    }

    function enterPressed(e) {
        let code = e.keyCode || e.which;
        if (code === 13) {
            SignUpNewUser();
        }
    }
    const SignUpNewUser = () => {
        if (!ValidateSignUpFields()) {
            setVerifyingCredentials(true);
            import('./backend/ApiRequests').then(obj => {
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
                            localStorage.setItem('__u_info__',JSON.stringify(payload));
                            history.push({
                                pathname: '/qns',
                                search: `wall?u_id=${makeid(6)}`,
                                state: { detail: payload }
                            });
                            setVerifyingCredentials(false);
                        } else {
                            setErrorMsg('Something wrong');
                            setVerifyingCredentials(false);
                        }
                    } catch (e) {
                        setErrorMsg('Something wrong');
                        setVerifyingCredentials(false);
                    }
                })
            });
        } else {
            console.log('Fix Errors')
            setVerifyingCredentials(false);
        }
    };

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
                        placeholder={'Name'}
                    />
                    {
                        nameErrorMsg.length ?
                            <ErrorLabel
                                margin={nameErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : nameErrorMsg === 'Enter correct name' ? '-6.5px 0px 0px -115px' : '-6.5px 0px 0px -117px'}>{nameErrorMsg}</ErrorLabel> : null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        {...email}
                        placeholder={'Email'}
                    />
                    {
                        emailErrorMsg.length ?
                            <ErrorLabel
                                margin={emailErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : emailErrorMsg === 'Invalid Email' ? '-6.5px 0px 0px -82px' : '-6.5px 0px 0px -117px'}>{emailErrorMsg}</ErrorLabel> : null
                    }
                </InputContainer>
                <InputContainer>
                    <Input
                        {...phone}
                        type="number"
                        placeholder={'Phone (Optional)'}
                    />
                    {
                        phoneErrorMsg.length ?
                            <ErrorLabel
                                margin={phoneErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : phoneErrorMsg === 'Invalid number' ? '-6.5px 0px 0px -93px' : '-6.5px 0px 0px -117px'}>{phoneErrorMsg}</ErrorLabel> : null
                    }
                </InputContainer>
                <PasswordWrapper>
                    <Input
                        ref={passswordRef}
                        {...password}
                        type={showPass ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Password"
                        onKeyPress={(e) => enterPressed(e, 'password')}
                    />
                    {
                        !passwordErrorMsg.length ?
                            <PasswordHiderIcon src={showPass ? ShowEye : HideEye}
                                onClick={togglePassword}
                                alt={'pass'} /> : null
                    }
                    {
                        passwordErrorMsg.length ?
                            <ErrorLabel
                                margin={passwordErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : '-6.5px 0px 0px -130px'}>{passwordErrorMsg}</ErrorLabel> : null
                    }
                </PasswordWrapper>
            </InputWrapper>
            <Button
                onClick={SignUpNewUser}
                disabled={verifyingCredentials}
                login={verifyingCredentials}>
                <span>{!verifyingCredentials ? "Sign Up" : 'Signing you up ...'}</span>
                {
                    verifyingCredentials ?
                        <LineLoader /> : null
                }
            </Button>
            <LoginRedirect>Already a member? <span onClick={logInRedirect}>Login</span></LoginRedirect>
            <OR>or</OR>
            <SkipToAnswers />
        </SignUpWrapper>
    );
}



export default SignUp;