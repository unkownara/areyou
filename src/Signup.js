import React from 'react';
import styled from 'styled-components';

import { useInput } from './Input';
import SkipToAnswers from './SkipToAnswers';

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
    margin-top: 0;
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
        color: #09198A;
        font-weight: bold;
    }
`

const Input = styled.input`
    width: 300px;
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
`

function SignUp() {

    const email = useInput('');
    const password = useInput('');
    const phone = useInput('');
    const name = useInput('');

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

    return (
        <SignUpWrapper>
            <AppName>Are You ?</AppName>
            {/* <TagLine>Share your answers with out "you are" questions. Happy sharing!</TagLine> */}
            <SignUpHeading>Sign Up</SignUpHeading>
            <Input
                {...name}
                placeholder={'Name'}
            />
            <Input
                {...email}
                placeholder={'Email'}
            />
            <Input
                {...phone}
                type="number"
                placeholder={'Phone'}
            />
            <Input
                {...password}
                placeholder={'Password'}
            />
            <Button>Sign Up</Button>
            <LoginRedirect>Alreadt a member? <span>Login</span></LoginRedirect>
            <OR>or</OR>
            <SkipToAnswers />
        </SignUpWrapper>
    );
}



export default SignUp;