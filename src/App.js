import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import history from "./history";
import WallPage from './Containers/Wall';
import WallPost from './Components/Post';
import Login from './Containers/Login';
import Headroom from 'react-headroom';
import cookie from 'react-cookies';
const Profile = lazy(() => import('./Containers/Profile'));
const Header = lazy(() => import('./Components/Header'));
const QnAPage = lazy(() => import('./Containers/QnAPage'));
const SignUp = lazy(() => import('./Containers/SignUp'));

const AppWrapper = styled.div`
  padding: 20px;
  height: 100%;
`

function App(props) {

    const [isUserLogged, setIsUserLogged] = useState(false);

    useEffect(() => {
        if (cookie.load('__u_id__')) {
            setIsUserLogged(true);
        } else {
            setIsUserLogged(false);
            history.push('/login');
        }
    }, []);

    // useEffect(() => {
    //     console.log('data from signup ', props.location.state.detail);
    // });

    if (isUserLogged) {
        return (
            <Suspense fallback={<></>}>
                <Fragment>
                    <Headroom>
                        <Header userName={'Aravind Manoharan'} />
                    </Headroom>
                    <AppWrapper>
                        <QnAPage userName={'Aravind'} />
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