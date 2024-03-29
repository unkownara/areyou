import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import cookie from "react-cookies";
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

import TnCTrigger from '../Components/TnCTrigger';
import { useInput } from "../Components/hooks";
import { user_info_url } from '../backend/Apis';
import SkipToAnswers from '../Components/SkipToAnswers';
import history from "../history";
import { makeid } from "../Functions/Generics";

import ShowEye from '../Images/eye.png';
import HideEye from '../Images/eyecross.png';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  padding-bottom: 30px;
`

const AppName = styled.div`
    color: #000;
    font-size: 42px;
    font-weight: bold;
    margin: 10px auto 10px auto;

    @media(max-width: 700px){
        margin: 0px auto 10px auto;
    }
`

const TagLine = styled.div`
    margin: 5px auto 60px auto;
    letter-spacing: 1px;
    color: gray;
    
    @media(max-width: 700px){
        margin: 0px auto 35px auto;
    }
`

const LoginHeading = styled.p`
    width: 300px;
    padding-left: 10px;
    text-align: center;
    font-size: 20px;
    color: gray;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div``

const Input = styled.input`
    width: 350px;
    height: 50px;
    color: #000;
    border-radius: 7px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: 0.6px;
    border: none;
    border: 1px solid rgb(228, 228, 228);
    padding: 10px;
    outline: none;
    margin: 0 auto 20px auto;

    &::placeholder{
        color: #d3d3d3;
        font-size: 14px;
    }

    &:focus{
        outline: 0;
        border: 1px solid #09198A;
    }

    @media(max-width: 700px){
        min-width: 300px;
        width: 100%;
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

const SignUpRedirect = styled.div`
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

const OR = styled.div`
    font-size: 12px;
    margin-top: 50px;
    color: gray;
    margin-top: 30px;
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

const CredentialsError = styled.div`
    margin: 0px auto 20px auto;
    font-size: 11px;
    font-weight: bold;
    background: #E74C3C;
    color: #fff;
    padding: 5px 10px;
    letter-spacing: 1px;
    border-radius: 10px;
`

function Login() {

    const email = useInput('');
    const password = useInput('');
    const [showPass, setShowPass] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState('');
    const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
    const [loginErrorMsg, setLoginErrorMsg] = useState('');
    const [verifyingCredentials, setVerifyingCredentials] = useState(false);
    const passswordRef = useRef(null);

    useEffect(() => {
        ReactGA.pageview('/login');
    }, [])

    function ValidateEmailAndPassword() {

        let emailErrFlag, passErrFlag = false;

        let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email.value.length !== 0 && email.value !== undefined && email.value !== '') {
            if (!regex.test(email.value)) {
                setEmailErrorMsg('Invalid Email')
                emailErrFlag = true
            } else {
                emailErrFlag = false
            }
        } else {
            setEmailErrorMsg('Required');
            emailErrFlag = true
        }

        if (password.value === '' || password.value.length === 0 || password.value === undefined) {
            setPasswordErrorMsg('Required');
            passErrFlag = true
        } else {
            passErrFlag = false
        }

        return emailErrFlag || passErrFlag
    }

    function enterPressed(e) {
        let code = e.keyCode || e.which;
        if (code === 13) {
            LoginUser();
        }
    }

    const LoginUser = () => {
        if (!ValidateEmailAndPassword()) {
            setVerifyingCredentials(true);
            setLoginErrorMsg('');
            import('../backend/ApiRequests').then(obj => {
                let params = {
                    userId: email.value,
                    password: password.value
                };
                obj.getApiRequestCall(user_info_url, params, function (response) {
                    try {
                        if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                            setEmailErrorMsg('');
                            cookie.save('__u_id__', email.value);
                            localStorage.setItem('__u_info__', JSON.stringify(response.data.Items[0]));
                            ReactGA.event({
                                category: 'Auth',
                                action: 'User Login',
                                label: `User Logged in on ${(new Date()).toDateString()} at ${(new Date()).getHours()}:${(new Date()).getMinutes()}`
                            });
                            history.push({
                                pathname: '/',
                                // search: `wall?u_id=${makeid(6)}`,
                                // state: { detail: response.data.Items[0] }
                            });
                            setVerifyingCredentials(false);
                        } else if (response.data === "Incorrect password") {
                            setVerifyingCredentials(false);
                            setLoginErrorMsg(response.data);
                            ReactGA.event({
                                category: 'Auth',
                                action: 'User Login',
                                label: 'Invalid Credentials Entered'
                            });
                        } else if (response.data === "Email doesn't exists") {
                            setVerifyingCredentials(false);
                            setLoginErrorMsg(response.data);
                            ReactGA.event({
                                category: 'Auth',
                                action: 'User Login',
                                label: 'Invalid Credentials Entered'
                            });
                        }
                    } catch (e) {
                        setVerifyingCredentials(false);
                        console.log('oops something went wrong');
                        ReactGA.event({
                            category: 'Auth',
                            action: 'User Login',
                            label: `Login Error ${e}`
                        });
                    }
                })
            })
        } else {
            console.log('Fix errors');
            setVerifyingCredentials(false);
        }
    };

    const signUpRedirect = () => {
        history.push('/signup');
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

    return (
        <LoginWrapper>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Are You? | Share yourself</title>
                <meta name="description" content="Are you interested to share yourself?" />
            </Helmet>
            <AppName>Are You ?</AppName>
            <TagLine>Share yourself.</TagLine>
            <LoginHeading>Login</LoginHeading>
            <InputWrapper>
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
                                margin={emailErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : emailErrorMsg === 'Invalid Email' ? '-6.5px 0px 0px -85px' : '-6.5px 0px 0px -117px'}>{emailErrorMsg}</ErrorLabel> : null
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
                                margin={passwordErrorMsg === 'Required' ? '-6.5px 0px 0px -65px' : '-6.5px 0px 0px -130px'}>{passwordErrorMsg}</ErrorLabel> : null
                    }
                </PasswordWrapper>
            </InputWrapper>
            <Button
                onClick={verifyingCredentials ? null : LoginUser}
                disabled={verifyingCredentials}
                login={verifyingCredentials}>
                <span>{!verifyingCredentials ? "Let's Go" : 'Verifying ...'}</span>
                {
                    verifyingCredentials ?
                        <LineLoader /> : null
                }
            </Button>
            {
                loginErrorMsg.length ?
                    <CredentialsError margin={'20px auto'}>{loginErrorMsg}</CredentialsError> : null
            }
            <SignUpRedirect>Want to join us? <span onClick={signUpRedirect}>Sign Up</span></SignUpRedirect>
            <OR>or</OR>
            <SkipToAnswers origin={'Login Page'} />
            <TnCTrigger />
        </LoginWrapper>
    );
}



export default Login;