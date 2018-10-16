import React, { Component } from 'react';
import './css/listaCaras.css';
import Cabecera from './Cabecera';
import {GetApi} from '../servicios/GetApi';

class ListaCaras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personajes: [],
      cargados: false,
    }
  }



  render() {
    if(this.state.cargados == false){
      GetApi('personajes').then((result) => {
        const responseJson = result;
        let personajes = [];
        responseJson.map(personaje => {
          personajes.push(personaje);
        })
        const { socket } = this.props;
        socket.emit('eleccion_personaje', personajes);
        this.setState({personajes: personajes, cargados: true});
      });
    }

    var personajes = this.state.personajes.map(personaje => {
      return <div className="itemCara" ><img src={"http://localhost:3005/imagenes/"+personaje.imagen} /></div>;
    });

    return (
      <div className="ListaCaras row">
        <div id="contenedorCaras">
          {personajes}
        </div>
      </div>
    );
  }
}

export default ListaCaras;