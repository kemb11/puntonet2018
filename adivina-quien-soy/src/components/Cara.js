import React, { Component } from 'react';
//import './css/cara.css';

class Cara extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idPersonaje: props.personaje._id,
      filtrado: props.filtrado,
    }
  }

  componentDidMount(){
    const {socket} = this.props;
    var thisAux = this;
    socket.on("respuesta", function(data){
      //console.log("a_ocultar: "+data.a_ocultar);

      // controlar por las dudas que llegue mal el data
      if(Array.isArray(data.a_ocultar)){
        //console.log("isArray...");
        //console.log("idP: "+thisAux.state.idPersonaje);
        if(data.a_ocultar.includes(thisAux.state.idPersonaje)){
          thisAux.setState({filtrado: true});
        }
      }
    });
  }

  render() {
      var clases = "Cara itemCara";
      if(this.state.filtrado){
        clases += " itemDescartado";
      }
    
    return (
      <div className={clases}>
        <img alt={"Imagen de " + this.props.personaje.nombre + " " + this.props.personaje.apellido} src={"http://localhost:3005/imagenes/"+this.props.personaje.imagen} />
      </div>
    );
  }
}

export default Cara;