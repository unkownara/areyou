import React, { useState } from 'react';
import styled from 'styled-components';

import { useInput } from './Input'
import SkipToAnswers from './SkipToAnswers';

import ShowEye from './eye.png';
import HideEye from './eyecross.png';

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
    margin: 0px auto 60px auto;

    @media(max-width: 700px){
        margin: 0px auto 35px auto;
    }
`


const TagLine = styled.div`
    color: #000;
    font-size: 14px;
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

const Input = styled.input`
    width: 350px;
    height: 50px;
    color: gray;
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
    }

    @media(max-width: 700px){
        width: 100%;
    }
`

const Button = styled.div`
    background: #09198A;
    height: 40px;
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

    @media(max-width: 700px){
        cursor: default;
    }
`

const SignUpRedirect = styled.div`
    color: #000;
    letter-spacing: 0.5px;
    font-size: 14px;

    &>span {
        color: #09198A;
        font-weight: bold;
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

function Login() {

    const email = useInput('');
    const password = useInput('');
    const [showPass, setShowPass] = useState(false);

    // function ValidateEmail(email) {
    //     setVerifyingEmail(false);

    //     var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //     if (email.length !== 0 && email !== undefined && email !== '') {
    //         if (!regex.test(email)) {
    //             setErrorMsg('Invalid Email')
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     } else {
    //         setErrorMsg('Required');
    //     }
    // }

    function enterPressed(e) {
        let code = e.keyCode || e.which;
        if (code === 13) {
        }
    }

    function togglePassword() {
        setShowPass(!showPass)
    }

    return (
        <LoginWrapper>
            <AppName>Are You ?</AppName>
            <LoginHeading>Login</LoginHeading>
            <InputWrapper>
                <Input
                    {...email}
                    placeholder={'Email'}
                />
                <PasswordWrapper>
                    <Input
                        {...password}
                        type={showPass ? 'text' : 'password'}
                        autoComplete="off"
                        placeholder="Password"
                        style={{
                            fontSize: password.value.length ? showPass ? '14px' : '22px' : '14px'
                        }}
                        onKeyPress={(e) => enterPressed(e, 'password')}
                    />
                    {
                        <PasswordHiderIcon src={showPass ? ShowEye : HideEye}
                            className="passHideShowIcon" onClick={togglePassword}
                            alt={'pass'} />
                    }
                </PasswordWrapper>
            </InputWrapper>
            <Button>Let's Go</Button>
            <SignUpRedirect>Want to join us? <span>Sign Up</span></SignUpRedirect>
            <OR>or</OR>
            <SkipToAnswers />
        </LoginWrapper>
    );
}



export default Login;