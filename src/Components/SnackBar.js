import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import styled from 'styled-components';

import history from '../history';

const Button = styled.div`
    background: #09198A;
    height: ${props => props.login ? '60px' : '40px'};
    vertical-align: middle;
    line-height: 40px;
    width: 300px;
    text-align: center;
    padding: 0 10px;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin: 0px auto;
    cursor: pointer;
    pointer-events: ${props => props.disabled ? 'none' : 'auto'};

    @media(max-width: 700px){
        cursor: default;
    }
`


function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function DirectionSnackbar({ open, handleClose }) {

    const [transition, setTransition] = useState(undefined);

    useEffect(() => {
        setTransition(() => TransitionUp);
    }, [])
    
    return (
        <Snackbar
            id="snackbarLoginTiggerr"
            style={{ background: '#fff' }}
            open={open}
            onClose={handleClose}
            autoHideDuration={6000}
            TransitionComponent={transition}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<Button onClick={() => {history.push('/login')}}>Please Login!</Button>}
        />
    );
}