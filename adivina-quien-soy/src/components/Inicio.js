import React, { Component } from 'react';
import './css/inicio.css';
import Cabecera from './Cabecera';
import Pie from './Pie';
import {Redirect} from 'react-router-dom';
import {GetApi} from '../servicios/GetApi';

class Inicio extends Component {
  constructor(props) {
    super(props);

    this.state = {redirect: false, red_path: '/', ranking_cargado: false, ranking: []};
  }

  jugar = () =>{
    this.setState({red_path: '/partida', redirect: true});
  }

  componentDidMount(){
    if(!this.state.ranking_cargado){
      GetApi('usuarios/ranking','').then((result) => {
        this.setState({ranking_cargado: true,ranking: result.ranking_usuarios});
      });
    }
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
          <div className="ranking">
            <table class="table table-hover table-dark">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {!this.state.ranking_cargado ? "..." : null}
                {this.state.ranking.map((usuario,index) => {
                  return usuario = 
                        <tr>
                          <th scope="row">{index+1}</th>
                          <td>{usuario.nickname}</td>
                          <td>{usuario.score}</td>
                        </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pie />
      </div>
    );
  }
}

export default Inicio;