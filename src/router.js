import React, { Fragment, useEffect, useState } from 'react';
import { Router, Switch, Route } from 'react-router';

import Header from './Components/Header';
import history from './history';
import Login from './Containers/Login';
import App from "./App";
import SignUp from "./Containers/SignUp";
import QnAPage from "./Containers/QnAPage";
import Profile from "./Containers/Profile";

function Routers() {

    const [showHeader, setShowHeader] = useState(true);
    const path = window.location.pathname;

    useEffect(() => {
        if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
            setShowHeader(false);
            console.log(window.location.pathname)
        } else {
            setShowHeader(true);
            console.log(window.location.pathname)
        }
    }, [])

    return (
        <Fragment>
            {
                showHeader ?
                    <Header /> : null
            }
            <Router history={history}>
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
                        exact
                        path="/qns"
                        component={QnAPage}
                    />
                    <Route
                        exact
                        path="/profile"
                        component={Profile}
                    />

                </Switch>
            </Router>
        </Fragment>
    );
}

export default Routers;