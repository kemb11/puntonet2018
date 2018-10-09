import React, { Component } from 'react';
//import './Login.css';
import Cabecera from './Cabecera';
import ListaCaras from './ListaCaras';

class Partida extends Component {
  constructor(props) {
    super(props);
    //this.state = {value: ''};

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    return (
      <div className="Partida">
        <Cabecera />
        <div className="container">
          <div className="row">
            <div className="col col-3">
            </div>

            <div className="col col-6 text-center">
              <h2>Adivina el personaje del contrario</h2>
            </div>

            <div className="col col-3">
            </div>
          </div>
          <ListaCaras />
        </div>
      </div>
    );
  }
}

export default Partida;