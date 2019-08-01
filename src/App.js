import React, { Fragment } from 'react';
import styled from 'styled-components';
import WallPage from './Wall';
import Header from './Header';

const AppWrapper = styled.div`
  padding: 20px;
`

function App() {
  return (
    <Fragment>
      <Header />
      <AppWrapper>
        <WallPage />
      </AppWrapper>
    </Fragment>
  );
}

export default App;
