import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';
import cookie from 'react-cookies';

import ContentLoader from '../Components/ContentLoader';
import history from '../history';
import Header from '../Components/Header';
import { getRandomColor, s3UrlToText } from '../Functions/Generics';
import WallPost from '../Components/Post';
import { getApiRequestCall } from '../backend/ApiRequests';
import {user_guest_profile_info_url, user_info_url, user_profile_url} from "../backend/Apis";
import SkipToAnswers from '../Components/SkipToAnswers';
import SnackBar from '../Components/SnackBar';

import Login from '../Images/login.png';
import NoData from '../Images/no-data.png';
import DotLoader from '../Components/DotLoader';


const LiftUp = keyframes`
    0% {
        opacity: 0;
        transform: translate(0%, 20px);
    }

    100% {
        opacity: 1;
        transform: translate(0%, 0px);
    }
`

const ProfileContainer = styled.div`
    padding: 20px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
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
    margin: 10px auto 20px auto;
    border-bottom: 1px solid #D0D0D0;
`

const Info = styled.div`
    color: gray;
    width: ${props => props.width || '100%'};
    line-height: 24px;
    letter-spacing: 1px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 30px;

    @media(max-width: 700px){
        width: 100%;
    }
`

const NoDataIcon = styled.img`
    height: 300px;
    width: 370px;

    @media(max-width: 700px){
        height: 200px;
        width: 250px;
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

const Button = styled.div`
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

const LoginWrapper = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

export default function Profile(props) {
    // Api call for my answers
    let url = window.location.href.split('/');

    const [userInfo, setUserInfo] = useState(null);
    const [uId, setUId] = useState(url[4]);
    const [userPosts, setUsersPost] = useState([]);
    const [postMsg, setPostMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false)

    useEffect(() => {
        ReactGA.initialize('UA-145111269-1');
        ReactGA.pageview('/profile');
    }, []);

    useEffect(() => {
        let params = {
            userId: uId
        };
        getApiRequestCall(user_guest_profile_info_url, params, function(response) {
            if(response && response.data && response.data.Items && response.data.Items.length > 0) {
                setUserInfo(response.data.Items[0]);
            } else {
                console.log('User does not exit');
            }
        })
    }, [uId]);

    useEffect(() => {
        if(userInfo !== null) {
            let params = {
                userId: uId
            };
            setLoadingPosts(true);
            getApiRequestCall(user_profile_url, params, function (response) {
                if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                    response.data.Items.sort((a, b) => (a.createdOn > b.createdOn) ? 1 : ((b.createdOn > a.createdOn) ? -1 : 0));
                    let posts = userPosts.concat(response.data.Items);
                    setUsersPost(posts);
                    setLoadingPosts(false);
                } else {
                    setPostMsg('Not answered yet');
                }
            });
        }
    }, [uId, userInfo]);

    function openSnackBar() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false);
    }

    function logout() {
        ReactGA.event({
            category: 'Authentication',
            action: 'Logout clicked'
        });
        localStorage.setItem('__u_info__', null);
        cookie.remove('__u_id__');
        window.location.href = '/';
    }

    function redirectToLoginPage() {
        history.push('/login');
    }


    return (
        <Fragment>
            <Header openSnackBar={openSnackBar} />
            <ProfileContainer>
                {
                    userInfo !== undefined && userInfo !== null ?
                        <ProfileWrapper>
                            <ImageWrapper>
                                <ProfileImage
                                    bg={getRandomColor(userInfo.userName.substring(0, 1).toLowerCase())}>{userInfo.userName.substring(0, 1)}</ProfileImage>
                            </ImageWrapper>
                            <ProfileName>{userInfo.userName || 'User'}</ProfileName>
                            <Email>{userInfo.userId || ''}</Email>
                            <HR />
                            {
                                !loadingPosts ?
                                    <Fragment>
                                        <Info>
                                            {
                                                userInfo && uId === userInfo.userId ?
                                                    userPosts && userPosts.length ? `Your answers` : `Looks like you have not answered any questions. To answer, click on "Answer" button in the top right corner.`
                                                    :
                                                    userPosts && userPosts.length ? `${uId} answers` : `Looks like ${uId} has not answered any questions.`
                                            }
                                        </Info>
                                        {
                                            !loadingPosts && userPosts && userPosts.length > 0 ?
                                                userPosts.map((data, index) =>
                                                    <WallPost
                                                        path={data.path}
                                                        likesCount={data.likes}
                                                        userName={data.userName}
                                                        uploadDate={data.createdOn}
                                                        postId={data.postId}
                                                        showQuestion
                                                    />
                                                )
                                                :
                                                <Fragment>
                                                    <ImageWrapper>
                                                        <NoDataIcon src={Login} />
                                                    </ImageWrapper>
                                                </Fragment>
                                        }
                                    </Fragment>
                                    :
                                    <DotLoader />
                            }
                            <SkipWrapper>
                                <OR>or</OR>
                                <SkipToAnswers origin={'Profile Page'} />
                            </SkipWrapper>
                            <Button onClick={logout}>Logout</Button>
                        </ProfileWrapper>
                        :
                        <LoginWrapper>
                            <ImageWrapper>
                                <NoDataIcon src={NoData} />
                            </ImageWrapper>
                            <Info width={'600px'}>Hey there! Looks like you have not logged in. To answer the question
                                or to like/unlike other answers, you have to login.</Info>
                            <Button onClick={redirectToLoginPage}>Login</Button>
                        </LoginWrapper>
                }
            </ProfileContainer>
            <SnackBar open={open} handleClose={handleClose} origin={'Profile Page'} />
        </Fragment>
    );
}