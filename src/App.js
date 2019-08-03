import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import history from "./history";
import WallPage from './Wall';
import WallPost from './Post';
import Login from './Login';
import cookie from 'react-cookies';
const Profile = lazy(() => import('./Profile'));
const Header = lazy(() => import('./Header'));
const QnAPage = lazy(() => import('./QnAPage'));
const SignUp = lazy(() => import('./SignUp'));

const AppWrapper = styled.div`
  padding: 20px;
  height: 100%;
`

function App(props) {

    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        if(cookie.load('__u_id__')) {
            setIsUserLogged(true);
        } else {
            setIsUserLogged(false);
            history.push('/login');
        }
    }, []);

    // useEffect(() => {
    //     console.log('data from signup ', props.location.state.detail);
    // });

    if(isUserLogged) {
        return (
            <Suspense fallback={<></>}>
                <Fragment>
                    <Header userName={'Aravind Manoharan'} />
                    <AppWrapper>
                        <WallPage userName={'Aravind'}/>
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