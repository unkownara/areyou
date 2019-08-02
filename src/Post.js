import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Like from './like.png';
import UnLike from './unlike.png';
import User from './user.png';

const PostWrapper = styled.div`
    width: 600px;
    margin: 0 auto;

    @media(max-width: 700px){
        width: 100%;
    }
`

const Post = styled.div``

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.4fr 4.6fr;
    grid-gap: 10px;
    
    @media(max-width: 700px){
        grid-template-columns: 0.7fr 4.3fr;
    }
`

const ProfileImageWrapper = styled.div`
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
    font-size: 24px;
    height: 40px;
    width: 40px;
    background: ${props => props.bg || '#eee'};
    border-radius: 50%;
`

const ProfileDetailsWrapper = styled.div``

const Answer = styled.div`
    margin: 20px 0 0 0;
    letter-spacing: 0.8px;
    line-height: 22px;
    text-align: left;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

const ShowMore = styled.span`
    color: #329bff;
    font-size: 14px;
    font-weight: bold;
`

const ShowLess = styled.div`
    width: 100%;
    text-align: right;
    color: #329bff;
    font-size: 14px;
    font-weight: bold;
`

const ProfileName = styled.div`
    font-weight: bold;
    font-size: 16px;
    padding-top: 2px;
`

const UploadDate = styled.div`
    padding-top: 2px;
    color: gray;
    font-size: 12px;
`

const PostOptionsWrapper = styled.div`
    margin: 20px 0;
`

const LikeIconWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;`

const LikeIcon = styled.img`
    height: 25px;
    width: 25px;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

const LikesCount = styled.div`
    font-size: 14px;
    padding-top: 2px;
    padding-left: 10px;

    &>span{
        font-weight: bold;
    }
`

const HR = styled.div`
    margin: 10px 0 20px 0;
    border-bottom: 1px solid #eee;
`

export default function WallPost({ liked, answer, likesCount, userName, uploadDate }) {

    const [showMore, setShowMore] = useState(false);

    function showFullAnswer() {
        setShowMore(true)
    }

    function hideFullAnswer() {
        setShowMore(false)
    }

    function likeAnswer() {
        
    }

    function getRandomColor() {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    return (
        <PostWrapper>
            <Post>
                <ProfileWrapper>
                    <ProfileImageWrapper>
                        <ProfileImage bg={getRandomColor}>{userName.substring(0, 1)}</ProfileImage>
                    </ProfileImageWrapper>
                    <ProfileDetailsWrapper>
                        <ProfileName>{userName}</ProfileName>
                        <UploadDate>{uploadDate}</UploadDate>
                    </ProfileDetailsWrapper>
                </ProfileWrapper>
                <Answer onClick={showFullAnswer}>
                    {
                        answer && answer.length >= 200 && !showMore ?
                            <Fragment>
                                {answer.substring(1, 200)}
                                <ShowMore>... show more</ShowMore>
                            </Fragment> :
                            <Fragment>
                                {answer}
                            </Fragment>
                    }
                </Answer>
                {
                    showMore ?
                        <ShowLess style={{ zIndex: 2 }} onClick={hideFullAnswer}> Show less</ShowLess> : null
                }
                <PostOptionsWrapper>
                    <LikeIconWrapper>
                        <LikeIcon
                            onClick={likeAnswer}
                            src={liked ? Like : UnLike}
                            alt={'Like'}
                        />
                        <LikesCount><span>{likesCount}</span> people liked this answer.</LikesCount>
                    </LikeIconWrapper>
                </PostOptionsWrapper>
            </Post>
            <HR />
        </PostWrapper>
    );
}