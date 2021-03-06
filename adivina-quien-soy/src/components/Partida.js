import React, { Component } from 'react';
import './css/partida.css';
import Cabecera from './Cabecera';
import ListaCaras from './ListaCaras';
import Pregunta from './Pregunta';
import {Redirect} from 'react-router-dom';
import socketIOClient from "socket.io-client";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { PostApi } from '../servicios/PostApi';
import Modal from './Modal';
import iconoPersonaje from '../img/personaje.png';
import ImageLoader from "react-loading-image";

//const socket = socketIOClient("http://127.0.0.1:3005");
var socket;

class Partida extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ganaste: false,
      perdiste: false,
      mensaje: "",
      showModal: false,
      cargandoModal: false,
      cantPreg: "-",
      personaje: '',
      esperandoRespuesta: false,
      grabando: false
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
    var token = window.localStorage.getItem('token'); 

    var thisAux = this;
    socket.on("respuesta", function(data){
      if(data.ganaste){
        console.log("PostApi('usuarios/gano_partida");
        PostApi('usuarios/gano_partida',token).then((result) => {
          console.log(result);
        })
        thisAux.setState({ganaste: true, personaje: data.personaje});
      }

      if(data.perdiste){
        console.log("PostApi('usuarios/perdio_partida");        
        PostApi('usuarios/perdio_partida',token).then((result) => {
          console.log(result);
        })
        thisAux.setState({perdiste: true, mensaje: data.respuesta, personaje: data.personaje});
      }

      // si respondio si o no, sumar preguntas hechas
      if(data.noEntendio === false || data.noEntendio === undefined){        
        var cantPreg = thisAux.state.cantPreg+1;
        thisAux.setState({cantPreg: cantPreg});
      }
    });

    if(token){
      //this.cargarCantPreg(token);
    }
  }

  setCantPreg = cantPreg =>{
    this.setState({cantPreg: cantPreg});
  }

  setEsperandoRespuesta = estado =>{    
    this.setState({esperandoRespuesta: estado});
  }

  setGrabando = estado =>{    
    this.setState({grabando: estado});
  }

  handleSubmit(e){
    e.preventDefault();
  }

  showModal = () => {
    console.log("showModal");
    this.setState({ showModal: true });
    console.log("state.showModal: "+this.state.showModal);
  };

  hideModal = () => {
    console.log("hideModal");
    this.setState({ showModal: false });
    console.log("state.showModal: "+this.state.showModal);
  };

  abandonarPartida = (e) =>{
    //alert("Abandonando partida...");
    this.setState({ cargandoModal: true });

    var token = window.localStorage.getItem('token');
    PostApi('usuarios/abandonarPartida',token).then((result) => {
      if(result.ok){
        this.setState({showModal: false });
        this.setState({redirect: true, path:'/'}); // redirecciona a inicio
      }else{
        alert("Ha ocurrido un error");
      }
    })
  }

  render() {
    if(window.localStorage.getItem('token') == null){
      return <Redirect to={'/login'} />;
    }

    if(this.state.redirect){
      return <Redirect to={this.state.path} />;
    }

    var cantPreguntas = "Preguntas: "+this.state.cantPreg+"/5";


    if(this.state.ganaste || this.state.perdiste){
      var nomP = this.state.personaje.nombre; // poner primer letra en mayuscula
      var apeP = this.state.personaje.apellido; // poner primer letra en mayuscula

      var nomP = nomP.charAt(0).toUpperCase() + nomP.slice(1); // poner primer letra en mayuscula
      var apeP = apeP.charAt(0).toUpperCase() + apeP.slice(1); // poner primer letra en mayuscula

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
                <div className="cara_fin_partida">
                  <ImageLoader
                    src={"http://localhost:3005/imagenes/"+this.state.personaje.imagen}
                    loading={() => 
                      <div className={"cargando"}>
                        <img src={iconoPersonaje} />
                        <div className="loading-cara"></div>
                      </div>
                    }
                    error={() => <div>Error</div>}
                  />
                  <h3>{"Es "+nomP+" "+apeP}</h3>
                </div>
            </ReactCSSTransitionGroup>
          </div>
      );
    }else{
      return (
        <div className="Partida">
          <Cabecera />          

          <div className="container">
            <ListaCaras socket={socket} setCantPreg={this.setCantPreg}/>
            <div className="row">
              <div className="col col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 text-center">
                <h3 id="cantPreg">{cantPreguntas}</h3>
              </div>

              <div className="col  col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 text-center">
                <Pregunta 
                  socket={socket} 
                  setEsperandoRespuesta={this.setEsperandoRespuesta} 
                  esperandoRespuesta={this.state.esperandoRespuesta}
                  setGrabando={this.setGrabando} 
                  grabando={this.state.grabando}
                  actualizarCantPreg={this.state.actualizarCantPreg}
                />
              </div>

              <div id="divAbandonar" className="col col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12 text-center">
                <button id="btnAbandonar" className="boton rojo" disabled={this.state.recording} onClick={this.showModal}>
                  Abandonar
                </button> 
              </div>
            </div>
          </div>

          <Modal key="modal-abandonarPartida" 
            show={this.state.showModal} // cambiar a true para mostrar modal
            handleAceptar={this.abandonarPartida} // funcion a ejecutar al hacer click en el boton aceptar
            handleCancelar={this.hideModal} // funcion a ejecutar al hacer click en el boton cancelar
            cargando={this.state.cargandoModal} // si es true se muestra la rueda de "cargando"
            titulo="Abandonar partida"
            texto="¿Estás seguro?, si abandonas la partida se te restaran puntos" >
          </Modal>
        </div>
      );
    }
  }
}

export default Partida;