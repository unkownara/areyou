import React from 'react';
import styled from 'styled-components';
import {useInput} from "./hooks";
import {user_info_url} from './backend/Apis';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
`

const AppName = styled.div`
    color: #000;
    font-size: 42px;
    font-weight: bold;
    margin: 0px auto 75px auto;
`


const TagLine = styled.div`
    color: #000;
    font-size: 14px;
`

const SignUpHeading = styled.p`
    width: 300px;
    padding-left: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    color: gray;
`

const EmailInput = styled.input`
    width: 300px;
    height: 50px;
    color: gray;
    border-radius: 10px;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 0.6px;
    border: none;
    border: 1px solid #eee;
    padding: 10px;
    outline: none;

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

const OR = styled.div`
    font-size: 12px;
    margin-top: 30px;
    color: gray;
`

function Login() {

    const emailId = useInput('');

    const onSubmit = () => {
        import('./backend/ApiRequests').then(obj => {
            let params = {
                userId: emailId.value
            };
            obj.getApiRequestCall(user_info_url, params, function(response) {
                try {
                    console.log('response from server ', response);
                } catch (e) {
                    console.log('oops something went wrong');
                }
            })
        })
    };

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
        <LoginWrapper>
            <AppName>You Are</AppName>
            {/* <TagLine>Share your answers with out "you are" questions. Happy sharing!</TagLine> */}
            <SignUpHeading>Sign Up</SignUpHeading>
            <EmailInput
                placeholder={'Email'}
                {...emailId}
            />
            <Button onClick={onSubmit}>Let's Go</Button>
            <TagLine>One click sign up and Happy sharing!</TagLine>
            <OR>or</OR>
            <Button>View Other Answers</Button>
        </LoginWrapper>
    );
}



export default Login;