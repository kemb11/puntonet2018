import React, { Component } from 'react';
import { ReactMic } from 'react-mic';
import iconoHablar from '../img/microphone.png';

export class Hablar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      iniciarEspera: false,
    }

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.onData = this.onData.bind(this);
  }

  startRecording = () => {
    console.log("Start recording...")
    this.setState({
      record: true,
      iniciarEspera: true
    });

  }

  stopRecording = () => {
    console.log("Stop recording...");
    this.setState({
      record: false
    });
  }

  onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);

    if(this.state.iniciarEspera){      
      setTimeout(() => {
        this.stopRecording();
      }, 4000);

      this.setState({
        iniciarEspera: false
      });
    }
  }

  onStop = (recordedBlob) =>  {
    console.log('recordedBlob is: ', recordedBlob);

    const { socket } = this.props;

     var blobToBase64 = function(blob, cb) {
      var reader = new FileReader();
      reader.onloadend = function() {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(',')[1];
        cb(base64);
      };
      reader.readAsDataURL(blob);
    };

    blobToBase64(recordedBlob.blob, function(base64){ // encode
      console.log(base64);
      socket.emit("pregunta_audio", base64);
    }); 
  }

  onStart = () =>  {
    console.log('OnStart...');
  }


  render() {
    return (
      <div className="Hablar">
        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStart={this.onStart}
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          backgroundColor="#FF4081" />

        <button id="btnPreguntar-hablar" onClick={this.startRecording} type="button" disabled={this.state.record}>
          <img src={iconoHablar} />
        </button>
      </div>
    );
  }
}

export default Hablar;