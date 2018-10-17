import React, { Component } from 'react';
import './css/logueado.css';
import iconoUsr from '../img/user.png';
import {Redirect} from 'react-router-dom';

class Logueado extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }

  salir = () =>{
    window.localStorage.removeItem('token');
    this.setState({redirect: true});
  }
  
  perfil = () =>{
	  this.setState({redirect: true,path:'/verperfil'});
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.path} />;
    }
    return (
      <div className="Logueado">
        <div className="nav navbar-nav navbar-right text-center dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={iconoUsr} alt="icono de usuario"/>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h5 className="dropdown-item">nickname</h5>
            <button onClick={this.perfil} className="dropdown-item">Ver Perfil</button>
            <button onClick={this.salir} className="dropdown-item">Salir</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Logueado;