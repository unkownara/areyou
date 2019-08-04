import React, { useEffect, useState, lazy, Fragment, Suspense } from 'react';
import styled from 'styled-components';
import { getDate } from "../Functions/Generics";
import { user_post_url, user_question_url } from "../backend/Apis";
import { getApiRequestCall } from '../backend/ApiRequests';

import SnackBar from '../Components/SnackBar';
import Header from '../Components/Header';
import DotLoader from '../Components/DotLoader';

import More from '../Images/more.png';

const WallPost = lazy(() => import('../Components/Post'));


const WallContainer = styled.div`
    padding: 20px;
`

const WallWrapper = styled.div`
    margin-top: 30px;
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

function Wall() {

    const [open, setOpen] = useState(false);
    const [postApiDate, setPostApiDate] = useState(Date.now());
    const [posts, setPosts] = useState([]);
    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });
    const [endOfPosts, setEndOfPosts] = useState(false);
    const [postsLoading, setPostsLoading] = useState(false);

    function openSnackBar() {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

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

    function getDate1(date) {
        var dateString = new Date(parseInt(date));
        dateString = new Date(dateString).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;
    }

    return (
        <Fragment>
            <Header openSnackBar={openSnackBar} />
            {
                posts && posts.length && questionResponse.qId !== '' ?
                    <Suspense fallback={<DotLoader />}>
                        <Fragment>
                            <WallContainer>
                                <WallWrapper>
                                    {
                                        posts.map((data) =>
                                            <WallPost
                                                key={data.postId}
                                                path={data.path}
                                                liked={false}
                                                likesCount={data.likes}
                                                userName={data.userName}
                                                uploadDate={getDate1(data.createdOn)}
                                                postId={data.postId}
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
                    : <DotLoader />
            }
            <SnackBar open={open} handleClose={handleClose} />
        </Fragment>
    );
}
export default Wall;