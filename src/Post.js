import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Like from './like.png';
import UnLike from './unlike.png';
import User from './user.png';

const PostWrapper = styled.div``

const Post = styled.div``

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 0.7fr 4.3fr;
    grid-gap: 10px;
`

const ProfileImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProfileImage = styled.img`
    height: 40px;
    width: 40px;
`

const ProfileDetailsWrapper = styled.div``

const Answer = styled.div`
    margin: 20px 0;
    letter-spacing: 0.8px;
    line-height: 22px;
    text-align: left;
`

const ShowMore = styled.span`
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

const PostOptionsWrapper = styled.div``

const LikeIconWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;`

const LikeIcon = styled.img`
    height: 25px;
    width: 25px;
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
    margin-top: 10px;
    border-bottom: 1px solid #eee;
`

export default function WallPost({ liked, answer, likesCount, userName, uploadDate }) {

    const [showMore, setShowMore] = useState(false);

    function showFullAnswer() {
        setShowMore(true)
    }

    return (
        <PostWrapper>
            <Post>
                <ProfileWrapper>
                    <ProfileImageWrapper>
                        <ProfileImage
                            src={User}
                            alt={'User'}
                        />
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
                            answer
                    }
                </Answer>
                <PostOptionsWrapper>
                    <LikeIconWrapper>
                        <LikeIcon
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

