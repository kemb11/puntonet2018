import React, { Component } from 'react';
import './css/partida.css';
import Cabecera from './Cabecera';
import ListaCaras from './ListaCaras';
import Pregunta from './Pregunta';
import {Redirect} from 'react-router-dom';
import socketIOClient from "socket.io-client";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { PostApi } from '../servicios/PostApi';

//const socket = socketIOClient("http://127.0.0.1:3005");
var socket;

class Partida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganaste: false,
      perdiste: false,
      mensaje: ""
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
        var token = window.localStorage.getItem('token'); 
        PostApi('usuarios/gano_partida',token).then((result) => {
          console.log(result);
        })
        thisAux.setState({ganaste: true});
      }

      if(data.perdiste){
        thisAux.setState({perdiste: true, mensaje: data.respuesta});
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

    if(this.state.ganaste || this.state.perdiste){
      var ganoPerdio;
      var clases = "container text-center";
      if(this.state.ganaste ){
        ganoPerdio = "¡Ganaste!";
        clases += " ganaste";
      }else{
        ganoPerdio = this.state.mensaje;
      }
      return (
          <div className="Partida">
            <Cabecera />
            <ReactCSSTransitionGroup
              transitionName="example"
              transitionAppear={true}
              transitionAppearTimeout={1000}
              transitionEnter={false}
              transitionLeave={false}>
              
                <div className={clases}>
                  <h1>{ganoPerdio}</h1>
                </div>
            </ReactCSSTransitionGroup>
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