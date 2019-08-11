import React, { useState, useEffect, Fragment } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';
import cookie from 'react-cookies';
import { Helmet } from 'react-helmet';

import { deletePost } from '../Functions/PostOptions';
import history from '../history';
import { DeleteButton, EditButton } from '../Components/Buttons';
import Header from '../Components/Header';
import { getRandomColor } from '../Functions/Generics';
import WallPost from '../Components/Post';
import { getApiRequestCall } from '../backend/ApiRequests';
import { user_guest_profile_info_url, user_profile_url } from "../backend/Apis";
import SkipToAnswers from '../Components/SkipToAnswers';
import CustomSnackBar from '../Components/CustomSnackBar';
import ContentLoader from '../Components/ContentLoader';
import DotLoader from '../Components/DotLoader';

import Login from '../Images/login.png';
import NoData from '../Images/no-data.png';

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
    padding-bottom: 40px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

const ProfileWrapper = styled.div`
    margin-top: 40px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
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
const ProfileName = styled.h1`
    font-weight: bold;
    font-size: 22px;
    letter-spacing: 1px;
    text-align: center;
    padding: 2px 0 0 0;
    margin: 20px auto 10px auto;
`

const Email = styled.h2`
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: gray;
    margin: 0 0 30px 0;
    font-weight: 500;
    padding: 0;
    letter-spacing: 1px;
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

    &>span{
        font-weight: bold;
    }

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
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    width: 300px;
    cursor: pointer;
    opacity: 0.7;

    @media(max-width: 700px){
        width: 100%;
        cursor: default;
    }
`

const UserNotFound = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

const DeletedMsg = styled.div`
    color: #fff;
    background: #F76969;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    font-weight: 500;
    letter-spacing: 1px;    
    font-size: 14px;
    text-align: center;
    margin: 15px auto 15px auto;
