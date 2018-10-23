import React, { Component } from 'react';
import './css/inicio.css';
import Cabecera from './Cabecera';
import {Redirect} from 'react-router-dom';

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {redirect: false, red_path: '/' };
  }

  jugar = () =>{
    this.setState({red_path: '/partida', redirect: true});
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.red_path} />;
    }

    return (
      <div className="Inicio">
        <Cabecera />
        <div className="container">
          <div className="row">
            <h1 className="textoInicio">¿Quién es Quién?</h1>
            <h3 className="textoInicio">Es un juego en el cual deberás adivinar el personaje del adversario mediante una serie de preguntas de tipo sí o no. 
            Cada personaje tiene un conjunto de características, como por ejemplo color de pelo, edad, sexo entre otras.
            Con cada pregunta iras filtrando los personajes, aumentando asi tus posibilidades de acierto.</h3>

            <button className="boton" onClick={this.jugar}>Jugar</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Inicio;