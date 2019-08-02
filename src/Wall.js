import React, { useEffect, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';

const WallPost = lazy(() => import('./Post'));

const WallWrapper = styled.div`
    margin-top: 30px;
`

const Ans = 'My parents did exactly that. They did not have any plan for me to come first in life. They just took things as  they came, eveling in the beautiful journey of teaching their child to talk and talk more. They did not compete with anyone nor did they push me to compete. I ambled along at my own pace, going from strength to strength as I moved up the classes. I was never a good student in school. In fact my class reports had begun to worry my teachers who were sensitive of their school’s reputation. So, when I got through my boards in the 1st Division, they were elated. I have never looked back since then! I completed my Masters in Social Work from the Tata Institute of Social Sciences, Mumbai and am currently pursuing a PhD in Social Work as a UGC JRF from Visva-Bharati University, the university set up by the poet Nobel Laureate Rabindranath Tagore in Santiniketan, West Bengal. I also teach BSW and MSW students at the university as part of my duties as a PhD Fellow. The beautiful irony is that I was not supposed to speak, but here I was, poised to make a living from speaking and teaching. Without the solid base in language that was prepared for me early in life, I am sure I would not have been able to make my own choices in life so naturally. So, though my parents didn’t plan for me to come first in life, things fell into place and worked out in the end.'

function Wall() {

    const [postApiDate, setPostApiDate] = useState(Date.now());
    const [loadMoreCount, setLoadMoreCount] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        import('./backend/ApiRequests').then(obj => {
            let params = {
                date: postApiDate
            };
            obj.getApiRequestCall('', params, function(response) {
                try {
                    if(response.data && response.data.Items) {
                        setPosts(posts => posts.concat(response.date.Items));
                    } else {
                        setPosts(posts => posts.concat([]));
                    }
                } catch (e) {
                    console.log('Something went wrong', e);
                }
            })
        });
    }, [loadMoreCount, postApiDate]);

    function loadMoreHandler() {
        setLoadMoreCount(loadMoreCount => loadMoreCount + 1);
    }

    return (
        <WallWrapper>
            <WallPost
                answer={Ans}
                liked={true}
                likesCount={`1.2 k`}
                userName={`Aravind Manoharan`}
                uploadDate={'May 23rd, 2019 at 3:57 PM'}
            />
            <button onClick={() => loadMoreHandler}>
                Load more
            </button>
        </WallWrapper>
    );
}

export default Wall;

