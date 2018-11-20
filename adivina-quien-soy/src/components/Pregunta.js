import React, { Component } from 'react';
//import './css/pregunta.css';
import { PostApi } from '../servicios/PostApi';
import RecordRTC from 'recordrtc';
import './css/pregunta.css';
import iconoKeyboard from '../img/keyboard.png';
import iconoHablar from '../img/microphone.png';

const hasGetUserMedia = !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia);

var recordVideo;
var mediaStream;
class Pregunta extends Component {
  constructor(props){
    super(props);
    this.state={
      pregunta: '',
      recordVideo: null,
      recording: false,
      esperandoRespuesta: false,
      mostrarResp: false,
      respuesta: false, 
      noEntendio: false
    };
    
    this.captureUserMedia = this.captureUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onAudioProcessStarted = this.onAudioProcessStarted.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    const { socket } = this.props;

    var thisAux = this;

    socket.on("respuesta", function(data){
      console.log("Respuesta: "+JSON.stringify(data));
      
      thisAux.setState({ 
        esperandoRespuesta: false, 
        mostrarResp: true,
        respuesta: data.respuesta,
        noEntendio: data.noEntendio
      });

      setTimeout(() => {
        thisAux.setState({ 
          mostrarResp: false
        });
      }, 800);
    });
  }

  handleOnChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }
  
  handleClick = e =>{
      console.log("Enviar pregunta a API...");
      const { socket } = this.props;
      socket.emit("pregunta", this.state);
  }

  handleSubmit = e =>{
      e.preventDefault();

      // si no esta grabando o esperando respuesta
      if(!this.state.recording && !this.state.esperandoRespuesta){
        console.log("Enviar pregunta a API...");
        const { socket } = this.props;
        socket.emit("pregunta", this.state);
        this.setState({ esperandoRespuesta: true });
      }else{
        console.log("bloqueado, esta grabando...");
      }
  }

  captureUserMedia(cb) {
    console.log("captureUserMedia...");
    var params = { audio: true, video: false };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(cb).catch(function(error) {
        console.log(error);
    });

  };

  // se ejecuta cuando empieza a grabar, luego de que el usuario da el permiso para usar el micro
  onAudioProcessStarted(){
    console.log("onAudioProcessStarted...");
    this.setState({ recording: true });

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  startRecord() {
    if(!this.state.esperandoRespuesta){
      console.log("StartRecord...");
      this.captureUserMedia((stream) => {
        console.log("New RecordRTC...");
        mediaStream = stream;
        recordVideo = RecordRTC(stream, { 
              type: 'audio',
              recorderType: RecordRTC.StereoAudioRecorder,
              numberOfAudioChannels: 1,
              sampleRate: 44100  ,
              onAudioProcessStarted: this.onAudioProcessStarted
            });
        recordVideo.startRecording();
      });
    }
  }

  stopRecord() {
    const { socket } = this.props;
    console.log("stopRecord...");
    var thisAux = this;
    recordVideo.stopRecording(function() {
      console.log("stopRecording...");
        // get audio data-URL
        recordVideo.getDataURL(function(audioDataURL) {
            var files = {
                audio: {
                    type: recordVideo.getBlob().type || 'audio/wav',
                    dataURL: audioDataURL
                }
            };
            console.log(files);

            audioDataURL = audioDataURL.split(',')[1]; //quitarle la parte "data:audio/wav;base64,"
            socket.emit('pregunta_audio', audioDataURL);
            thisAux.setState({ recording: false });
            thisAux.setState({ esperandoRespuesta: true });
            
            if (mediaStream) mediaStream.getTracks()[0].stop();
        });
    });
  }

  render() {
    const { socket } = this.props;

    var clasesEsp;
    if(this.state.esperandoRespuesta){
      clasesEsp = 'mostrar loading';
    }else{
      clasesEsp = 'ocultar';
    }

    var resp = "";
    var clasesResp = 'transicion';
    if(this.state.mostrarResp){
      clasesResp += ' mostrar';
    }else{
      clasesResp += ' ocultar';
    }   

    // Si no entendio la pregunta, en this.state.respuesta guarda el texto pidiendo que pregunte de nuevo
    if(this.noEntendio){
      resp = this.state.respuesta
    }else{
      // SI no es true o false
      if(this.state.respuesta){
        clasesResp += ' respSI';
        resp = "Si";
      }else{
        clasesResp += ' respNO';
        resp = "No";
      }
    }

    return (
     <div className="pregunta">  
          <div className="row">
            <div id="preg_resp_div">
              <p id="pregunta_respuesta" className={clasesResp}>{resp}</p>
              <p className={clasesEsp}></p>
            </div>
          </div>  
          <form id="formPregunta" className="form-group text-center" onSubmit={this.handleSubmit}>  
            <input className="form-control" onChange={this.handleOnChange} type="text" placeholder="Haz una pregunta" name="pregunta" required/> 
            <button id="btnPreguntar-escribir" type="submit" form="formPregunta" disabled={this.state.recording}>
              <img src={iconoKeyboard} />
            </button> 

            <button id="btnPreguntar-hablar" onClick={this.startRecord} type="button" disabled={this.state.recording}>
              <img src={iconoHablar} />
            </button>
          </form>
      </div>
    );
  }
}

export default Pregunta;
