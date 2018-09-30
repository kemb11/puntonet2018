import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Partida from './components/Partida/Partida';

const Routes = () => (
  <BrowserRouter >
      <Switch>
        <Route exact path="/login" component={Login}/>
        <Route path="/home" component={Home}/>
        <Route exact path="/partida" component={Partida}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
