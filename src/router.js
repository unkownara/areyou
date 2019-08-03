import React from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import Login from './Containers/Login';
import App from "./App";
import SignUp from "./Containers/SignUp";
import QnAPage from "./Containers/QnAPage";
import Profile from "./Containers/Profile";

function Routers() {
    return (
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
    );
}

export default Routers;