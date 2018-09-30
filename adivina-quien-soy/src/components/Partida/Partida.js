import React, { Component } from 'react';
//import './Login.css';

class Partida extends Component {
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
      <div className="Partida">
        <header className="Login-header text-center">
          <h1 className="Login-title">¿Quién es Quién?</h1>
        </header>
        <div className="row">
          <div className="col col-3">
          </div>

          <div className="col col-6 text-center">
            <h2>Adivina el personaje del contrario</h2>
          </div>

          <div className="col col-3">
          </div>
        </div>
      </div>
    );
  }
}

export default Partida;