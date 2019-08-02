import React from 'react';
import styled from 'styled-components';

import Menu from './menu.png';

const HeaderStickyWrapper = styled.div`
    overflow: visible;
`

const HeaderWrapper = styled.div`
    height: 60px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    box-shadow: 0px 3px 25px -3px rgb(229, 229, 231);
    position: sticky;
    top: 0;

    @media(max-width: 700px){
        height: 50px;
    }
`

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
`

const AppName = styled.div`
    color: #000;
    font-size: 26px;
    font-weight: bold;
    vertical-align: middle;
    line-height: 60px;
    padding-left: 10px;

    @media(max-width: 700px){
        line-height: 50px;
        padding-left: 0px;
        font-size: 20px;
    }
`

const AnswerTrigger = styled.div`
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
    cursor: pointer;

    @media(max-width: 700px){
        line-height: 25px;
        height: 25px;
        cursor: default;        
        padding: 0 10px;
        font-weight: 500;
    }

`

const LogoWrapper = styled.div`
    display: flex;
    padding-left: 10px;

    @media(max-width: 700px){
        padding-left: 0px;
    }
`

const MenuIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;   
    margin: 0 10px;
`

const ProfileImage = styled.div`
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
        font-size: 15px;
        width: 25px;
    }
`


export default function Header({ userName }) {

    function getRandomColor() {
        var letters = 'BCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return color;
    }

    return (
        <HeaderStickyWrapper>
            <HeaderWrapper>
                <LogoWrapper>
                    <MenuIconWrapper>
                        <ProfileImage bg={getRandomColor}>{userName.substring(0, 1)}</ProfileImage>
                    </MenuIconWrapper>
                    <AppName>Are You</AppName>
                </LogoWrapper>
                <Wrapper>
                    <AnswerTrigger>Answer</AnswerTrigger>
                </Wrapper>
            </HeaderWrapper>
        </HeaderStickyWrapper>
    );
}