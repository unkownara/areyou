import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function CustomSnackbar({ open, handleClose, origin, children }) {

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
            message={children}
        />
    );
}