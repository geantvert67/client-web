import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../utils/auth';
import Menu from './Menu';
import Signin from './authentification/Signin';
import Signup from './authentification/Signup';
import PrivateRoute from './authentification/PrivateRoute';
import ConfigsWrapper from './configuration/ConfigsWrapper';
import Profil from './user/Profil';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfigForm from './configuration/ConfigForm';
import ConfigLoader from './configuration/ConfigLoader';
import Error from './Error';

toast.configure({
    hideProgressBar: true,
    pauseOnHover: false
});

const Home = () => <h3>You're at home</h3>;

const App = () => {
    return (
        <AuthProvider>
            <Menu />
            <Switch>
                <Route exact path="/" component={Home} />

                <Route exact path="/signin" component={Signin} />
                <Route exact path="/signup" component={Signup} />
                <PrivateRoute exact path="/profil" component={Profil} />

                <PrivateRoute
                    exact
                    path="/configs"
                    component={ConfigsWrapper}
                />
                <PrivateRoute
                    exact
                    path="/configs/create"
                    component={ConfigForm}
                />

                <PrivateRoute
                    path="/configs/:configurationId"
                    component={ConfigLoader}
                />

                <Route component={Error} />
            </Switch>
        </AuthProvider>
    );
};

export default App;
