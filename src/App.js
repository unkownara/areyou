import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import history from "./history";
import WallPage from './Wall';
import Login from './Login';
import cookie from 'react-cookies';
const Profile = lazy(() => import('./Profile'));
const Header = lazy(() => import('./Header'));

const AppWrapper = styled.div`
  padding: 20px;
  height: 100%;
`

function App() {

    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        if(cookie.load('__u_id__')) {
            setIsUserLogged(true);
        } else {
            setIsUserLogged(false);
            history.push('/login');
        }
    }, []);

    if(isUserLogged) {
        return (
            <Suspense fallback={<></>}>
                <Fragment>
                    <Header/>
                    <AppWrapper>
                        <Profile/>
                    </AppWrapper>
                </Fragment>
            </Suspense>
        );
    } else {
        return (
            <>
            </>
        );
    }
}

export default App;
