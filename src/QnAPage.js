import React, { useState } from 'react';
import styled from 'styled-components';

import { useInput } from './Input';
import SkipToAnswers from './SkipToAnswers';

import Happy from './happy1.png';
import Sad from './sad1.png';

const QnAWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: 0 auto;

    @media(max-width: 700px){
        width: 100%;
    }
`

const Question = styled.p`
    text-align: left;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    letter-spacing: 0.22px;
    line-height: 29px;
`

const AnswerInput = styled.textarea`
    border: 1px solid #CACACA;
    border-radius: 5px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    padding: 5px;
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

const OR = styled.div`
    font-size: 12px;
    margin-top: 10px;
    color: gray;
`

const ToggleButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 220px;
    margin: 10px auto 20px auto;
`

const ToggleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 6px;
    border: ${props => props.selected ? 'none' : '1px solid #eee'};
    background: ${props => props.selected ? '#BDF0FF' : '#fff'};
    cursor: pointer;

    &:hover {
        background: #BDF0FF;
    }

    @media(max-width: 700px){
        cursor: default;
    }
`

const ToggleIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ToggleIcon = styled.img`
    height: 30px;
    width: 30px;
`

const ToggleText = styled.div`
    padding-left: 5px;
    font-weight: bold;
    color: ${props => props.selected ? '#000' : 'gray'};
`

const Info = styled.div`
    color: gray;
    font-size: 14px;
    width: 100%;
    text-align: left;
    margin: 8px 0 10px 0;
    letter-spacing: 0.5px;
`

function QnAPage() {

    const answer = useInput('');
    const [yesSelected, setYesSelected] = useState(false);
    const [noSelected, setNoSelected] = useState(false);

    function toggleYesNo(type) {
        if (type === 'yes') {
            setYesSelected(true);
            setNoSelected(false);
        }
        else if (type === 'no') {
            setYesSelected(false);
            setNoSelected(true);
        }
    }

    return (
        <QnAWrapper>
            <Question>Are you happy with the salary you are getting?Are you happy with the salary you are getting? If yes or no, why?</Question>
            <ToggleButtonWrapper>
                <ToggleButton selected={yesSelected} onClick={() => toggleYesNo('yes')}>
                    <ToggleIconWrapper>
                        <ToggleIcon src={Happy} />
                    </ToggleIconWrapper>
                    <ToggleText selected={yesSelected}>Yes</ToggleText>
                </ToggleButton>
                <ToggleButton selected={noSelected} onClick={() => toggleYesNo('no')}>
                    <ToggleIconWrapper>
                        <ToggleIcon src={Sad} />
                    </ToggleIconWrapper>
                    <ToggleText selected={noSelected}>No</ToggleText>
                </ToggleButton>
            </ToggleButtonWrapper>
            <Info>Express yourself in words.</Info>
            <AnswerInput
                rows={7}
                {...answer} />
            <Button>Submit Answer</Button>
            <OR>or</OR>
            <SkipToAnswers />
        </QnAWrapper>
    );
}

export default QnAPage;