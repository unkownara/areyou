import React, { Fragment } from 'react';
import styled from 'styled-components';
import WallPage from './Wall';
import Header from './Header';
import Login from './Login';
import Profile from './Profile';

const AppWrapper = styled.div`
  padding: 20px;
  height: 100%;
`

function App() {
  return (
    <Fragment>
      <Header />
      <AppWrapper>
        <Profile />
      </AppWrapper>
    </Fragment>
  );
}

export default App;
