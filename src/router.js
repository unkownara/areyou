import React from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import Login from './Login';
import App from "./App";
import SignUp from "./SignUp";
import QnAPage from "./QnAPage";

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
                    path="/qns"
                    component={QnAPage}
                />
            </Switch>
        </Router>
    );
}

export default Routers;