import React, { Component } from 'react';
import './css/logueado.css';
import iconoUsr from '../img/user.png';
import {Redirect} from 'react-router-dom';
import {GetApi} from '../servicios/GetApi';

class Logueado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      path: "/",
      user: ''
    };
  }

  salir = () =>{
    window.localStorage.removeItem('token');
    this.setState({redirect: true, path:'/'});
  }
  
  perfil = () =>{
	  this.setState({redirect: true, path:'/verperfil'});
  }

  componentDidMount(){
		GetApi('usuarios/me',localStorage.getItem("token")).then((result) => {
			console.log(result);
			if(result!=null){
				this.setState({user: result.user.nickname});
			}
		});
	}
  
  render() {
    var token = window.localStorage.getItem('token');
    if(this.state.redirect || token === 'undefined' || token === null){
      return <Redirect to={this.state.path} />;
    }

    return (
      <div className="Logueado">
        <div className="nav navbar-nav navbar-right text-center dropdown">
          <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src={iconoUsr} alt="icono de usuario"/>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <h5 className="dropdown-item">{this.state.user}</h5>
            <button onClick={this.perfil} className="dropdown-item">Ver Perfil</button>
            <button onClick={this.salir} className="dropdown-item">Salir</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Logueado;