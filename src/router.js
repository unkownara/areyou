import React, { Suspense, lazy, Fragment } from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router';

const App = lazy(() => import('./App'));
const Login = lazy(() => import('./Containers/Login'));
const SignUp = lazy(() => import('./Containers/SignUp'));
const QnAPage = lazy(() => import('./Containers/QnAPage'));
const Profile = lazy(() => import('./Containers/Profile'));

function Routers() {
    return (
        <Fragment>
            <Router history={history}>
                <Suspense fallback={<></>}>
                    <Switch>
                        <Route
                            exact
                            path="/"
                            component={App}
                        />
                        <Route
                            exact
                            path="/login"
                            component={Login}
                        />
                        <Route
                            exact
                            path="/signup"
                            component={SignUp}
                        />
                        <Route
                            path="/qns"
                            component={QnAPage}
                        />
                        <Route
                            exact
                            path="/profile/:id"
                            component={Profile}
                        />

                    </Switch>
                </Suspense>
            </Router>
        </Fragment>
    );
}

export default Routers;