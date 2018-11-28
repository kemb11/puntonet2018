import React, { Component } from 'react';
import './css/verperfil.css';
import Cabecera from './Cabecera';
import {PostApi} from '../servicios/PostApi';
import {GetApi} from '../servicios/GetApi';
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VerPerfil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
			user: null
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
		var informacion;
		if(this.state.user !== null){
			var total = this.state.user.ganadas + this.state.user.perdidas + this.state.user.abandonadas;
			var ganadasprc = this.state.user.ganadas * 100 / total;
			var perdidasprc = this.state.user.perdidas * 100 / total;
			var abandonadasprc = this.state.user.abandonadas * 100 / total;
			const options = {
			theme: "dark2",
			animationEnabled: true,
			backgroundColor: "transparent",
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
					dataPoints: [
						{ label: "Ganadas",  y: Math.round(ganadasprc)  },
						{ label: "Perdidas", y: Math.round(perdidasprc)  },
						{ label: "Abandonadas", y: Math.round(abandonadasprc) }
						
					]
				}
				]
			}
			informacion = (
				<div>
					<div>
						<h4>Nickname: {this.state.user.nickname}</h4>
					</div>
					
					<div>
						<h4>Correo: {this.state.user.email}</h4>
					</div>
					<CanvasJSChart options = {options}/>
				</div>
			)
		}
		return (
			<div className="VerPerfil">
				<Cabecera />	
				<div className="container">	
					<div classname="row">
						{informacion}
					</div>
				</div>
			</div>		
			);
	}
}

export default VerPerfil;