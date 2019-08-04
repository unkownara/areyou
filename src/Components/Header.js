import React, { useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import Headroom from 'react-headroom';

import history from '../history';
import { getRandomColor } from '../Functions/Generics';

import User from '../Images/user.png';

const HeaderWrapper = styled.div`
    height: 60px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    box-shadow: 0px 3px 25px -3px rgb(229, 229, 231);
    background: #fff;

    @media(max-width: 700px){
        height: 50px;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;

    @media(max-width: 700px){
        padding-right: 0;
    }
`

const AppName = styled.div`
    color: #000;
    text-decoration: none;
    font-size: 26px;
    font-weight: bold;
    vertical-align: middle;
    line-height: 60px;
    margin-left: 10px;
    cursor: pointer;
    width: max-content;

    @media(max-width: 700px){
        cursor: default;
        line-height: 50px;
        padding-left: 0px;
        font-size: 20px;
    }
`

const AnswerTrigger = styled.div`
    text-decoration: none;
    background: #09198A;
    height: 35px;   
    vertical-align: middle;
    line-height: 35px;
    width: max-content;
    text-align: center;
    padding: 0 20px;
    border-radius: 3px;
    color: #fff;
    font-weight: bold;
    margin: 0 30px 0 20px;
    cursor: pointer;

    @media(max-width: 700px){
        line-height: 25px;
        height: 25px;
        cursor: default;        
        padding: 0 10px;
        font-weight: 500;
        margin: 0;
    }

`

const LogoWrapper = styled.div`
    display: flex;
    padding-left: 10px;
    padding-right: 20px;

    @media(max-width: 700px){
        padding: 0px;
    }
`

const ProfileName = styled.div`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;   
    margin: 0 10px;
    cursor: pointer;        

    &>span {
        font-weight: 500;
        padding-left: 8px;
    }

    @media(max-width: 700px){
        cursor: default;  
       
        &>span{
            display: none;
        }
    }

`

const ProfileImage = styled.div`
    text-decoration: none;
    display: flex;
    border: 0.1px solid gray;
    justify-content: center;
    align-items: center;
    color: #000;
    font-weight: bold;
    font-size: 20px;
    height: 35px;
    width: 35px;
    background: ${props => props.bg || '#eee'};
    border-radius: 50%;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
        height: 25px;
        width: 25px;
        font-size: 15px;
        margin: 0 10px;
    }
`

const UserImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const UserIcon = styled.img`
    height: 35px;
    width: 35px;

    @media(max-width: 700px){
        height: 25px;
        width: 25px;
    }
`

export default function Header({ openSnackBar }) {

    const [userInfo, setUserInfo] = useState(null);

    function redirectToQnAPage() {
        history.push({
            pathname: '/qna'
        });
    }

    function redirectToProfilePage() {
        history.push({
            pathname: '/profile'
        });
    }

    function redirectToWallPage() {
        history.push('/');
    }

    useEffect(() => {
        if (!(JSON.parse(localStorage.getItem('__u_info__')))) {
        } else {
            setUserInfo(JSON.parse(localStorage.getItem('__u_info__')));
        }
    }, []);


    return (
        <Headroom>
            <HeaderWrapper>
                <AppName onClick={redirectToWallPage}>Are You</AppName>
                <Wrapper>
                    <LogoWrapper>
                        <AnswerTrigger
                            onClick={(userInfo !== undefined && userInfo !== null) ? redirectToQnAPage : openSnackBar}>Answer</AnswerTrigger>
                        <ProfileName onClick={redirectToProfilePage}>
                            {
                                userInfo !== undefined && userInfo !== null ?
                                    <Fragment>
                                        <ProfileImage
                                            bg={getRandomColor(userInfo && userInfo.userName.substring(0, 1).toLowerCase())}>
                                            {(userInfo && userInfo.userName.substring(0, 1)) || '-'}
                                        </ProfileImage>
                                        <span>{userInfo ? 'You' : ''}</span>
                                    </Fragment> :
                                    <UserImageWrapper>
                                        <UserIcon src={User} />
                                    </UserImageWrapper>
                            }
                        </ProfileName>
                    </LogoWrapper>
                </Wrapper>
            </HeaderWrapper>
        </Headroom>
    );
}