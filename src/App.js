import React from 'react';
import { Route } from 'react-router-dom';

import { AuthProvider } from './auth';

import Menu from './Menu';
import Signin from './Signin';
import Signup from './Signup';
import Maps from './Maps';

const Home = () => <h3>You're at home</h3>;

const App = () => {
    return (
        <AuthProvider>
            <Route exact path="/">
                <Menu />
                <Home />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/maps">
                <Maps />
            </Route>
        </AuthProvider>
    );
};

export default App;
