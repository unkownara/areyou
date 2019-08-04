import React, { Fragment, lazy, Suspense, useEffect, useState } from 'react';
import styled from 'styled-components';
import cookie from 'react-cookies';

import history from "./history";
import WallPage from './Containers/Wall';
import WallPost from './Components/Post';
import Login from './Containers/Login';

const Profile = lazy(() => import('./Containers/Profile'));
const Header = lazy(() => import('./Components/Header'));
const QnAPage = lazy(() => import('./Containers/QnAPage'));
const SignUp = lazy(() => import('./Containers/SignUp'));

const AppWrapper = styled.div`
  height: 100%;
`

function App(props) {
    
    return (
        <Suspense fallback={<></>}>
            <Fragment>
                <AppWrapper>
                    <WallPage props={props} />
                </AppWrapper>
            </Fragment>
        </Suspense>
    );
}

export default App;