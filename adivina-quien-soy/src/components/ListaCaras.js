import React, { Component } from 'react';
import './css/listaCaras.css';
import Cara from './Cara';
import {PostApi} from '../servicios/PostApi';

class ListaCaras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personajes: false,
      cargados: false,
    }    
  }

  cargarPersonajes(){
    if(this.state.cargados === false){
      
      /*const {socket} = this.props;
      socket.on("connect", function(data){
        console.log(socket.id);
      });*/

      var token = window.localStorage.getItem('token');
      console.log("cargar personajes...");

      var thisAux = this;
      PostApi('personajes/partida', token).then((result) => {
        const partidaJson = result;
        console.log("respuesta: "+JSON.stringify(partidaJson));

        this.setState({personajes: partidaJson.personajes, filtrados: partidaJson.user1.filtrados, cargados: true});
          window.localStorage.setItem('enPartida', true);

        var cantP = partidaJson.user1.cantPreguntas;
        this.props.setCantPreg(cantP);
      });
    }
  }

  componentDidMount(){
    this.cargarPersonajes();
  }

  render() {
    const {socket} = this.props;

    var filtrados = this.state.filtrados;
    //var filtrados = ["5bbe12ee00641916541d4f95"];
    console.log("filtrados: "+filtrados);

    var personajes = [];
    if(this.state.personajes == false){
      //alert("personajes = false");
      var totalPersonajes = 20;
      for (var i = 0; i < totalPersonajes; i++) {
        personajes.push(<Cara key={"cara_"+i} personaje={false} filtrado={false} socket={socket} />);
      }
      console.log("personajes: "+personajes);
    }else{
      var personajes = this.state.personajes.map((personaje,i) => {     
          var filtrado = false;
          if(filtrados.includes(personaje._id)){
            filtrado = true;
          } 
          return <Cara key={"cara_"+personaje._id} personaje={personaje} filtrado={filtrado} socket={socket} />;       
      });
    }

    return (
      <div className="ListaCaras">
          {personajes}
      </div>
    );
  }
}

export default ListaCaras;