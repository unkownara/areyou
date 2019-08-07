import styled from 'styled-components';

export const EditButton = styled.div`
    background: #FFF;
    border: 1px solid #FF4343;
    color: #FF4343;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
    width: 300px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    font-weight: bold;
    margin: 20px auto;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`

export const DeleteButton = styled.div`
    background: #FF4343;
    color: #fff;
    height: 40px;
    vertical-align: middle;
    line-height: 40px;
    width: 300px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    font-weight: bold;
    margin: 20px auto;
    cursor: pointer;

    @media(max-width: 700px){
        cursor: default;
    }
`
