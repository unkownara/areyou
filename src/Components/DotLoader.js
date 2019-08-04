import React from 'react';
import styled, { keyframes } from 'styled-components';

const DotLoaderContainer = styled.div`
    height: ${props => props.height || '80vh'};
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const BounceDelay = keyframes`
    0%,
    80%,
    100% {
        -webkit-transform: scale(0);
        transform: scale(0);
    }

    40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
    }
`

const Bounce1 = styled.div`
    margin: 0 2px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
`

const Bounce2 = styled.div`
    margin: 0 4px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
`

const Bounce3 = styled.div`
    margin: 0 4px;
    height: 15px;
    width: 15px;
    border-radius: 50%;
`

const Spinner = styled.div`
    margin: 0px auto;
    width: max-content;
    text-align: center;

    & > div {
        background-color: #09198A;
        border-radius: 100%;
        display: inline-block;
        -webkit-animation: ${BounceDelay} 1.4s infinite ease-in-out both;
        animation: ${BounceDelay} 1.4s infinite ease-in-out both;
    }

    ${Bounce1}{
        -webkit-animation-delay: -0.32s;
        animation-delay: -0.32s;
    }
    ${Bounce2}{
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
    ${Bounce3}{
        -webkit-animation-delay: -0.16s;
        animation-delay: -0.16s;
    }
`



const DotLoader = ({ height }) => {
    return (
        <DotLoaderContainer height={height}>
            <Spinner>
                <Bounce1 />
                <Bounce2 />
                <Bounce3 />
            </Spinner>
        </DotLoaderContainer>
    );
}


export default DotLoader;


