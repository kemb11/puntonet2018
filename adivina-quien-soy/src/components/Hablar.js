import React, { Component } from 'react';
import RecordRTC from 'recordrtc';
import iconoHablar from '../img/microphone.png';

var recordVideo;
var mediaStream;
export class Hablar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recordVideo: null,
      src: null,
      uploadSuccess: null,
      uploading: false
    };

    this.captureUserMedia = this.captureUserMedia.bind(this);
    this.startRecord = this.startRecord.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.onAudioProcessStarted = this.onAudioProcessStarted.bind(this);
  }

  componentDidMount() {
    
    //this.captureUserMedia();
  }

  captureUserMedia(cb) {
    console.log("captureUserMedia...");
    var params = { audio: true, video: false };

    /*navigator.mediaDevices.getUserMedia(params, cb, (error) => {
      alert(JSON.stringify(error));
    });*/

    ///

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(cb).catch(function(error) {
        console.log(error);
    });

  };

  /*requestUserMedia() {
    console.log('requestUserMedia')
    this.captureUserMedia((stream) => {
      this.setState({ src: window.URL.createObjectURL(stream) });
      console.log('setting state', this.state)
    });
  }*/

  // se ejecuta cuando empieza a grabar, luego de que el usuario da el permiso para usar el micro
  onAudioProcessStarted(){
    console.log("onAudioProcessStarted...");

    setTimeout(() => {
      this.stopRecord();
    }, 4000);
  }

  startRecord() {
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

  stopRecord() {
    const { socket } = this.props;
    console.log("stopRecord...")
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
            if (mediaStream) mediaStream.getTracks()[0].stop();
        });
    });
  }

  render() {
    return (
      <div className="Hablar">
        
        <button id="btnPreguntar-hablar" onClick={this.startRecord} type="button" disabled={this.state.uploading}>
          <img src={iconoHablar} />
        </button>
      </div>
    );
  }
}

export default Hablar;