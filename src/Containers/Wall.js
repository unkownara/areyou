import React, { useEffect, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import {getDate} from "../Functions/Generics";
import {user_post_url, user_question_url} from "../backend/Apis";
import {getApiRequestCall} from '../backend/ApiRequests';
const WallPost = lazy(() => import('../Components/Post'));

const WallWrapper = styled.div`
    margin-top: 30px;
`

const LoadMore = styled.div`
    background: #09198A;
    height: ${props => props.login ? '60px' : '40px'};
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
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    @media(max-width: 700px){
        cursor: default;
    }
`

const Ans = 'My parents did exactly that. They did not have any plan for me to come first in life. They just took things as  they came, eveling in the beautiful journey of teaching their child to talk and talk more. They did not compete with anyone nor did they push me to compete. I ambled along at my own pace, going from strength to strength as I moved up the classes. I was never a good student in school. In fact my class reports had begun to worry my teachers who were sensitive of their school’s reputation. So, when I got through my boards in the 1st Division, they were elated. I have never looked back since then! I completed my Masters in Social Work from the Tata Institute of Social Sciences, Mumbai and am currently pursuing a PhD in Social Work as a UGC JRF from Visva-Bharati University, the university set up by the poet Nobel Laureate Rabindranath Tagore in Santiniketan, West Bengal. I also teach BSW and MSW students at the university as part of my duties as a PhD Fellow. The beautiful irony is that I was not supposed to speak, but here I was, poised to make a living from speaking and teaching. Without the solid base in language that was prepared for me early in life, I am sure I would not have been able to make my own choices in life so naturally. So, though my parents didn’t plan for me to come first in life, things fell into place and worked out in the end.'

function Wall() {

    const [postApiDate, setPostApiDate] = useState(Date.now());
    const [posts, setPosts] = useState([]);
    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });

    useEffect(() => {
        if(questionResponse.qId !== '') {
            console.log('here i am');

            let params = {
                date: postApiDate,
                questionId: questionResponse.qId
            };
            getApiRequestCall(user_post_url, params, function (response) {
                try {
                    if (response && response.data && response.data.Items && response.data.Items.length > 0) {
                        console.log('response value ', response.data.Items);
                        let newPosts = posts.length === 0 ? response.data.Items : posts.concat(response.data.Items);
                        console.log('new posts ', newPosts);
                        setPosts(newPosts);
                    } else {
                        console.log('No posts are available');
                    }
                } catch (e) {
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
        console.log('load more here');
        let lastEvaluatedKey = posts[posts.length - 1];
        if(lastEvaluatedKey !== undefined && lastEvaluatedKey !== null) {
            setPostApiDate(lastEvaluatedKey.createdOn);
        }
    };

    if(questionResponse.qId !== '') {
        return (
            <Suspense fallback={<>Loading </>}>
                <WallWrapper>
                    <WallPost
                        answer={Ans}
                        liked={true}
                        likesCount={`1.2 k`}
                        userName={`Aravind Manoharan`}
                        uploadDate={'May 23rd, 2019 at 3:57 PM'}
                    />
                    <LoadMore onClick={loadMoreHandler}>
                        Load more
                    </LoadMore>
                </WallWrapper>
            </Suspense>
        );
    } else {
        return <> wait </>;
    }
}

export default Wall;

