import React, {Fragment, useEffect, useState} from 'react';
import styled from 'styled-components';

import {getRandomColor, s3UrlToText} from '../Functions/Generics';
import { user_post_like_url } from '../backend/Apis';

import Like from '../Images/like.png';
import UnLike from '../Images/unlike.png';
import Happy from '../Images/happy1.png';
import Sad from '../Images/sad1.png';
import AWS from "aws-sdk";

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
    word-break: break-word;
    cursor: ${props => !props.pointer ? 'pointer' : 'default'};

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
    cursor: pointer;
    margin-top: 10px;

    @media(max-width: 700px){
        cursor: default;
    }
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
    margin: 10px 0 35px 0;
    border-bottom: 1px solid #eee;
`

const YesNoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-top: 20px;
    align-items: center;
`

const YesNoAnswer = styled.div`
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 6px 10px;
    border: ${props => props.selected ? 'none' : '1px solid #eee'};
    background: ${props => props.selected ? '#c7f9ff' : '#fff'};
`

const YesNoIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const YesNoIcon = styled.img`
    height: 22px;
    width: 22px;
`

const YesNoText = styled.div`
    padding-left: 5px;
    font-weight: bold;
    color: ${props => props.selected ? '#000' : 'gray'};

    @media(max-width: 700px){
        font-size: 14px;
    }
`


export default function WallPost({ liked, path, likesCount, userName, uploadDate, yesNoAnswer, postId }) {

    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(likesCount);
    const [answer, setAnswer] = useState('');

    function showFullAnswer() {
        setShowMore(true)
    }

    function hideFullAnswer() {
        setShowMore(false)
    }

    const likeAnswer = () => {
        setLike(like => like + 1);
        import('../backend/ApiRequests').then(obj => {
            let payload = {
                postId: postId,
                createdOn: uploadDate,
                likes: likesCount
            };
            obj.postApiRequestCall(user_post_like_url, payload, function (response) {
            });
        })
    };

    useEffect(() => {
        AWS.config = new AWS.Config();
        AWS.config.accessKeyId = "AKIAJCVUQBOPFUF54MJQ";
        AWS.config.secretAccessKey = "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";
        AWS.config.region = "us-east-2";
        const s3 = new AWS.S3();

        let getParams = {
            Bucket: 'areyou-posts',
            Key: path
        };

        s3.getObject(getParams, function (err, data) {
            if (err)
                return '';
            else {
                console.log('s3 content ', data.Body.toString('utf-8'));
                setAnswer(data.Body.toString('utf-8'));
            }
        });
    }, [path]);

    return (
        <PostWrapper>
            <Post>
                <ProfileWrapper>
                    <ProfileImageWrapper>
                        <ProfileImage bg={getRandomColor(userName.substring(0, 1).toLowerCase())}>{userName.substring(0, 1)}</ProfileImage>
                    </ProfileImageWrapper>
                    <ProfileDetailsWrapper>
                        <ProfileName>{userName}</ProfileName>
                        <UploadDate>{uploadDate}</UploadDate>
                    </ProfileDetailsWrapper>
                </ProfileWrapper>
                <YesNoWrapper>
                    <YesNoAnswer selected>
                        <YesNoIconWrapper>
                            <YesNoIcon src={yesNoAnswer === 'yes' ? Happy : Sad} />
                        </YesNoIconWrapper>
                        <YesNoText selected>{yesNoAnswer === 'yes' ? 'Yes' : 'No'}</YesNoText>
                    </YesNoAnswer>
                </YesNoWrapper>
                <Answer onClick={answer && answer.length >= 200 ? showFullAnswer : null} pointer={answer && answer.length <= 200}>
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
                        <ShowLess onClick={hideFullAnswer}> Show less</ShowLess> : null
                }
                <PostOptionsWrapper>
                    <LikeIconWrapper>
                        <LikeIcon
                            onClick={likeAnswer}
                            src={liked ? Like : UnLike}
                            alt={'Like'}
                        />
                        <LikesCount><span>{like}</span> people liked this answer.</LikesCount>
                    </LikeIconWrapper>
                </PostOptionsWrapper>
            </Post>
            <HR />
        </PostWrapper>
    );
}