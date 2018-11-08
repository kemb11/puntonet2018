import React, { Component } from 'react';
import './css/modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  render(){
  	var clases = this.props.show ? "miModal showMiModal" : "miModal hideMiModal";

  	if(this.props.cargando){
  		return (
		    <div className={clases}>
		      <section className="miModal-main">
		      	<div className="loading-modal"></div>
		      </section>
		    </div>
	  	);
  	}else{
	  	return (
		    <div className={clases}>
		      <section className="miModal-main">
		      	<h3>{this.props.titulo}</h3>
		        <p>{this.props.texto}</p>
		        <button className="boton rojo" onClick={this.props.handleAceptar}>Aceptar</button>
		        <button className="boton normal" onClick={this.props.handleCancelar}>Cancelar</button>
		      </section>
		    </div>
	  	);
  	}
  }
}

export default Modal;
