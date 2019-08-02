import React, { useState } from 'react';
import styled from 'styled-components';
import { useInput } from './Input';
import SkipToAnswers from './SkipToAnswers';
import history from "./history";
import {user_info_url} from "./backend/Apis";
import cookie from "react-cookies";
import {makeid} from "./Generics";

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

    const [errorMsg, setErrorMsg] = useState('');

    const email = useInput('');
    const password = useInput('');
    const phone = useInput('');
    const name = useInput('');

    const onSubmit = () => {
        import('./backend/ApiRequests').then(obj => {
            let payload = {
                name: name.value,
                userId: email.value,
                password: password.value,
                phoneNumber: phone.value
            };
            obj.postApiRequestCall(user_info_url, payload, function(response) {
                try {
                    if(response && response.data) {
                        if(response.data === "user already exists") {
                            setErrorMsg('User already exits.');
                        } else {
                            setErrorMsg('');
                            cookie.save('__u_id__', email.value);
                            history.push({
                                pathname: '/',
                                search: `?u_id=${makeid(6)}`,
                                state: {detail: payload}
                            });
                        }
                    } else {
                        setErrorMsg('Something wrong');
                    }
                } catch (e) {
                    console.log('something went wrong');
                    setErrorMsg('Something wrong');
                }
            })
        });
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

    const logInRedirect = () => {
        history.push('/login');
    };

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
            <Button onClick={onSubmit}>Sign Up</Button>
            {errorMsg}
            <LoginRedirect>Already a member? <span onClick={logInRedirect}>Login</span></LoginRedirect>
            <OR>or</OR>
            <SkipToAnswers />
        </SignUpWrapper>
    );
}



export default SignUp;