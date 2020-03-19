import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthProvider } from '../utils/auth';
import Menu from './Menu';
import Signin from './authentification/Signin';
import Signup from './authentification/Signup';
import MapCreator from './map/MapCreator';
import TeamConfig from './configuration/TeamConfig';
import CreateTeam from './configuration/CreateTeam';
import ItemsModelsCreator from './configuration/ItemsModelsCreator';
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
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/signin">
                    <Signin />
                </Route>
                <Route exact path="/signup">
                    <Signup />
                </Route>
                <Route path="/:idconfiguration/mapcreator">
                    <MapCreator />
                </Route>
                <Route exact path="/configs/create">
                    <ConfigForm />
                </Route>
                <Route exact path="/configs">
                    <ConfigsWrapper />
                </Route>
                <Route exact path="/configs/:configurationId/edit">
                    <ConfigFormWrapper />
                </Route>
                <Route exact path="/:configurationId/itemModelCreator">
                    <ItemsModelsCreator />
                </Route>
                <Route exact path="/:configurationId/teamconfig">
                    <TeamConfig />
                </Route>
                <Route exact path="/:configurationId/createteam">
                    <CreateTeam />
                </Route>
                <Route exact path="/profil">
                    <Profil />
                </Route>
            </Switch>
        </AuthProvider>
    );
};

export default App;
