import React from 'react';
import styled, { keyframes } from 'styled-components';

const PlaceHolderShimmer = keyframes`
    0% {
        background-position: -468px 0
    }

    100% {
        background-position: 468px 0
    }
`

const AnimatedBackground = styled.div`
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${PlaceHolderShimmer};
    animation-timing-function: linear;
    background: #f6f7f8;
    background: #eeeeee;
    background: -webkit-gradient(linear, left top, right top, color-stop(8%, #eeeeee), color-stop(18%, #dddddd), color-stop(33%, #eeeeee));
    background: -webkit-linear-gradient(left, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    height: 100%;
    position: relative;
`

const LoaderWrapper = styled.div`
    margin: ${props => props.margin || '30px auto'};
    width: 500px;

    @media(max-width: 700px){
        width: 300px;
    }
`

const PostLoader = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
`

const ProfileNameWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-gap: 10px;
`

const Avatar = styled.div`
    height: 45px;
    width: 45px;

    @media(max-width: 700px){}

`

const ProfileDetailsWrapper = styled.div`
`
const ProfileName = styled.div`
    height: 10px;
    width: 230px;
    margin: 7px 0;

    @media(max-width: 700px){
        width: 180px;
    }
`

const PostTime = styled.div`
    height: 10px;
    width: 230px;
    margin-top: 10px;

    @media(max-width: 700px){
        width: 180px;
    }
`

const Content = styled.div`
    height: 12px;
    margin:  ${props => props.margin || '10px 0'};
    width: ${props => props.width || '200px'};

    @media(max-width: 700px){       
        width: 300px !important;
    }
`

export default function ContentLoader({ count }) {

    function getLoader() {
        var loaderArr = [], loaderCount = 0;
        (count === 0 || count === undefined || count === null) ? loaderCount = 5 : loaderCount = 3

        for (var i = 0; i < loaderCount; i++) {
            loaderArr.push(<LoaderWrapper key={i}>
                <PostLoader>
                    <ProfileNameWrapper>
                        <Avatar>
                            <AnimatedBackground />
                        </Avatar>
                        <ProfileDetailsWrapper>
                            <ProfileName>
                                <AnimatedBackground />
                            </ProfileName>
                            <PostTime>
                                <AnimatedBackground />
                            </PostTime>
                        </ProfileDetailsWrapper>
                    </ProfileNameWrapper>
                </PostLoader>
                <Content margin={'20px 0 10px 0'} width={'490px'}>
                    <AnimatedBackground />
                </Content>
                <Content margin={'10px 0'} width={'530px'}>
                    <AnimatedBackground />
                </Content>
                <Content margin={'10px 0'} width={'470px'}>
                    <AnimatedBackground />
                </Content>
            </LoaderWrapper>)
        }
        return loaderArr;
    }

    return getLoader(count);
}