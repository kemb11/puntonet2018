import React, { Component } from 'react';
import './css/logueado.css';
import iconoUsr from '../img/user.png'

class Logueado extends Component {
  constructor(props) {
    super(props);
    //this.state = {value: ''};
  }

  render() {
    return (
      <div className="Logueado">
        <div className="nav navbar-nav navbar-right text-center dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={iconoUsr} />
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h5 className="dropdown-item">nickname</h5>
            <a className="dropdown-item" href="#">Ver Perfil</a>
            <a className="dropdown-item" href="#">Salir</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Logueado;