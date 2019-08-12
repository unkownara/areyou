import React from 'react';
import styled from 'styled-components';

const TnCTriggerWrapper = styled.div``

const TnC = styled.p`
    font-size: 14px;
    color: #4A90E2;
    letter-spacing: -0.4px;
    font-weight: bold;

    &:hover{
        text-decoration: underline;
    }
`

const Links = styled.a`
    text-decoration: none;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 0.2px;
    
    &:hover{
        text-decoration: underline;
    }
`

export default function TnCTrigger() {
    return (
        <TnCTriggerWrapper>
            <Links href="/terms-and-conditions" target="_blank"><TnC></TnC>Terms and Conditions</Links>
        </TnCTriggerWrapper>
    );
}