import React, { Component } from 'react';
import { PostApi } from '../servicios/PostApi';
import './css/registro.css';
import {Redirect, Link} from 'react-router-dom';

class Registro extends Component {
    constructor(props){
        super(props);
        this.state = {
            nickname: '',
            email: '',
            password: '',
            redirect: false
        };
    }
    handleOnChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }
    handleSubmit = e =>{
        e.preventDefault();
    }
    handleClick = e =>{
        if(this.state.nickname && this.state.email && this.state.password){
            console.log(this.state);
            PostApi('usuarios/registrar', null, this.state).then((result) => {
                let responseJson = result;
                if(responseJson.auth === true){
                    window.localStorage.setItem('token', responseJson.token);
                    this.setState({redirect: true});
                }
            });
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to={'/'} />;
        }
        return (  
            <div className="container centrado">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input onChange={this.handleOnChange} type="text" placeholder="Nickname" name="nickname"/>
                    </div>
                    <div>
                        <input onChange={this.handleOnChange} type="email" placeholder="Email" name="email"/>
                    </div>
                    <div>
                        <input onChange={this.handleOnChange} type="password" placeholder="Contrasena" name="password"/>
                    </div>
                    <button onClick={this.handleClick} name="button">Registrarse</button>
                    <hr />
                    <span className="info">¿Ya tienes una cuenta? </span>
                    <Link className="info-login"to='/login'>Inicia Sesion</Link>
                </form>
            </div>
        );
    }
}
 
export default Registro;