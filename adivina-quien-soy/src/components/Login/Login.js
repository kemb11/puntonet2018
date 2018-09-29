import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      pass:'',
      redirect: false,
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login(){
    if(this.state.email && this.state.pass){
      if(this.state.email == 'nico' && this.state.pass == '123'){//PETICION API
        // sessionStorage.setItem('userData', data);
        this.setState({redirect: true});
      }
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={'/home'} />;
    }
    return (
      <div className= "container">
        <h1 id="titulo">Iniciar Sesión</h1>
        <div className="input">
          <input type="text" name="email" placeholder="Email" onChange={this.onChange} required />
        </div>
        <div className="input">
          <input type="text" name="pass" placeholder="Contrasena" onChange={this.onChange} required />
        </div>
        <button type="submit" name="button" onClick={this.login}>Registrarse</button>
      </div>
    );
  }
}

export default Login;
