import React, { useEffect, useState, lazy, Fragment, Suspense } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactGA from 'react-ga';

import history from '../history';
import { getDate } from "../Functions/Generics";
import { user_post_url, user_question_url } from "../backend/Apis";
import { getApiRequestCall } from '../backend/ApiRequests';
import { DeleteButton, EditButton } from '../Components/Buttons';
import CustomSnackBar from '../Components/CustomSnackBar';
import Header from '../Components/Header';
import DotLoader from '../Components/DotLoader';

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

const Question = styled.div`
    font-family: 'Raleway', sans-serif;
    font-weight: bold;
    margin: 20px auto;
    letter-spacing: 1px;
    line-height: 25px;
    word-break: break-word;
    width: 600px;

    @media(max-width: 700px){
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

function Wall({ props }) {

    const [postApiDate, setPostApiDate] = useState(Date.now());
    const [posts, setPosts] = useState([]);
    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });
    const [endOfPosts, setEndOfPosts] = useState(false);
    const [postsLoading, setPostsLoading] = useState(true);
    const [openSnackBarOptions, setOpenSnackBar] = useState(false);
    const [selectedPostData, setSelectedPostData] = useState({});

    function openSnackBar() {
        setOpenSnackBar(true);
    }

    function closeSnackBar() {
        setOpenSnackBar(false);
    }

    useEffect(() => {
        ReactGA.initialize('UA-145111269-1');
        ReactGA.pageview('/');
    }, [])

    useEffect(() => {
        if (questionResponse.qId !== '') {
            setPostsLoading(true);
            let params = {
                date: postApiDate,
                questionId: questionResponse.qId
            };
            getApiRequestCall(user_post_url, params, function (response) {
                try {
                    if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                        let newPosts = posts.length === 0 ? response.data.Items : posts.concat(response.data.Items);
                        setPostsLoading(false);
                        setPosts(newPosts);
                    } else {
                        console.log('No posts are available');
                        setPostsLoading(false);
                        setEndOfPosts(true);
                    }
                } catch (e) {
                    setPostsLoading(false);
                    console.log('Something went wrong', e);
                }
            });
        }
    }, [questionResponse, postApiDate]);

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
        }
    };

    function getPostData(postData) {
        setSelectedPostData(postData)
        openSnackBar();
    }

    function editPost() {
        history.push({
            pathname: '/qna',
            state: { postOption: 'edit', postData: selectedPostData }
        })
    }

    function deletePost() {

    }

    // useEffect(() => {
    //     props.location.state && props.location.state.answerSubmitted ? setShowInfo(true) : setShowInfo(false);
    //     setTimeout(() => {
    //         setShowInfo(false)
    //     }, 3000);
    //     clearTimeout();
    // }, [props.location.state])

    // function hideInfo() {
    //     setShowInfo(false)
    // }

    return (
        <Fragment>
            <Header />
            {
                posts && posts.length && questionResponse.qId !== '' ?
                    <Suspense fallback={<DotLoader />}>
                        <Fragment>
                            <WallContainer>
                                <Question>
                                    {questionResponse.question}
                                </Question>
                                <WallWrapper>
                                    {
                                        posts.map((data) =>
                                            <WallPost
                                                openPostOptions={() => getPostData(data)}
                                                key={data.postId}
                                                path={data.path}
                                                liked={false}
                                                likesCount={data.likes}
                                                userName={data.userName}
                                                userId={data.userId}
                                                uploadDate={data.createdOn}
                                                postId={data.postId}
                                                question={data.question}
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
                            <Fragment>
                                <ImageWrapper>
                                    <FirstIcon src={First} />
                                </ImageWrapper>
                                <NoPosts>No answers found.</NoPosts>
                                <Info onClick={() => history.push("/qna")}>Be the first to answer</Info>
                            </Fragment> :
                            <DotLoader />
            }
            <CustomSnackBar open={openSnackBarOptions} handleClose={closeSnackBar}>
                <DeleteButton onClick={deletePost}>Delete</DeleteButton>
                <EditButton onClick={editPost}>Edit</EditButton>
            </CustomSnackBar>
        </Fragment>
    );
}
export default Wall;