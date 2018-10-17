import React, { Component } from 'react';
import './css/partida.css';
import Cabecera from './Cabecera';
import ListaCaras from './ListaCaras';
import Pregunta from './Pregunta';
import {Redirect} from 'react-router-dom';
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://127.0.0.1:3005");


class Partida extends Component {
  constructor(props) {
    super(props);

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    if(window.localStorage.getItem('token') == null){
      return <Redirect to={'/login'} />;
    }
    return (
      <div className="Partida">
        <Cabecera />
        <div className="container">
          <ListaCaras socket={socket}/>
          <div className="row">
            <div className="col col-3"></div>

            <div className="col col-6 text-center">
              <Pregunta socket={socket} />
            </div>

            <div className="col col-3"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Partida;