import React, { useState } from 'react';
import styled from 'styled-components';

import WallPost from './Post';
import SkipToAnswers from './SkipToAnswers';

import NoData from './no-data.png';

const ProfileWrapper = styled.div`
    margin-top: 30px;
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProfileImage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-weight: bold;
    font-size: 46px;
    height: 70px;
    width: 70px;
    background: ${props => props.bg || '#eee'};
    border-radius: 50%;
`
const ProfileName = styled.p`
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    padding-top: 2px;
`
const HR = styled.div`
    margin: 10px auto 30px auto;
    border-bottom: 1px solid #eee;
`

const Info = styled.div`
    color: gray;
    font-size: 14px;
    text-align: center;
`

const NoDataIcon = styled.img`
    height: 300px;
    width: 350px;

    @media(max-width: 700px){
        height: 200px;
        width: 230px;
    }
`

const SkipWrapper = styled.div`
    width: max-content;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const OR = styled.div`
    font-size: 12px;
    margin-top: 50px;
    color: gray;
    margin-top: 30px;
`

const Ans = 'My parents did exactly that. They did not have any plan for me to come first in life. They just took things as  they came, eveling in the beautiful journey of teaching their child to talk and talk more. They did not compete with anyone nor did they push me to compete. I ambled along at my own pace, going from strength to strength as I moved up the classes. I was never a good student in school. In fact my class reports had begun to worry my teachers who were sensitive of their school’s reputation. So, when I got through my boards in the 1st Division, they were elated. I have never looked back since then! I completed my Masters in Social Work from the Tata Institute of Social Sciences, Mumbai and am currently pursuing a PhD in Social Work as a UGC JRF from Visva-Bharati University, the university set up by the poet Nobel Laureate Rabindranath Tagore in Santiniketan, West Bengal. I also teach BSW and MSW students at the university as part of my duties as a PhD Fellow. The beautiful irony is that I was not supposed to speak, but here I was, poised to make a living from speaking and teaching. Without the solid base in language that was prepared for me early in life, I am sure I would not have been able to make my own choices in life so naturally. So, though my parents didn’t plan for me to come first in life, things fell into place and worked out in the end.'

export default function Profile({ answers, userName }) {

    function getRandomColor() {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    return (
        <ProfileWrapper>
            <ImageWrapper>
                <ProfileImage bg={getRandomColor(userName.substring(0, 1).toLowerCase())}>{userName.substring(0, 1)}</ProfileImage>
            </ImageWrapper>
            <ProfileName>Aravind Manoharan</ProfileName>
            <Info>{answers && answers.length ? `Your answers` : `Looks like you have not answered any questions. To answer, click on "Answer" button in top right corner.`}</Info>
            <SkipWrapper>
                <OR>or</OR>
                <SkipToAnswers />
            </SkipWrapper>
            <HR />
            {
                answers && answers.length ?
                    <WallPost
                        answer={Ans}
                        liked={true}
                        likesCount={`1.2 k`}
                        userName={`Aravind Manoharan`}
                        uploadDate={'May 23rd, 2019 at 3:57 PM'}
                    />
                    :
                    <ImageWrapper>
                        <NoDataIcon src={NoData} />
                    </ImageWrapper>
            }
        </ProfileWrapper>
    );
}