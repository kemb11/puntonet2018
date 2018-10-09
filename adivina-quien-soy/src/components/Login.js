import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './css/login.css';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false,
    };
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var email = e.target.email.value;
    var pass = e.target.password.value;

    //ACA HACER PETICION A NODE PARA VALIDAR LOGIN
    if(email === 'prueba@gmail.com' && pass === '123'){
      this.setState({redirect: true});
    }else{
      alert("login incorrecto");
    }
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={'/partida'} />;
    }
    return (
      <div className="Login">
        <header className="Login-header text-center">
          <h1 className="Login-title">Iniciar sesión</h1>
        </header>
        <div className="row">
          <div className="col col-3">
          </div>

          <div className="col col-6">
            <form className="form-group" onSubmit={this.handleSubmit}>
              <input className="form-control" type="email" name="email" placeholder="Email" required />   
              <input className="form-control" type="password" name="password" placeholder="Contraseña" required />
              <input type="submit" name="btnSubmit" value="Iniciar" className="btn btn-default" />    
            </form>
          </div>

          <div className="col col-3">
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
