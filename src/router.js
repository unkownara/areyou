import React from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import Login from './Login';
import App from "./App";

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
            </Switch>
        </Router>
    );
}

export default Routers;