import React, { Component } from 'react';
import './css/verperfil.css';
import Cabecera from './Cabecera';
import {PostApi} from '../servicios/PostApi';

class VerPerfil extends Component {
	constructor(props) {
		super(props);
		this.state = {redirect: false};
	}
	
	render() {
		return (
			<div className="VerPerfil">
			<Cabecera />	
				<div className="container">
					<div className="col col-6 text-center">
						<center><h2>Ver Perfil del usuario</h2></center>
					</div>	
					
					<div classname="row">
						<div>
							<h4>Nickname: nick</h4>
						</div>
						
						<div>
							<h4>Email: correo@correo.com</h4>
						</div>
						
						<div>
							<h4>Cambiar contraseña</h4>
						</div>
						
						<div>
							<h4>Partidas jugadas: 10</h4>
						</div>
						
						<div>
							<h4>Partidas ganadas: 3</h4>
						</div>
						
						<div>
							<h4>Partidas perdidas: 7</h4>
						</div>
						
						<div>
							<h4>Porcentaje de ganadas: 30%</h4>
						</div>
						
						<div>
							 <a className="navbar-brand" href="/"><h3>Volver</h3></a>
						</div>
					</div>
				</div>
			</div>
		);
  }
}

export default VerPerfil;