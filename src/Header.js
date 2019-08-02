import React from 'react';
import styled from 'styled-components';

import Menu from './menu.png';

const HeaderStickyWrapper = styled.div`
    overflow: visible;
`

const HeaderWrapper = styled.div`
    height: 50px;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    box-shadow: 0px 3px 25px -3px rgb(229, 229, 231);
    position: sticky;
    top: 0;
`

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
`

const AppName = styled.div`
    color: #000;
    font-size: 20px;
    font-weight: bold;
    vertical-align: middle;
    line-height: 50px;
    /* padding-left: 15px; */
`

const AnswerTrigger = styled.div`
    background: #09198A;
    height: 25px;
    vertical-align: middle;
    line-height: 25px;
    width: max-content;
    text-align: center;
    padding: 0 10px;
    border-radius: 3px;
    color: #fff;
    font-weight: 500;
`

const LogoWrapper = styled.div`
    display: flex;
`

const MenuIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;   
    margin: 0 10px;
`

const MenuIcon = styled.img`
    height: 20px;
    width: 20px;
`

export default function Header() {
    return (
        <HeaderStickyWrapper>
            <HeaderWrapper>
                <LogoWrapper>
                    <MenuIconWrapper>
                        <MenuIcon src={Menu} />
                    </MenuIconWrapper>
                    <AppName>You Are</AppName>
                </LogoWrapper>
                <Wrapper>
                    <AnswerTrigger>Answer</AnswerTrigger>
                </Wrapper>
            </HeaderWrapper>
        </HeaderStickyWrapper>
    );
}
