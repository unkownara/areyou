import React, { Suspense, lazy } from 'react';
import history from './history';
import { Router, Switch, Route } from 'react-router';
import Header from './Components/Header';

const App = lazy(() => import('./App'));
const Login = lazy(() => import('./Containers/Login'));
const SignUp = lazy(() => import('./Containers/SignUp'));
const QnAPage = lazy(() => import('./Containers/QnAPage'));
const Profile = lazy(() => import('./Containers/Profile'));

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
                            path="/profile"
                            component={Profile}
                        />

                    </Switch>
                </Suspense>
            </Router>
        </Fragment>
    );
}

export default Routers;