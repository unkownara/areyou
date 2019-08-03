import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

import history from '../history';
import { getRandomColor } from '../Functions/Generics';
import WallPost from '../Components/Post';
import SkipToAnswers from '../Components/SkipToAnswers';

import NoData from '../Images/no-data.png';

const ProfileContainer = styled.div`
    padding: 20px;
`

const ProfileWrapper = styled.div`
    margin-top: 40px;
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
const ProfileName = styled.div`
    font-weight: bold;
    font-size: 22px;
    text-align: center;
    padding-top: 2px;
    margin: 20px auto 10px auto;
`

const Email = styled.div`
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: gray;
    margin-bottom: 30px;
`

const HR = styled.div`
    margin: 10px auto 30px auto;
    border-bottom: 1px solid #eee;
`

const Info = styled.div`
    color: gray;
    font-size: 14px;
    text-align: center;
    line-height: 18px;
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

const Logout = styled.div`
    margin: 40px auto 20px auto;
    border: 1px solid #09198A;
    border-radius: 5px;
    color: #09198A;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    width: 300px;
    cursor: pointer;

    @media(max-width: 700px){
        width: 100%;
        cursor: default;
    }
`

export default function Profile() {
    // Api call for my answers

    var answers = []
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('__u_info__')))) {
            history.push('/login');
        } else {
            setUserInfo(JSON.parse(localStorage.getItem('__u_info__')));
        }
    }, []);

    if (userInfo !== undefined && userInfo !== null) {
        const userName = userInfo.userName;
        const userEmail = userInfo.userId;
        return (
            <Fragment>
                <ProfileContainer>
                    <ProfileWrapper>
                        <ImageWrapper>
                            <ProfileImage bg={getRandomColor(userName.substring(0, 1).toLowerCase())}>{userName.substring(0, 1)}</ProfileImage>
                        </ImageWrapper>
                        <ProfileName>{userName || 'User'}</ProfileName>
                        <Email>{userEmail || ''}</Email>
                        <Info>{answers && answers.length ? `Your answers` : `Looks like you have not answered any questions. To answer, click on "Answer" button in top right corner.`}</Info>
                        <SkipWrapper>
                            <OR>or</OR>
                            <SkipToAnswers />
                        </SkipWrapper>
                        <HR />
                        {
                            answers && answers.length ?
                                <WallPost
                                    answer={'Ans'}
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
                        <Logout>Logout</Logout>
                    </ProfileWrapper>
                </ProfileContainer>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <p>Loading</p>
            </Fragment>
        )
    }
}