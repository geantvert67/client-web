import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Map, TileLayer, Polygon } from 'react-leaflet';

import { AuthProvider } from './auth';

import Menu from './Menu';
import Signin from './Signin';
import Signup from './Signup';
import MapCreator from './MapCreator';
import Configuration from './Configuration';
import Games from './Games';

const Home = () => <h3>You're at home</h3>;

const App = () => {
    return (
        <AuthProvider>
            <Menu />
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signin">
                <Signin />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/mapcreator">
                <MapCreator />
            </Route>
            <Route path="/configuration">
                <Configuration />
            </Route>
            <Route path="/games">
                <Games />
            </Route>
        </AuthProvider>
    );
};

export default App;
