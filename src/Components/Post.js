import React, { Fragment, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import AWS from "aws-sdk";
import cookie from 'react-cookies';

import ContentLoader from './ContentLoader';
import { getDate1, getRandomColor } from '../Functions/Generics';
import { user_post_like_url } from '../backend/Apis';

import Happy from '../Images/happy1.png';
import Sad from '../Images/sad1.png';
import Clap from '../Images/clap.png';
import UnClap from '../Images/unclap.png';
import Options from '../Images/options.png';

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

const PostWrapper = styled.div`
    width: 600px;
    margin: 0 auto;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;

    @media(max-width: 700px){
        width: 100%;
    }
`

const Post = styled.div``

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 4.5fr 0.5fr;
`

const ProfileContainer = styled.div`
    
    display: grid;
    grid-template-columns: 0.4fr 4.6fr;
    grid-gap: 10px;
    
    @media(max-width: 700px){
        grid-template-columns: 0.7fr 4.3fr;
    }
`

const ProfileDetailsWrapper = styled.div``

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

const OptionsIconWrapper = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
`

const OptionsIcon = styled.img`
    height: 20px;
    width: 20px;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

const Answer = styled.div`
    margin: 20px 0 0 0;
    letter-spacing: 0.5px;
    line-height: 22px;
    padding-left: 10px;
    text-align: left;
    word-break: break-word;
    font-family: 'Raleway', sans-serif;
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
    padding-top: 4px;
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
    align-items: center;
    
    &>div:nth-child(1){
        background: ${props => props.anim ? "#BBFFD9" : "FFF"};
        border-radius: 50%;
        height: 41px;
        width: 41px;
        display: flex;
        justify-content: center;
        align-items: center;    
        transition: all 0.15s ease-in-out;

        &:hover{
            background: #BBFFD9;
        }
    }

    @media(max-width: 700px){
        
    }

`

const LikeIcon = styled.img`
    height: 25px;
    width: 25px;
    cursor: pointer;
    transform: ${props => props.anim ? 'scale(1.3)' : 'scale(1)'};   
    transition: all 0.15s ease-in-out;
    
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
    padding-left: 10px;
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

const Question = styled.div`
    font-family: 'Roboto', sans-serif;
    font-weight: bold;
    margin: 20px 0;
    padding: 0 10px;
    letter-spacing: 1px;
    line-height: 20px;
    word-break: break-word;
`

export default function WallPost({ showQuestion, path, likesCount, userName, userId, uploadDate, yesNoAnswer, postId, question, questionId, getPostOptions }) {

    const [showMore, setShowMore] = useState(false);
    const [like, setLike] = useState(likesCount);
    const [likeErrMsg, setLikeErrMsg] = useState('');
    const [answer, setAnswer] = useState('');
    const [likedByUser, setLikedByUser] = useState(false);
    const [showAnim, setShowAnim] = useState(false);
    const [showPostOptions, setShowPostOptions] = useState(false);

    function showFullAnswer() {
        setShowMore(true)
    }

    function hideFullAnswer() {
        setShowMore(false)
    }

    const likeAnswer = () => {
        if (userId !== cookie.load('__u_id__')) {
            setLike(like => like + 1);
            setLikedByUser(true);
            setShowAnim(true);
            setTimeout(() => {
                setShowAnim(false);
                setLikedByUser(false);
            }, 200);

            import('../backend/ApiRequests').then(obj => {
                let payload = {
                    postId: postId,
                    createdOn: uploadDate,
                    likes: likesCount
                };
                obj.postApiRequestCall(user_post_like_url, payload, function (response) {
                });
            })
        } else {
            setLikeErrMsg("You can't like your own post");
        }
    };

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('__u_info__')))) {
            setShowPostOptions(false);
        } else {
            var userInfo = JSON.parse(localStorage.getItem('__u_info__'));
            (userInfo !== undefined && (userInfo.userId === userId)) ? setShowPostOptions(true) : setShowPostOptions(false);
        }
    }, [])

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
            if (err) {
                return '';
            }
            else {
                // console.log('data body ', data.Body.toString('utf-8'))
                setAnswer(data.Body.toString('utf-8'));
            }
        });
    }, [path]);

    return (
        <PostWrapper>
            {
                answer && answer.length > 0 ?
                    <Post>
                        <ProfileWrapper>
                            <ProfileContainer>
                                <ProfileImageWrapper>
                                    <ProfileImage
                                        bg={getRandomColor(userName.substring(0, 1).toLowerCase())}>{userName.substring(0, 1)}</ProfileImage>
                                </ProfileImageWrapper>
                                <ProfileDetailsWrapper>
                                    <ProfileName>{userName}</ProfileName>
                                    <UploadDate>{getDate1(uploadDate)}</UploadDate>
                                </ProfileDetailsWrapper>
                            </ProfileContainer>
                            <OptionsIconWrapper>
                                {
                                    showPostOptions ?
                                        <OptionsIcon onClick={() => getPostOptions(questionId, question, postId, answer, yesNoAnswer, uploadDate)} src={Options} /> : null
                                }
                            </OptionsIconWrapper>
                        </ProfileWrapper>
                        {
                            showQuestion ?
                                <Question>
                                    {question}
                                </Question> : null
                        }
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
                                        <ShowMore>... show full</ShowMore>
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
                            <LikeIconWrapper anim={showAnim}>
                                <div>
                                    <LikeIcon
                                        anim={showAnim}
                                        onClick={likeAnswer}
                                        src={likedByUser ? Clap : UnClap}
                                        alt={'Like'}
                                    />
                                </div>
                                <LikesCount><span>{like}</span> {like === 1 ? 'clap' : 'claps'} to this answer.</LikesCount>
                            </LikeIconWrapper>
                        </PostOptionsWrapper>
                    </Post>
                    :
                    <ContentLoader count={5} />
            }
            <HR />
        </PostWrapper>
    );
}
