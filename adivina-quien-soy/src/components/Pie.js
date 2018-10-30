import React, { Component } from 'react';
import './css/pie.css';
import {Redirect} from 'react-router-dom';
import {PostApi} from '../servicios/PostApi';

class Pie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrar: false
    }
  }

  componentDidMount(){
    // Comprobar si el token guardado en localstorage sigue vigente, y fijarse si esta en partida(es para cuando se baja el servidor)
      var token = window.localStorage.getItem('token'); 
      PostApi('usuarios/enPartida', token).then((respuesta) => {
        if(respuesta.enPartida){
          this.setState({mostrar: true});
        }
      });
  }

  redirigir = () =>{
    this.setState({redirect: true, path:'/partida'});
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={this.state.path} />;
    }

    if(this.state.mostrar){
      return (
        <div className="Pie">
          <button onClick={this.redirigir} className="boton enPartida">Partida en curso</button>
        </div>
      );
    }else{
      return (
        <div className="Pie"></div>
      );
    }
  }
}

export default Pie;