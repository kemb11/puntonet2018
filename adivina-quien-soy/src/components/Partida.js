import React, { Component } from 'react';
import './css/partida.css';
import Cabecera from './Cabecera';
import ListaCaras from './ListaCaras';
import Pregunta from './Pregunta';
import {Redirect} from 'react-router-dom';
import socketIOClient from "socket.io-client";

//const socket = socketIOClient("http://127.0.0.1:3005");
var socket;

class Partida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganaste: false
    }

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.iniciarSocket();
  }

  iniciarSocket(){
    var token = window.localStorage.getItem('token');
    console.log("token -> "+token);
    var socketCli = socketIOClient('http://localhost:3005', {
      query: {token: token}
    });

    socket = socketCli;
  }

  componentDidMount(){
    var thisAux = this;
    socket.on("respuesta", function(data){
      if(data.ganaste){
        thisAux.setState({ganaste: true});
        window.localStorage.removeItem('enPartida');
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    if(window.localStorage.getItem('token') == null){
      return <Redirect to={'/login'} />;
    }

    if(this.state.ganaste){
      return (
        <div className="Partida">
          <Cabecera />
          <div className="container text-center">
            <h1>¡Ganaste!</h1>
          </div>
        </div>
      );
    }else{
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
}

export default Partida;