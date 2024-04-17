document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('webcam');

    // Check if the browser supports the MediaDevices API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the webcam
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function(stream) {
                // If access is granted, set the video source to the webcam stream
                video.srcObject = stream;
            })
            .catch(function(error) {
                console.error('Error accessing webcam:', error);
            });
    } else {
        console.error('Your browser does not support the MediaDevices API');
    }
});
