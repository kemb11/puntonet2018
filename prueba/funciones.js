//var socketio = io();
var mediaStream = null;
/*socketio.on('connect', function() {
    startRecording.disabled = false;
});*/
var startRecording = document.getElementById('btnPreguntar-escribir');
var stopRecording = document.getElementById('btnPreguntar-hablar');
var recordAudio, recordVideo;
startRecording.onclick = function() {
    console.log("startRecording");

    navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(function(stream) {
        console.log("entra a stream...");
        mediaStream = stream;
        recordAudio = RecordRTC(stream, {
            type: 'audio',
            recorderType: StereoAudioRecorder,
            numberOfAudioChannels: 1 
        });
        recordAudio.startRecording();
        stopRecording.disabled = false;
    }).catch(function(error) {
        console.log(error);
    });
    
};
stopRecording.onclick = function() {
    console.log("stopRecording");
    startRecording.disabled = false;
    stopRecording.disabled = true;
    
    // if firefox or if you want to record only audio
    // stop audio recorder
    recordAudio.stopRecording(function() {
        // get audio data-URL
        recordAudio.getDataURL(function(audioDataURL) {
            var files = {
                audio: {
                    type: recordAudio.getBlob().type || 'audio/wav',
                    dataURL: audioDataURL
                }
            };
            console.log(files);
            //socketio.emit('message', files);
            if (mediaStream) mediaStream.getTracks()[0].stop();
        });
    });
};