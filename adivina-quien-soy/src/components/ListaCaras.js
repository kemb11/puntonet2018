import React, { Component } from 'react';
import './css/listaCaras.css';
import Cara from './Cara';
import {PostApi} from '../servicios/PostApi';

class ListaCaras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personajes: [],
      cargados: false,
    }

    this.cargarPersonajes();
  }

  cargarPersonajes(){
    if(this.state.cargados === false){
      
      /*const {socket} = this.props;
      socket.on("connect", function(data){
        console.log(socket.id);
      });*/

      var token = window.localStorage.getItem('token');
      console.log("cargar personajes...");

      PostApi('personajes/partida', token).then((result) => {
        const responseJson = result;
        console.log("respuesta: "+JSON.stringify(responseJson));

        this.setState({personajes: responseJson.personajes, filtrados: responseJson.user1.filtrados, cargados: true});
        
        // Ya estaba en partida, cargar personajes de localstorage
        /*if(responseJson.cantPreguntas){
          alert("Ya esta en partida...");
          var personajes = localStorage.getItem('listaPersonajes');
          this.setState({personajes: personajes, cargados: true});
        }else{
          let personajes = [];

          responseJson.map(personaje => { 
            return(personajes.push(personaje));
          });

          localStorage.setItem('listaPersonajes', this.state);
          this.setState({personajes: personajes, cargados: true});
        }*/
      });
    }
  }

  componentDidMount(){
    /*const {socket} = this.props;
    var thisAux = this;
    socket.on("a_ocultar", function(data){
      console.log("a_ocultar: "+data);
      
      if(Array.isArray(data)){
        const personajes = [...thisAux.state.personajes];
        for(var i=0; i<personajes.length;i++){
          for(var z=0; z<data.length; z++){
            if(personajes[i]._id === data[z]){
              personajes[i].a_ocultar = true;
            }
          }
        }
        console.log(personajes);
        thisAux.setState({personajes: personajes});
      }
      else{
        const personajes = [...thisAux.state.personajes];
        const personaje = personajes.find( p => p._id === data);
        personaje.a_ocultar = true;
        thisAux.setState({personajes: personajes});
      }

      // Actualizar lista de personajes en localstorage
      localStorage.setItem('listaPersonajes', this.state);
    });*/
  }


  render() {
    const {socket} = this.props;

    var filtrados = this.state.filtrados;
    //var filtrados = ["5bbe12ee00641916541d4f95"];
    console.log("filtrados: "+filtrados);
    var personajes = this.state.personajes.map((personaje,i) => {     
        var filtrado = false;
        if(filtrados.includes(personaje._id)){
          filtrado = true;
        } 
        return <Cara personaje={personaje} filtrado={filtrado} socket={socket} />;       
    });

    return (
      <div className="ListaCaras">
          {personajes}
      </div>
    );
  }
}

export default ListaCaras;