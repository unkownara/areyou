import React, { useEffect, useState, lazy, Fragment, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

import history from '../history';
import { deletePost } from '../Functions/PostOptions';
import { getDate } from "../Functions/Generics";
import { user_post_url, user_question_url } from "../backend/Apis";
import { getApiRequestCall } from '../backend/ApiRequests';
import { DeleteButton, EditButton } from '../Components/Buttons';
import CustomSnackBar from '../Components/CustomSnackBar';
import Header from '../Components/Header';
import DotLoader from '../Components/DotLoader';
import ContentLoader from '../Components/ContentLoader';

import First from '../Images/first.png';
import More from '../Images/more.png';

const WallPost = lazy(() => import('../Components/Post'));

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

const WallContainer = styled.div`
    padding: 20px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

const WallWrapper = styled.div`
    margin-top: 50px;
`

const LoadMore = styled.div`
    width: 200px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    color: #09198A;
    font-weight: bold;
    margin: 20px auto;
    cursor: pointer;
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    &>p{
        margin: 5px;
        letter-spacing: 1px;
    }

    @media(max-width: 700px){
        cursor: default;
    }
`

const End = styled.div`
    margin: 20px auto;
    color: gray;
    font-weight: bold;
    text-align: center;
`

const LoadMoreIcon = styled.img`
    height: 30px;
    width: 30px;
`

const LoaderWrapper = styled.div`
    margin-bottom: 30px;
`

const Info = styled.div`
    border: 1px solid #09198A;
    border-radius: 5px;
    width: max-content;
    word-break: break-word;
    padding: 15px;
    color: #09198A;
    font-weight: 16px;
    margin: 40px auto 20px auto;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

const Question = styled.h1`
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    margin: 20px auto;
    padding: 0px;
    font-size: 30px;
    letter-spacing: 1px;
    line-height: 25px;
    word-break: break-word;
    width: 600px;

    &>span{
        background: #8BBAFA;
        display: block;
        width: max-content;
        padding: 0px 10px;
        border-radius: 4px;
        font-size: 11px;
        margin: 10px 0 15px 0;
    }

    @media(max-width: 700px){
        font-size: 22px;
        width: 100%;
    }
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

const FirstIcon = styled.img`
    height: 250px;
    width: 300px;
`

const NoPosts = styled.div`
    color: gray;
    width: ${props => props.width || '100%'};
    line-height: 24px;
    letter-spacing: 1px;
    font-size: 14px;
    text-align: center;

    @media(max-width: 700px){
        width: 100%;
    }
`

const DeletedMsg = styled.div`
    color: #fff;
    background: #F76969;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    font-weight: bold;
    letter-spacing: 1px;    
    font-size: 14px;
    text-align: center;
    margin: 15px auto 15px auto;
`

const RefreshButton = styled(DeletedMsg)`
    background: #58D68D;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

function Wall({ props }) {

    const [postApiDate, setPostApiDate] = useState(Date.now());
    const [posts, setPosts] = useState([]);
    const [deletedMsg, setDeletedMsg] = useState('');
    const [endOfPosts, setEndOfPosts] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [selectedPostData, setSelectedPostData] = useState({});
    const [updatedPosts, setUpdatedPosts] = useState([]);
    const [showRefreshPost, setShowRefreshPost] = useState(false);
    const [openOwnPostLikeErrorSnackBar, setOpenOwnPostLikeErrorSnackBar] = useState(false);
    const [openPostOptionSnackBar, setOpenPostOptionSnackBar] = useState(false);
    const [openConfirmDeleteSnackBar, setOpenConfirmDeleteSnackBar] = useState(false)
    const [openDeletedMsgSnackBar, setOpenDeletedMsgSnackBar] = useState(false);
    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });

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
        ReactGA.pageview('/');
    }, [])

    useEffect(() => {
        if (questionResponse.qId !== '') {
            let params = {
                date: postApiDate,
                questionId: questionResponse.qId
            };
            setPostsLoading(true);

            // if (props.location.state === undefined) {
            //     if (localStorage.getItem('userAnswers') !== undefined && localStorage.getItem('userAnswers') !== null) {
            //         setPosts(JSON.parse(localStorage.getItem('userAnswers')));
            //     }
            // }

            getApiRequestCall(user_post_url, params, function (response) {
                try {
                    if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                        let newPosts = posts.length === 0 ? response.data.Items : posts.concat(response.data.Items);

                        // let oldPosts = JSON.parse(localStorage.getItem('userAnswers'));
                        // if (oldPosts !== undefined && oldPosts !== null) {
                        //     if (oldPosts.length !== newPosts.length || JSON.stringify(oldPosts) !== JSON.stringify(newPosts)) {
                        //         if ((props.location.state !== undefined && props.location.state !== null && props.location.state.newAnswers !== undefined && props.location.state.newAnswers) || (oldPosts.length === 0)) {
                        //             localStorage.setItem('userAnswers', JSON.stringify(newPosts));
                        //             setPosts(newPosts);
                        //         } else {
                        //             localStorage.setItem('userAnswers', JSON.stringify(newPosts));
                        //             setUpdatedPosts(newPosts);
                        //             setShowRefreshPost(true);
                        //         }
                        //     }
                        //     setPostsLoading(false);
                        // } else {
                        //     localStorage.setItem('userAnswers', JSON.stringify(newPosts));
                        //     setPosts(newPosts);
                        //     setPostsLoading(false);
                        // }
                        localStorage.setItem('userAnswers', JSON.stringify(newPosts));
                        setPosts(newPosts);
                        setPostsLoading(false);
                    } else {
                        // console.log('No posts are available');
                        setPostsLoading(false);
                        setEndOfPosts(true);
                    }
                } catch (e) {
                    setPostsLoading(false);
                    // console.log('Something went wrong', e);
                }
            });
        }
    }, [questionResponse, postApiDate]);

    function refreshPost() {
        setShowRefreshPost(false);
        setPosts(updatedPosts);
    }

    useEffect(() => {
        let params = {
            date: getDate()
        };
        getApiRequestCall(user_question_url, params, function (response) {
            if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                setQuestionResponse(response.data.Items[0]);
            }
        });
    }, []);

    const loadMoreHandler = () => {
        let lastEvaluatedKey = posts[posts.length - 1];
        if (lastEvaluatedKey !== undefined && lastEvaluatedKey !== null) {
            setPostApiDate(lastEvaluatedKey.createdOn);
            ReactGA.event({
                category: 'Answer View',
                action: 'Load More',
                label: `User clicked on load more answers`
            });
        }
    };

    function redirectToQnAPage() {
        ReactGA.event({
            category: 'Edit Answer',
            action: 'Answer Edit Triggered',
            label: `User triggered to edit his answer`
        });
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
            postOrigin: 'wall_page',
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
                posts.splice(selectedPostData.postIndex, 1);
                setPosts(posts);
                localStorage.setItem('userAnswers', JSON.stringify(posts));
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

    return (
        <Fragment>
            <Header origin={'Wall Page'} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${questionResponse.question || ''}  | Are You?`}</title>
                <meta name="description" content={`${questionResponse.question} Are you interested to share yourself? Answer this question.`} />
            </Helmet>
            {
                posts && posts.length && questionResponse.qId !== '' ?
                    <Suspense fallback={<DotLoader />}>
                        <Fragment>
                            <WallContainer>
                                <Question>
                                    <span>Question</span>
                                    {questionResponse.question}
                                </Question>
                                <WallWrapper>
                                    {
                                        posts.map((data, data_index) =>
                                            <WallPost
                                                getPostOptions={getPostOptions}
                                                key={data.postId}
                                                postIndex={data_index}
                                                path={data.path}
                                                likesCount={data.likes}
                                                userName={data.userName}
                                                userId={data.userId}
                                                uploadDate={data.createdOn}
                                                postId={data.postId}
                                                question={data.question}
                                                questionId={data.questionId}
                                                yesNoAnswer={data.yesOrNo}
                                                ownPostLikeError={ownPostLikeError}
                                            />
                                        )
                                    }
                                    {
                                        postsLoading ?
                                            <LoaderWrapper>
                                                <DotLoader height={'10px'} />
                                            </LoaderWrapper>
                                            :
                                            endOfPosts ?
                                                <End>End of posts.</End>
                                                :
                                                posts && posts.length ?
                                                    <LoadMore onClick={loadMoreHandler}>
                                                        <LoadMoreIcon src={More} />
                                                        <p>Load more</p>
                                                    </LoadMore> : null
                                    }
                                </WallWrapper>
                            </WallContainer>
                        </Fragment>
                    </Suspense>
                    :
                    postsLoading ? <DotLoader /> :
                        posts && posts.length === 0 ?
                            <WallContainer>
                                <Question>
                                    {questionResponse.question}
                                </Question>
                                <ImageWrapper>
                                    <FirstIcon src={First} />
                                </ImageWrapper>
                                <NoPosts>No answers found.</NoPosts>
                                <Info onClick={() => history.push("/qna")}>Be the first to answer</Info>
                            </WallContainer> :
                            <DotLoader />
            }
            <CustomSnackBar open={showRefreshPost}>
                <RefreshButton onClick={refreshPost}>Refresh Posts</RefreshButton>
            </CustomSnackBar>
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
export default Wall;
