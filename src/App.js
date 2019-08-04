import React, { Fragment, lazy, Suspense } from 'react';
import styled from 'styled-components';
const WallPage = lazy(() => import('./Containers/Wall'));

const AppWrapper = styled.div`
  height: 100%;
`

function App() {

    return (
        <Suspense fallback={<></>}>
            <Fragment>
                <AppWrapper>
                    <WallPage />
                </AppWrapper>
            </Fragment>
        </Suspense>
    );
}

export default App;