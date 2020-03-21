import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../utils/auth';
import Menu from './Menu';
import Signin from './authentification/Signin';
import Signup from './authentification/Signup';
import PrivateRoute from './authentification/PrivateRoute';
import MapCreator from './map/MapCreator';
import TeamConfig from './teams/TeamConfig';
import CreateTeam from './teams/CreateTeam';
import ItemsModelsCreator from './items/ItemsModelsCreator';
import ConfigsWrapper from './configuration/ConfigsWrapper';
import Profil from './user/Profil';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConfigForm from './configuration/ConfigForm';
import ConfigFormWrapper from './configuration/ConfigFormWrapper';

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
                    exact
                    path="/configs/:configurationId/edit"
                    component={ConfigFormWrapper}
                />
                <PrivateRoute
                    exact
                    path="/configs/:configurationId/items"
                    component={ItemsModelsCreator}
                />
                <PrivateRoute
                    exact
                    path="/configs/:configurationId/teams"
                    component={TeamConfig}
                />
                <PrivateRoute
                    exact
                    path="/:configurationId/createteam"
                    component={CreateTeam}
                />
                <PrivateRoute
                    path="/configs/:configurationId/map"
                    component={MapCreator}
                />
            </Switch>
        </AuthProvider>
    );
};

export default App;
