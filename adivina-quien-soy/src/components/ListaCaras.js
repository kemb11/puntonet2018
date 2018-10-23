import React, { Component } from 'react';
import './css/listaCaras.css';
//import Cabecera from './Cabecera';
import {GetApi} from '../servicios/GetApi';

class ListaCaras extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personajes: [],
      cargados: false,
    }
  }

  componentDidMount(){
    const {socket} = this.props;
    var thisAux = this;
    socket.on("a_ocultar", function(data){
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
    });
  }


  render() {
    if(this.state.cargados === false){
      GetApi('personajes').then((result) => {
        const responseJson = result;
        let personajes = [];
        responseJson.map(personaje => { 
          return(personajes.push(personaje));
        });
        const { socket } = this.props;
        socket.emit('eleccion_personaje', personajes);
        this.setState({personajes: personajes, cargados: true});
      });
    }

    var personajes = this.state.personajes.map((personaje,i) => {
      if(personaje.a_ocultar)
        return <div key={'cara'+i} className="itemCara itemDescartado" ><img alt={"Imagen de " + personaje.nombre + " " + personaje.apellido} src={"http://localhost:3005/imagenes/"+personaje.imagen} /></div>;
      else
        return <div key={'cara'+i} className="itemCara" ><img alt={"Imagen de " + personaje.nombre + " " + personaje.apellido} src={"http://localhost:3005/imagenes/"+personaje.imagen} /></div>;
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