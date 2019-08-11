import React, { useState, useEffect, Fragment } from 'react';
import AWS from 'aws-sdk';
import styled, { keyframes } from 'styled-components';
import cookie from 'react-cookies';
import ReactGA from 'react-ga';
import { Helmet } from 'react-helmet';

import { editPost } from '../Functions/PostOptions';
import { getDate1 } from '../Functions/Generics';
import history from '../history';
import CustomSnackBar from '../Components/CustomSnackBar';
import Header from '../Components/Header';
import SkipToAnswers from '../Components/SkipToAnswers';
import { makeid, getDate } from '../Functions/Generics';
import { user_post_url, user_question_url } from '../backend/Apis';
import DotLoader from '../Components/DotLoader';

import EditSuccess from '../Images/success2.png';
import SubmitSuccess from '../Images/success4.png';
import Happy from '../Images/happy1.png';
import Sad from '../Images/sad1.png';


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
    padding-bottom: 30px;
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
    letter-spacing: 0.5px;
    line-height: 29px;
    word-break: break-word;
    font-family: 'Raleway', sans-serif;
`

const AnswerInput = styled.textarea`
    border: 1px solid #CACACA;
    border-radius: 5px;
    width: 100%;
    font-weight: 500;
    font-size: 18px;
    padding: 5px;
    height: max-content;
`

const SubmitButton = styled.div`
    background: #09198A;
    height: ${props => props.submitting ? '60px' : '40px'};
    vertical-align: middle;
    line-height: 40px;
    letter-spacing: 1px;
    width: 300px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin: 20px auto;
    cursor: pointer;
    pointer-events: ${props => props.submitting ? 'none' : 'default'};
    opacity: ${props => props.submitting ? '0.7' : '1'};

    @media(max-width: 700px){
        cursor: default;
    }
`

const CancelButton = styled(SubmitButton)`
    color: #09198A;
    letter-spacing: 1px;
    background: #fff;
    border: 1px solid #09198A;
    margin: 0px auto 20px auto;
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
    color: #fff;
    background: #F76969;
    width: 300px;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
    font-weight: 500;
    letter-spacing: 1px;    
    font-size: 14px;
    text-align: center;
    margin: 0 auto 15px auto;
`

const AskedOn = styled.div`
    font-size: 14px;
    color: gray;
    text-align: left;
    width: 100%;
    margin-bottom: 15px;
`

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
   
    @media(max-width: 700px){
        margin-top: 10%;
    }
`

const SuccessImage = styled.img`
    height: 400px;
    width: 500px;

    @media(max-width: 700px){
        height: 240px;
        width: 280px;
    }
`

const SuccessInfo = styled.div`
    font-size: 18px;
    letter-spacing: 0.5px;
    margin: 35px 0 40px 0;
    color: #09198A;

    @media(max-width: 700px){
        font-size: 14px;
    }
`

const OkButton = styled(CancelButton)`
    letter-spacing: 1px;
    animation: ${LiftUp} ease 0.7s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
`

