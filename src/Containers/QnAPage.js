import React, { useState, useEffect, Fragment } from 'react';
import AWS from 'aws-sdk';
import styled, { keyframes } from 'styled-components';
import cookie from 'react-cookies';
import ReactGA from 'react-ga';

import history from '../history';
import SnackBar from '../Components/SnackBar';
import Header from '../Components/Header';
import SkipToAnswers from '../Components/SkipToAnswers';
import { makeid, getDate } from '../Functions/Generics';
import { useInput } from "../Components/hooks";
import DotLoader from '../Components/DotLoader';

import Happy from '../Images/happy1.png';
import Sad from '../Images/sad1.png';
import { user_post_url, user_question_url } from '../backend/Apis';


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
const QnAContainer = styled.div`
    padding: 20px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

const QnAWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 600px;
    margin: 0 auto;

    @media(max-width: 700px){
        width: 100%;
    }
`

const Question = styled.p`
    text-align: left;
    font-size: 22px;
    font-weight: 500;
    width: 100%;
    letter-spacing: 0.22px;
    line-height: 29px;
`

const AnswerInput = styled.textarea`
    border: 1px solid #CACACA;
    border-radius: 5px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    padding: 5px;
`

const Button = styled.div`
    background: #09198A;
    height: ${props => props.submitting ? '60px' : '40px'};
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

    @media(max-width: 700px){
        cursor: default;
    }
`

const OR = styled.div`
    font-size: 12px;
    margin-top: 10px;
    color: gray;
`

const ToggleButtonWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    width: 220px;
    margin: 10px auto 20px auto;
`

const ToggleButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    padding: 6px;
    border: ${props => props.selected ? 'none' : '1px solid #eee'};
    background: ${props => props.selected ? '#BDF0FF' : '#fff'};
    cursor: pointer;

    &:hover {
        background: #BDF0FF;
    }

    @media(max-width: 700px){
        cursor: default;
    }
`

const ToggleIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const ToggleIcon = styled.img`
    height: 30px;
    width: 30px;
`

const ToggleText = styled.div`
    padding-left: 5px;
    font-weight: bold;
    color: ${props => props.selected ? '#000' : 'gray'};
`

const Info = styled.div`
    color: gray;
    font-size: 14px;
    width: 100%;
    text-align: left;
    margin: 8px 0 10px 0;
    letter-spacing: 0.5px;
`

const LoaderLine = keyframes`
    0% {
        margin-left: 0px;
        width: 10px;
    }

    25% {
        width: 30px;
    }

    50% {
        width: 50px;
    }

    75% {
        width: 30px;
    }

    100% {
        margin-left: 260px;
        width: 10px;
    }
`

const LineLoader = styled.div`
    width: 10px;
    height: 5px;
    border-radius: 30px;
    background: white;
    animation: ${LoaderLine} .7s alternate infinite ease-in-out;
`

const ErrMsg = styled.div`
    color: red;
    font-weight: 500;
    font-size: 14px;
    margin: 0 auto 15px auto;


`

