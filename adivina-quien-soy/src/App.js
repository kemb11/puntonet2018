import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

import Routes from './routes';

class App extends Component {
  	constructor(props) {
	    super(props);
	    this.state = {
	      endpoint: "http://127.0.0.1:3005"
	    };
  	}

  	// componentDidMount es una funcion propia de react
  	/*componentDidMount() {
	    const { endpoint } = this.state;
	    const socket = socketIOClient(endpoint);
	    socket.on("respuesta", function(data){
	    	console.log("Respuesta: "+data);
    	});
 	}*/

  	render() {
	    return (
	        <div>
	          <Routes />
	        </div>
	    );
  	}
}

export default App;
