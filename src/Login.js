import React from 'react';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const AppName = styled.div`

`

const TagLine = styled.div``

const SignUpHeading = styled.div``

const EmailInput = styled.input`
  
`

const SignUpButton = styled.div``

function Login() {
    return (
        <LoginWrapper>
            <AppName>Moody</AppName>
            <TagLine></TagLine>
            <SignUpHeading>Sign Up</SignUpHeading>
            <EmailInput

            />
            <SignUpButton>Sign Up</SignUpButton>
        </LoginWrapper>
    );
}



export default Login;