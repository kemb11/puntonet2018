import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './css/login.css';
import { PostApi } from '../servicios/PostApi';

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      usuario: '',
      password: ''
    };
    
  }
  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSubmit = e =>{
      e.preventDefault();
  }
  handleClick = e =>{
      if(this.state.usuario && this.state.password){
          console.log('handleClick');
          PostApi('/usuarios/login', {'nickname': this.state.usuario, 'pass': this.state.password}).then((result) => {
              let responseJson = result;
              console.log(result);
              if(result.auth === true){
                window.localStorage.setItem('token', result.token);
                this.setState({redirect: true});
              }
          });
      }
  }

  render() {
    if(this.state.redirect){
      return <Redirect to={'/partida'} />;
    }
    return (
     /*<div className="Login">
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
      </div>*/
      <div className="container centrado">
        <form onSubmit={this.handleSubmit}>
            <div>
                <input onChange={this.handleOnChange} type="text" placeholder="Email o nickname" name="usuario"/>
            </div>
            <div>
                <input onChange={this.handleOnChange} type="password" placeholder="Contrasena" name="password"/>
            </div>
            <button onClick={this.handleClick} name="button">Iniciar Sesión</button>
            <hr />
            <span className="info">¿Nuevo en Quien es Quien? </span>
            <Link className="info-registro"to='/sign-up'>Registrate</Link>
        </form>
      </div>
    );
  }
}

export default Login;
