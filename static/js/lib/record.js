var RECORDING_ONGOING = false;
var recordingToggleBtns = document.querySelectorAll(".recording-toggle"); // The button

recordingToggleBtns.forEach(recordingToggleElement=>{

    recordingToggleElement.addEventListener("click", function(){
        if(!navigator.mediaDevices.getDisplayMedia){
            fireAlert("error","this service will not work on this device ")
            return
        }
        RECORDING_ONGOING = !RECORDING_ONGOING; // Start / Stop recording
        if(RECORDING_ONGOING){
            
            startRecording(recordingToggleElement); // Start the recording
        } else {
           
            stopRecording(recordingToggleElement); // Stop screen recording
        }
    });
})

var blob, deviceRecorder ;
var chunks = [];

async function startRecording(element){
    element.querySelector(".fa-video").classList.remove("play")
    element.querySelector(".fa-video").classList.add("stop")

    navigator.mediaDevices.getDisplayMedia(
      {
        video: {mediaSource: "screen"},
        audio: true
        }
    ).then((stream)=>{
        deviceRecorder = new MediaRecorder(stream, {mimeType: "video/webm"});
        deviceRecorder.ondataavailable = (e) => {
            if(e.data.size > 0){
                 chunks.push(e.data);
            }
        }
        deviceRecorder.onstop = () => {
            window.focus()
            RECORDING_ONGOING = !RECORDING_ONGOING; 
            element.querySelector(".fa-video").classList.remove("stop")
            element.querySelector(".fa-video").classList.add("playy")
            var filename = window.prompt("File name",  getTimeFormatting().time); // Ask the file name
            if(filename == null){
                deviceRecorder.stop();
                stream.getTracks().forEach(track => {
                    track.stop()
                    track.enabled = false
                  })  
                chunks = []
                return
            }

            deviceRecorder.stop(); // Stopping the recording
            blob = new Blob(chunks, {type: "video/webm"})
            chunks = [] // Resetting the data chunks
            var dataDownloadUrl = URL.createObjectURL(blob);
        
            // Downloadin it onto the user's device
            let a = document.createElement('a')
            a.href = dataDownloadUrl;
            a.download = `${filename}.webm`
            a.click()
            
            URL.revokeObjectURL(dataDownloadUrl)

            stream.getTracks().forEach(track => {
                track.stop()
                track.enabled = false
              })  
            
        }

        deviceRecorder.start(250)

    })
    .catch(function(err) {
        console.log('Permession not granted');
        RECORDING_ONGOING = !RECORDING_ONGOING; 
        element.querySelector(".fa-video").classList.add("play")
        element.querySelector(".fa-video").classList.remove("stop")
      
      });



}

function stopRecording(element){
    RECORDING_ONGOING = !RECORDING_ONGOING; 
    element.querySelector(".fa-video").classList.remove("stop")
    element.querySelector(".fa-video").classList.add("play")
    deviceRecorder.stop(); // Stopping the recording

}
