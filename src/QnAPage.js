import React from 'react';
import styled from 'styled-components';

const QnAWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Question = styled.div``

const AnswerInput = styled.textarea``

const SubmitAnswerButton = styled.div``

const SeeOtherAnsButton = styled.div``

function QnAPage() {
    return (
        <QnAWrapper>
            <Question>Are you happy?</Question>
            <AnswerInput></AnswerInput>
            <SubmitAnswerButton>Submit Answer</SubmitAnswerButton>
            <SeeOtherAnsButton>See Answers</SeeOtherAnsButton>
        </QnAWrapper>
    );
}

export default QnAPage;