import React, { Component } from 'react';
import './css/verperfil.css';
import Cabecera from './Cabecera';
import {PostApi} from '../servicios/PostApi';
import {GetApi} from '../servicios/GetApi';

class VerPerfil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			user: {nickname: "", email: ""}
		};
	}
	
	componentDidMount(){
		GetApi('usuarios/me',localStorage.getItem("token")).then((result) => {
			console.log(result);
			if(result!=null){
				this.setState({user: result.user});
			}
		});
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
							<h4>Nickname: {this.state.user.nickname}</h4>
						</div>
						
						<div>
							<h4>Correo: {this.state.user.email}</h4>
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
					</div>
				</div>
			</div>		
			);
	}
}

export default VerPerfil;