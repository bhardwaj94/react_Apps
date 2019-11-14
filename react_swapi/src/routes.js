import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Layout from './hoc/layout';
import PrivateRoute from './hoc/privateRoute';
const Routes = () => {
    return (
        <Layout>
            <div>
                <Switch>
                    <Route exact path="/" component={withRouter(Login)} />
                    <PrivateRoute path="/dashboard" component={withRouter(Dashboard)} />
                </Switch>
            </div>
        </Layout>

    );
};

export default Routes;