import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Routes from './routes';
import {PostApi} from './servicios/PostApi';

class App extends Component {
  	constructor(props) {
	    super(props);
  	}

  	// componentDidMount es una funcion propia de react
  	componentDidMount() {
  		// Comprobar si el token guardado en localstorage sigue vigente
  		var token = window.localStorage.getItem('token'); 
	    PostApi('usuarios/tokenExpiro', token).then((respuesta) => {
	        if(respuesta.expiro){
        	 	window.localStorage.removeItem('token');        
	        }
      	});
 	}

  	render() {
	    return (
	        <div>
	          <Routes />
	        </div>
	    );
  	}
}

export default App;
