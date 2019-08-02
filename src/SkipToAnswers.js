import React from 'react';
import styled from 'styled-components';

import Left from './left-arrow.png';

const SkipWrapper = styled.div`
    display: grid;
    grid-template-columns: 4.6fr 0.4fr;
    margin-top: 10px;
    grid-gap: 8px;
`

const Skip = styled.div`
    font-weight: bold;
    color: #09198A;
    font-size: 13px;
    letter-spacing: 0.5px;
`

const LeftIconWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const LeftIcon = styled.img`
    height: 15px;
    width: 15px;
`

export default function SkipToAnswers() {
    return (
        <SkipWrapper>
            <Skip>Skip to see answers</Skip>
            <LeftIconWrapper>
                <LeftIcon src={Left} />
            </LeftIconWrapper>
        </SkipWrapper>
    );
}
