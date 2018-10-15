import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import './css/pregunta.css';
import { PostApi } from '../servicios/PostApi';
import RecordRTC from 'recordrtc';
import Hablar from './Hablar';
import './css/pregunta.css';
import iconoKeyboard from '../img/keyboard.png';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia);

class Pregunta extends Component {
  constructor(props){
    super(props);
    this.state={
      redirect: false,
      pregunta: '',
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false
    };
    
    /*this.requestUserMedia = this.requestUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);*/
  }

  componentDidMount() {
    const { socket } = this.props;
    socket.on("respuesta", function(data){
      alert("Respuesta: "+data);
    });

    /*if(!hasGetUserMedia) {
      alert("Your browser cannot stream from your webcam. Please switch to Chrome or Firefox.");
      return;
    }
    this.requestUserMedia();*/
  }

  /*requestUserMedia() {
      console.log('requestUserMedia')
      this.captureUserMedia((stream) => {
        this.setState({ src: window.URL.createObjectURL(stream) });
        console.log('setting state', this.state)
      });
  }

  captureUserMedia(callback) {

    var params = { audio: true};

    navigator.mediaDevices.getUserMedia(params, callback, (error) => {
      alert(JSON.stringify(error));
    });
  };

  startRecord() {
    console.log("Start record...");
    this.captureUserMedia((stream) => {
      this.state.recordVideo = RecordRTC(stream, { type: 'audio' });
      this.state.recordVideo.startRecording();
    });

    
      setTimeout(() => {
        this.stopRecord();
      }, 4000);
   
  }

  stopRecord() {
    //setTimeout(() => {
      
    console.log("Stop record...");
    this.state.recordVideo.stopRecording(() => {
      this.state.recordVideo.getDataURL(function(dataURI) {
        console.log(dataURI);
      });

      this.setState({ uploading: true });      
    });

    //}, 4000);
  }*/

  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleClick = e =>{
      console.log("Enviar pregunta a API...");
      const { socket } = this.props;
      socket.emit("pregunta", this.state);
      /*if(this.state.pregunta){
          PostApi('/dialogflow/pregunta', this.state).then((result) => {
              let responseJson = result;
          });
      }*/
  }

  handleSubmit = e =>{
      e.preventDefault();
      console.log("Enviar pregunta a API...");
      const { socket } = this.props;
      socket.emit("pregunta", this.state);
  }

  render() {
    const { socket } = this.props;

    return (
     <div className="Login">    
          <form id="formPregunta" className="form-group text-center" onSubmit={this.handleSubmit}>  
            <input className="form-control" onChange={this.handleOnChange} type="text" placeholder="Haz una pregunta" name="pregunta" required/> 
            <button id="btnPreguntar-escribir" type="submit" form="formPregunta">
              <img src={iconoKeyboard} />
            </button> 

            <Hablar socket={socket} /> 
          </form>
      </div>
    );
  }
}

export default Pregunta;
