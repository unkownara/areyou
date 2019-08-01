import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
    height: 60px;
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

const AppName = styled.div``

const AnswerTrigger = styled.div``

export default function Header() {
    return (
        <HeaderWrapper>
            <Wrapper>
                <AppName>You Are</AppName>
            </Wrapper>
            <Wrapper>
                <AnswerTrigger>Answer</AnswerTrigger>
            </Wrapper>
        </HeaderWrapper>
    );
}
