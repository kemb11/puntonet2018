import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Inicio from './components/Inicio';
import Login from './components/Login';
import Partida from './components/Partida';
import Registro from './components/Registro';
import VerPerfil from './components/VerPerfil';

const Routes = () => (
  <BrowserRouter >
      <Switch>
      <Route exact path="/" component={Inicio}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/partida" component={Partida}/>
        <Route path="/sign-up" component={Registro}/>
		<Route path="/verperfil" component={VerPerfil}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
