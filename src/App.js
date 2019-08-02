import React, { Fragment } from 'react';
import styled from 'styled-components';
import WallPage from './Wall';
import Header from './Header';
import Login from './Login';
import SignUp from './SignUp';
import Profile from './Profile';
import QnAPage from './QnAPage';

const AppWrapper = styled.div`
  padding: 20px;
  height: 100%;
`

function App() {
  return (
    <Fragment>
      <Header userName={'Aravind'} />
      <AppWrapper>
        <QnAPage />
      </AppWrapper>
    </Fragment>
  );
}

export default App;