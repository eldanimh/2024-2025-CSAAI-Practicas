var audioContext = new (window.AudioContext || window.webkitAudioContext)();
var sourceNode = null;
var distortionNode = audioContext.createWaveShaper();
var gainNode = audioContext.createGain();

distortionNode.curve = makeDistortionCurve(0); // Initial distortion level
distortionNode.oversample = '4x';

// Load audio file
document.getElementById('fileInput').addEventListener('change', function(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        var audioData = e.target.result;
        audioContext.decodeAudioData(audioData, function(buffer) {
            if (sourceNode) {
                sourceNode.stop();
                sourceNode.disconnect();
            }
            sourceNode = audioContext.createBufferSource();
            sourceNode.buffer = buffer;
            sourceNode.connect(distortionNode);
            distortionNode.connect(gainNode);
            gainNode.connect(audioContext.destination);
        });
    };

    reader.readAsArrayBuffer(file);
});

// Play audio
document.getElementById('playButton').addEventListener('click', function() {
    if (sourceNode) {
        sourceNode.start();
    }
});

// Stop audio
document.getElementById('stopButton').addEventListener('click', function() {
    if (sourceNode) {
        sourceNode.stop();
    }
});

// Change distortion level
document.getElementById('distortionSlider').addEventListener('input', function() {
    var distortionLevel = parseFloat(this.value);
    distortionNode.curve = makeDistortionCurve(distortionLevel);
    drawDistortionCurve();
});

// Function to create distortion curve
function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50;
    var numSamples = 44100;
    var curve = new Float32Array(numSamples);
    var deg = Math.PI / 180;
    var i = 0;
    var x;
    for (; i < numSamples; ++i) {
        x = i * 2 / numSamples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
}

// Function to draw distortion curve
function drawDistortionCurve() {
    var canvas = document.getElementById('distortionCurveCanvas');
    var ctx = canvas.getContext('2d');
    var curve = distortionNode.curve;
    var width = canvas.width;
    var height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.moveTo(0, height / 2);

    for (var i = 0; i < curve.length; i++) {
        var x = (i / curve.length) * width;
        var y = ((curve[i] + 1) / 2) * height;
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'red';
    ctx.stroke();
}

// Draw initial distortion curve
drawDistortionCurve();