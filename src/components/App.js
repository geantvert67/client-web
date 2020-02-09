import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Map, TileLayer, Polygon } from 'react-leaflet';

import { AuthProvider } from '../utils/auth';

import Menu from './Menu';
import Signin from './authentification/Signin';
import Signup from './authentification/Signup';
import MapCreator from './map/MapCreator';
import Configuration from './configuration/Configuration';
import Games from './Games';
import Profil from './user/Profil';

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
                <Route exact path="/configuration">
                    <Configuration />
                </Route>
                <Route exact path="/games">
                    <Games />
                </Route>
                <Route exact path="/profil">
                    <Profil />
                </Route>
            </Switch>
        </AuthProvider>
    );
};

export default App;