function QnAPage(props) {

    const [questionResponse, setQuestionResponse] = useState({ qId: '', question: '' });
    const [userInfo, setUserInfo] = useState(null);
    const [postUploadStatus, setPostUploadStatus] = useState('not_yet');
    const [yesSelected, setYesSelected] = useState(null);
    const [noSelected, setNoSelected] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [open, setOpenSnackBar] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [postEdit, setPostEdit] = useState(false);
    const [answerEditFlag, setAnswerEditFlag] = useState(false);
    const [postData, setPostData] = useState({});
    const [answerInput, setAnswerInput] = useState('');
    const [pageStartTime, setPageStartTime] = useState(0);
    const [postSuccessType, setPostSuccessType] = useState('');

    useEffect(() => {
        ReactGA.pageview('/qna');
        setPageStartTime((new Date()).getTime());
    }, [])

    useEffect(() => {
        setErrorMsg('')
        setOpenSnackBar(false);
    }, [answerInput]);

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('__u_info__')))) {
            history.push('/login');
        } else if (!(cookie.load('__q_id__'))) {
            setUserInfo(JSON.parse(localStorage.getItem('__u_info__')));
            if (!checkPostOptions()) {
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
        }
    }, []);

    function checkPostOptions() {
        if (props.location.state && props.location.state.postOption === 'edit' && props.location.state && props.location.state.postData !== undefined && props.location.state.postData !== null) {
            setPostData(props.location.state.postData)
            setPostEdit(true)
            setAnswerInput(props.location.state.postData.answer)
            props.location.state.postData.yesNoAnswer === 'yes' ? setYesSelected(true) : setYesSelected(false);
            props.location.state.postData.yesNoAnswer === 'no' ? setNoSelected(true) : setNoSelected(false);
            return true
        } else {
            setPostEdit(false)
            return false
        }
    }

    function openSnackBar() {
        setOpenSnackBar(true)
    }

    const handleClose = () => {
        setOpenSnackBar(false);
    };

    function toggleYesNo(type) {
        if (type === 'yes') {
            setYesSelected(true);
            setNoSelected(false);
            ReactGA.event({
                category: 'New Answer',
                action: 'Yes/No Selected',
                label: `User selected YES after ${(Math.abs((new Date()).getTime() - pageStartTime)) / 1000} sec`
            });
            if (postEdit) {
                ReactGA.event({
                    category: 'Edit Answer',
                    action: 'Answer Edited',
                    label: `User changed answer to YES in edit`
                });
            }
        }
        else if (type === 'no') {
            setYesSelected(false);
            setNoSelected(true);
            ReactGA.event({
                category: 'New Answer',
                action: 'Yes/No Selected',
                label: `User selected NO after ${(Math.abs((new Date()).getTime() - pageStartTime)) / 1000} sec`
            });
            if (postEdit) {
                ReactGA.event({
                    category: 'Edit Answer',
                    action: 'Answer Edited',
                    label: `User changed answer to NO in edit`
                });
            }
        }
        setErrorMsg('')
        setOpenSnackBar(false);
    }

    function setAnswer(e) {
        setAnswerInput(e.target.value);
        if (answerInput <= 1) {
            ReactGA.event({
                category: 'New Answer',
                action: 'Answer Typing',
                label: `User started Typing Answer after ${(Math.abs((new Date()).getTime() - pageStartTime)) / 1000} sec`
            });
        }
        if (postEdit && !answerEditFlag) {
            ReactGA.event({
                category: 'Edit Answer',
                action: 'Answer Edited',
                label: `User changed answer in edit`
            });
            setAnswerEditFlag(true);
        }
    }

    const SubmitAnswer = () => {
        setPostSuccessType('');
        if (answerInput.length === 0 || answerInput === undefined || answerInput === null) {
            setErrorMsg('Please write an answer.');
            setOpenSnackBar(true);
            ReactGA.event({
                category: 'New Answer',
                action: 'Answer Filling',
                label: `User submitting an answer without content.`
            });
        } else {
            setOpenSnackBar(false);
            if (yesSelected || noSelected) {
                setSubmitting(true);
                setErrorMsg('');
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
                    Body: answerInput,
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
                                questionId: questionResponse.qId,
                                yesOrNo: yesSelected ? "yes" : "no",
                                question: questionResponse.question
                            };
                            obj.postApiRequestCall(user_post_url, payload, function (response) {
                                if (response.data === true) {
                                    setPostUploadStatus('success');
                                    setPostSuccessType('answer_submitted');
                                    setSubmitting(false);
                                    ReactGA.event({
                                        category: 'New Answer',
                                        action: 'Answer Submitted',
                                        label: `User Submitted Answer after ${(Math.abs((new Date()).getTime() - pageStartTime)) / 1000} sec`
                                    });
                                } else {
                                    setPostUploadStatus('failure');
                                    setPostSuccessType('');
                                    setSubmitting(false);
                                }
                            });
                        });
                    }
                });
            } else {
                setErrorMsg('Please select Yes or No.');
                setOpenSnackBar(true);
                setSubmitting(false);
                ReactGA.event({
                    category: 'New Answer',
                    action: 'Answer Filling',
                    label: `User submitting an answer without YES/NO.`
                });
            }
        }
    };

    function cancelEdit() {
        ReactGA.event({
            category: 'Edit Answer',
            action: 'Cancel Edit',
            label: `User cancelled edit`
        });
        postData.postOrigin === 'wall_page' ? history.push({ pathname: '/' }) : history.push({ pathname: `/profile/${userInfo.userId}`, state: { directProfileLanding: false } })
    }

    function updateNewAnswer() {
        setPostSuccessType('');
        if (answerInput.length === 0 || answerInput === undefined || answerInput === null) {
            setErrorMsg('Please write an answer.');
            setOpenSnackBar(true);
            setSubmitting(false);
        } else if (yesSelected || noSelected) {
            setOpenSnackBar(false);
            setSubmitting(true);
            editPost(postData.postId, postData.createdOn, postData.questionId, answerInput, yesSelected ? "yes" : "no", userInfo.userId, function (res) {
                if (res === true) {
                    setPostSuccessType('answer_edited');
                    ReactGA.event({
                        category: 'Edit Answer',
                        action: 'Answer Edited',
                        label: `User edited his answer`
                    });
                } else {
                    setErrorMsg('An unknown error occured.');
                    setOpenSnackBar(true);
                    ReactGA.event({
                        category: 'Edit Answer',
                        action: 'Answer Edit Error',
                        label: `Answer Edit Error`
                    });
                }
                setSubmitting(false);
            });
        } else {
            setErrorMsg('Please select Yes or No.');
            setOpenSnackBar(true);
            setSubmitting(false);
        }
    }

    function redirectToOrigin() {
        !postEdit ? history.push({ pathname: '/', state: { newAnswers: true } }) : history.push(`/profile/${userInfo.userId}`)
    }

    return (
        <Fragment>
            <Header openSnackBar={openSnackBar} />
            <Helmet>
                <meta charSet="utf-8" />
                <title>{`${questionResponse.question || ''}  | Are You?`}</title>
                <meta name="description" content={`${questionResponse.question} Are you interested to share yourself? Answer this question.`} />
            </Helmet>
            {
                (userInfo !== undefined && userInfo !== null && questionResponse.qId !== '' && questionResponse.question !== '') || (userInfo !== undefined && userInfo !== null && postEdit) ?
                    <QnAContainer>
                        {
                            postSuccessType.length ?
                                <QnAWrapper>
                                    <ImageWrapper>
                                        <SuccessImage src={postSuccessType === 'answer_submitted' ? SubmitSuccess : EditSuccess} />
                                    </ImageWrapper>
                                    <SuccessInfo>Answer {postSuccessType === 'answer_submitted' ? 'submitted' : 'edited'} successfully.</SuccessInfo>
                                    <OkButton onClick={redirectToOrigin}>Back To Answers</OkButton>
                                </QnAWrapper>
                                :
                                <QnAWrapper>
                                    <Question> {postEdit ? postData.question : questionResponse.question} </Question>
                                    {
                                        postEdit ?
                                            <AskedOn>Asked on {getDate1(postData.createdOn)}</AskedOn> : null
                                    }
                                    <ToggleButtonWrapper>
                                        <ToggleButton
                                            selected={props.yesNoAnswer === 'yes' || yesSelected} onClick={() => toggleYesNo('yes')}>
                                            <ToggleIconWrapper>
                                                <ToggleIcon src={Happy} />
                                            </ToggleIconWrapper>
                                            <ToggleText
                                                selected={props.yesNoAnswer === 'yes' || yesSelected}>Yes</ToggleText>
                                        </ToggleButton>
                                        <ToggleButton selected={props.yesNoAnswer === 'no' || noSelected} onClick={() => toggleYesNo('no')}>
                                            <ToggleIconWrapper>
                                                <ToggleIcon src={Sad} />
                                            </ToggleIconWrapper>
                                            <ToggleText selected={props.yesNoAnswer === 'no' || noSelected}>No</ToggleText>
                                        </ToggleButton>
                                    </ToggleButtonWrapper>
                                    <Info>Express your answer in words.</Info>
                                    <AnswerInput
                                        rows={10}
                                        name="answer"
                                        value={answerInput}
                                        onChange={setAnswer}
                                    />
                                    <SubmitButton
                                        onClick={postEdit ? updateNewAnswer : SubmitAnswer}
                                        submitting={submitting}
                                    >
                                        <span>{!submitting ? postEdit ? 'Update Answer' : 'Submit Answer' : postEdit ? 'Updating ...' : 'Submitting ...'}</span>
                                        {
                                            submitting ?
                                                <LineLoader /> : null
                                        }
                                    </SubmitButton>
                                    {
                                        postEdit ?
                                            <CancelButton onClick={cancelEdit}>Cancel</CancelButton>
                                            : null
                                    }
                                    <OR>or</OR>
                                    <SkipToAnswers origin={'QnA Page'} />
                                </QnAWrapper>
                        }
                    </QnAContainer>
                    :
                    <DotLoader />
            }
            <CustomSnackBar open={open} handleClose={handleClose}>
                <ErrMsg>{errorMsg}</ErrMsg>
            </CustomSnackBar>
        </Fragment>
    );
}

export default QnAPage;