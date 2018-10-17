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
											
						<div>
							<h4>Nickname</h4>
						</div>
						
						<div>
							<h4>Email</h4>
						</div>
						
						<div>
							<h4>Cambiar contraseña</h4>
						</div>
						
						<div>
							<h4>Partidas jugadas</h4>
						</div>
						
						<div>
							<h4>Partidas ganadas</h4>
						</div>
						
						<div>
							<h4>Partidas perdidas</h4>
						</div>
						
						<div>
							<h4>Porcentaje de ganadas</h4>
						</div>
			</div>
		</div>
		);
  }
}

export default VerPerfil;