`

export default function Profile(props) {
    // Api call for my answers
    let url = window.location.href.split('/');

    const [userInfo, setUserInfo] = useState(null);
    const [uId, setUId] = useState(url[4]);
    const [urlPath, setUrlPath] = useState(url);
    const [userPosts, setUsersPost] = useState([]);
    const [postMsg, setPostMsg] = useState('');
    const [deletedMsg, setDeletedMsg] = useState('');
    const [loadingPosts, setLoadingPosts] = useState(false);
    const [checkingUser, setCheckingUser] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState({});
    const [openOwnPostLikeErrorSnackBar, setOpenOwnPostLikeErrorSnackBar] = useState(false);
    const [openPostOptionSnackBar, setOpenPostOptionSnackBar] = useState(false);
    const [openConfirmDeleteSnackBar, setOpenConfirmDeleteSnackBar] = useState(false);
    const [openDeletedMsgSnackBar, setOpenDeletedMsgSnackBar] = useState(false);

    function openSnackBar(type) {
        if (type === 'post_options') {
            setOpenPostOptionSnackBar(true)
        } else if (type === 'confirm_delete') {
            setOpenConfirmDeleteSnackBar(true)
            setOpenPostOptionSnackBar(false)
        } else if (type === 'answer_deleted') {
            setOpenDeletedMsgSnackBar(true);
        } else if (type === 'own_post_like') {
            setOpenOwnPostLikeErrorSnackBar(true);
        }
    }

    function closeSnackBar(type) {
        if (type === 'post_options') {
            setOpenPostOptionSnackBar(false)
        } else if (type === 'confirm_delete') {
            setOpenConfirmDeleteSnackBar(false)
            setOpenPostOptionSnackBar(true)
        } else if (type === 'answer_deleted') {
            setOpenDeletedMsgSnackBar(false);
        } else if (type === 'own_post_like') {
            setOpenOwnPostLikeErrorSnackBar(false);
        }
    }

    useEffect(() => {
        history.listen((location, action) => {
            let path = location.pathname.split('/');
            setUId(path[2]);
            setUsersPost([]);
        })
    }, []);

    useEffect(() => {
        ReactGA.pageview(`/profile/${uId}`);
        var userInfo = JSON.parse(localStorage.getItem('__u_info__'));
        if (props.location.state === undefined || props.location.state === null) {
            ReactGA.event({
                category: 'User Profile Visit',
                action: 'Profile Visit',
                label: (userInfo !== undefined && userInfo !== null ? `User ${userInfo.userId} visited ${userInfo.userId} from URL` : `Logged out user visited ${uId} from URL`)
            });
        }
    }, []);

    useEffect(() => {
        let params = {
            userId: uId
        };
        setCheckingUser(true);
        getApiRequestCall(user_guest_profile_info_url, params, function (response) {
            if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                setUserInfo(response.data.Items[0]);
                setCheckingUser(false);
            } else {
                setUserNotFound(true);
                setCheckingUser(false);
                ReactGA.event({
                    category: 'User Profile Visit',
                    action: 'Invalid Profile Visit',
                    label: `User not found`
                });
                console.log('User does not exit');
            }
        })
    }, [uId]);

    useEffect(() => {
        if (userInfo !== null) {
            let params = {
                userId: uId
            };
            setLoadingPosts(true);
            getApiRequestCall(user_profile_url, params, function (response) {
                if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                    response.data.Items.sort((a, b) => (a.createdOn > b.createdOn) ? -1 : ((b.createdOn > a.createdOn) ? 1 : 0));
                    let posts = userPosts.concat(response.data.Items);
                    setUsersPost(posts);
                    setLoadingPosts(false);
                } else {
                    setPostMsg('Not answered yet');
                }
            });
        }
    }, [uId, userInfo]);

    function logout() {
        ReactGA.event({
            category: 'Auth',
            action: 'Logout clicked',
            label: `User logged out`
        });
        localStorage.setItem('__u_info__', null);
        cookie.remove('__u_id__');
        window.location.href = '/';
    }

    function redirectToQnAPage() {
        history.push({
            pathname: '/qna',
            state: {
                postOption: 'edit',
                postData: selectedPostData
            }
        })
    }

    function getPostOptions(questionId, question, postId, answer, yesNoAnswer, createdOn, postIndex) {
        setSelectedPostData({
            questionId: questionId,
            question: question,
            postId: postId,
            answer: answer,
            yesNoAnswer: yesNoAnswer,
            createdOn: createdOn,
            postOrigin: 'profile_page',
            postIndex: postIndex
        })
        openSnackBar('post_options');
    }

    function deletePostConfirmation() {
        ReactGA.event({
            category: 'Delete Answer',
            action: 'Answer Delete Triggered',
            label: `User triggered to delete his answer`
        });
        openSnackBar('confirm_delete')
    }

    function deleteAnswer() {
        deletePost(selectedPostData.postId, selectedPostData.createdOn, function (res) {
            if (res === true) {
                setDeletedMsg('Answer deleted successfully');
                userPosts.splice(selectedPostData.postIndex, 1);
                setUsersPost(userPosts);
                localStorage.setItem('userAnswers', JSON.stringify(userPosts));
                ReactGA.event({
                    category: 'Delete Answer',
                    action: 'Answer Deleted',
                    label: `User deleted his answer`
                });
            } else {
                setDeletedMsg('An unknown error occured.');
                ReactGA.event({
                    category: 'Delete Answer',
                    action: 'Answer Delete Error',
                    label: `Answer Delete Error`
                });
            }
            openSnackBar('answer_deleted');
        });
        closeSnackBar('confirm_delete');
        closeSnackBar('post_options');
    }

    function cancelDelete() {
        ReactGA.event({
            category: 'Delete Answer',
            action: 'Cancel Delete',
            label: `User cancelled delete`
        });
        closeSnackBar('confirm_delete')
    }

    function ownPostLikeError() {
        openSnackBar('own_post_like');
    }

    function shareProfile() {
        console.log('a')
        if (navigator.share) {
            navigator.share({
                title: 'Web Fundamentals',
                text: 'Check out Web Fundamentals — it rocks!',
                url: 'https://developers.google.com/web',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    }

    return (
        <Fragment>
            <Header openSnackBar={openSnackBar} origin={'Profile Page'} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${(userInfo && userInfo.userName) || ''} | Are You?`}</title>
                <meta name="description" content={window.location.href.split('/')[4] || ''} />
            </Helmet>
            <ProfileContainer>
                {
                    !checkingUser ?
                        !userNotFound ?
                            <ProfileWrapper>
                                <ImageWrapper>
                                    <ProfileImage
                                        bg={getRandomColor(userInfo && userInfo.userName.substring(0, 1).toLowerCase())}>{userInfo && userInfo.userName.substring(0, 1)}</ProfileImage>
                                </ImageWrapper>
                                <ProfileName onClick={shareProfile}>{(userInfo && userInfo.userName) || 'User'}</ProfileName>
                                <Email>{(userInfo && userInfo.userId) || ''}</Email>
                                <Info style={{ margin: 0 }}>You can enter the email id of your friend directly in the URL to visit their profie.</Info>
                                <HR />
                                {
                                    !loadingPosts ?
                                        <Fragment>
                                            {
                                                !loadingPosts && userPosts && userPosts.length > 0 ?
                                                    userPosts.map((data, data_index) =>
                                                        <WallPost
                                                            getPostOptions={getPostOptions}
                                                            key={data.postId}
                                                            postIndex={data_index}
                                                            path={data.path}
                                                            liked={false}
                                                            likesCount={data.likes}
                                                            userName={data.userName}
                                                            userId={data.userId}
                                                            showQuestion
                                                            uploadDate={data.createdOn}
                                                            postId={data.postId}
                                                            question={data.question}
                                                            questionId={data.questionId}
                                                            yesNoAnswer={data.yesOrNo}
                                                            ownPostLikeError={ownPostLikeError}
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
                                        userPosts && userPosts.length === 0 && loadingPosts === false ?
                                            <ContentLoader /> :
                                            <Info>
                                                {
                                                    (localStorage.getItem('__u_info__') !== undefined && localStorage.getItem('__u_info__') !== null && (localStorage.getItem('__u_info__').userId !== uId)) ?
                                                        (userPosts && userPosts.length ? `Your answers` : `Looks like you have not answered any 
                                                        questions. To answer, click on "Answer" button in the top right corner.`)
                                                        :
                                                        (userPosts && userPosts.length ? `${uId} answers` : `Looks like ${uId} has not answered any questions.`)
                                                }
                                            </Info>
                                }
                                <SkipWrapper>
                                    <OR>or</OR>
                                    <SkipToAnswers origin={'Profile Page'} />
                                </SkipWrapper>
                                {
                                    localStorage.getItem('__u_info__') !== undefined && localStorage.getItem('__u_info__') !== null ?
                                        <Button onClick={logout}>Logout</Button> : null
                                }
                            </ProfileWrapper>
                            :
                            <UserNotFound>
                                <ImageWrapper>
                                    <NoDataIcon src={NoData} />
                                </ImageWrapper>
                                <Info width={'600px'}><span>User Not Found!</span> Looks like you have hit a wrong profile name.</Info>
                                <SkipToAnswers origin={'Profile Page'} />
                            </UserNotFound>
                        :
                        <DotLoader />
                }
            </ProfileContainer>
            <CustomSnackBar open={openPostOptionSnackBar} handleClose={() => closeSnackBar('post_options')}>
                <DeleteButton onClick={deletePostConfirmation}>Delete</DeleteButton>
                <EditButton onClick={redirectToQnAPage}>Edit</EditButton>
            </CustomSnackBar>
            <CustomSnackBar open={openConfirmDeleteSnackBar} handleClose={() => closeSnackBar('confirm_delete')}>
                <DeleteButton onClick={deleteAnswer}>Yes</DeleteButton>
                <EditButton onClick={cancelDelete}>No</EditButton>
            </CustomSnackBar>
            <CustomSnackBar open={openDeletedMsgSnackBar} handleClose={() => closeSnackBar('answer_deleted')}>
                <DeletedMsg>{deletedMsg}</DeletedMsg>
            </CustomSnackBar>
            <CustomSnackBar open={openOwnPostLikeErrorSnackBar} handleClose={() => closeSnackBar('own_post_like')}>
                <DeletedMsg>You can't clap for your own answer.</DeletedMsg>
            </CustomSnackBar>
        </Fragment>
    );
}