function QnAPage() {

    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });
    const [userInfo, setUserInfo] = useState(null);
    const [postUploadStatus, setPostUploadStatus] = useState('not_yet');
    const [yesSelected, setYesSelected] = useState(false);
    const [noSelected, setNoSelected] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [open, setOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const answerInput = useInput('');

    useEffect(() => {
        ReactGA.initialize('UA-145111269-1');
        ReactGA.pageview('/qna');
    }, [])

    function openSnackBar() {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('__u_info__')))) {
            // history.push('/login');
        } else if (!(cookie.load('__q_id__'))) {
            setUserInfo(JSON.parse(localStorage.getItem('__u_info__')));
            import('../backend/ApiRequests').then(obj => {
                let params = {
                    date: getDate()
                };
                obj.getApiRequestCall(user_question_url, params, function (response) {
                    if (response.data && response.data.Items && response.data.Items.length > 0) {
                        setQuestionResponse(response.data.Items[0]);
                    } else {
                        console.log('Error ', response);
                    }
                })
            })
        }
    }, []);

    function toggleYesNo(type) {
        if (type === 'yes') {
            setYesSelected(true);
            setNoSelected(false);
        }
        else if (type === 'no') {
            setYesSelected(false);
            setNoSelected(true);
        }
        setErrorMsg('')
    }

    const SubmitAnswer = () => {
        if (yesSelected || noSelected) {
            setSubmitting(true);
            setErrorMsg('')
            AWS.config = new AWS.Config();
            AWS.config.accessKeyId = "AKIAJCVUQBOPFUF54MJQ";
            AWS.config.secretAccessKey = "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";
            AWS.config.region = "us-east-2";

            let postId = makeid(10);
            let key = `${userInfo.userId}/${questionResponse.qId}/${postId}.txt`;
            let s3Bucket = new AWS.S3();
            let s3Obj = {
                Bucket: 'areyou-posts',
                Key: key,
                Body: answerInput.value,
                ACL: 'public-read',
                ContentType: 'text/plain; charset=us-ascii'
            };
            s3Bucket.putObject(s3Obj, function (err, data) {
                if (err) {
                    console.log('Error message', err);
                    setSubmitting(false);
                } else {
                    import('../backend/ApiRequests').then(obj => {
                        let payload = {
                            postId: postId,
                            path: key,
                            userId: userInfo.userId,
                            userName: userInfo.userName,
                            questionId: questionResponse.qId
                        };
                        obj.postApiRequestCall(user_post_url, payload, function (response) {
                            if (response.data === true) {
                                setPostUploadStatus('success');
                                setSubmitting(false);
                                history.push({
                                    pathname: '/',
                                    state: { answerSubmitted: true }
                                })
                            } else {
                                setPostUploadStatus('failure');
                                setSubmitting(false);
                            }
                        });
                    });
                }
            });
        } else {
            setErrorMsg('Please select Yes or No.');
            setSubmitting(false);
        }
    };

    useEffect(() => {
        setErrorMsg('')
    }, [answerInput.value]);


    return (
        <Fragment>
            <Header openSnackBar={openSnackBar} />
            {
                userInfo !== undefined && userInfo !== null && questionResponse.qId !== '' && questionResponse.question !== '' ?
                    <QnAContainer>
                        <QnAWrapper>
                            <Question> {questionResponse.question} </Question>
                            <ToggleButtonWrapper>
                                <ToggleButton selected={yesSelected} onClick={() => toggleYesNo('yes')}>
                                    <ToggleIconWrapper>
                                        <ToggleIcon src={Happy} />
                                    </ToggleIconWrapper>
                                    <ToggleText selected={yesSelected}>Yes</ToggleText>
                                </ToggleButton>
                                <ToggleButton selected={noSelected} onClick={() => toggleYesNo('no')}>
                                    <ToggleIconWrapper>
                                        <ToggleIcon src={Sad} />
                                    </ToggleIconWrapper>
                                    <ToggleText selected={noSelected}>No</ToggleText>
                                </ToggleButton>
                            </ToggleButtonWrapper>
                            <Info>Express your answer in words.</Info>
                            <AnswerInput
                                rows={7}
                                {...answerInput}
                            />
                            <Button
                                onClick={SubmitAnswer}
                                submitting={submitting}
                            >
                                <span>{!submitting ? "Submit Answer" : 'Submitting ...'}</span>
                                {
                                    submitting ?
                                        <LineLoader /> : null
                                }
                            </Button>
                            <ErrMsg>{errorMsg}</ErrMsg>
                            <OR>or</OR>
                            <SkipToAnswers />
                        </QnAWrapper>
                    </QnAContainer>
                    :
                    <DotLoader />
            }
            <SnackBar open={open} handleClose={handleClose} />
        </Fragment>
    );
}

export default QnAPage;