import React from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import history from '../history';

import Left from '../Images/left-arrow.png';

const SkipWrapper = styled.div`
    display: grid;
    grid-template-columns: 4.6fr 0.4fr;
    margin-top: 10px;
    grid-gap: 8px;
    text-decoration: none;
`

const LeftIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LeftIcon = styled.img`
    height: 15px;
    width: 15px;
    margin-left: 0px;
    transition: all 0.3s ease-in-out;
`

const Skip = styled.div`
    font-weight: bold;
    color: #09198A;
    font-size: 13px;
    letter-spacing: 1px;
    cursor: pointer;

    &:hover{
        ${LeftIcon} {
            margin-left: 10px;
        }
    }

    @media(max-width: 700px){
        cursor: default;
    }
`

export default function SkipToAnswers({ origin }) {

    function redirectToWall() {
        ReactGA.event({
            category: 'Answer View',
            action: 'Skip to Answers',
            label: `User skipped to wall page from ${origin}`
        });
        history.push("/")
    }

    return (
        <SkipWrapper onClick={redirectToWall}>
            <Skip>Skip to see answers</Skip>
            <LeftIconWrapper>
                <LeftIcon src={Left} />
            </LeftIconWrapper>
        </SkipWrapper>
    );
}
