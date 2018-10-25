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
          window.localStorage.setItem('enPartida', true);
      });
    }
  }

  componentDidMount(){
    
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