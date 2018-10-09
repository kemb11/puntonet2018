import React, { Component } from 'react';
import './css/cabecera.css';
import Logueado from './Logueado';

class Cabecera extends Component {
  constructor(props) {
    super(props);
    //this.state = {value: ''};

    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
  }

  render() {
    return (
      <div className="Cabecera">
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#"><h3>¿Quién es Quién?</h3></a>
          </div>
          <Logueado />
        </div>
      </nav> 
      </div>
    );
  }
}

export default Cabecera;