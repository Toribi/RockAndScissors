let socket = new WebSocket('ws://' + window.location.host + ':10000');

socket.onopen = function(event) {
    console.log('WebSocket connection opened.');
};

socket.onerror = function(error) {
    console.error('WebSocket Error: ', error);
};

socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    console.log('Message from server: ', data);
    document.getElementById('result').innerText = data.result;
};

function makeMove(move) {
    let message = {
        move: move
    };
    console.log('Sending move: ', message);
    socket.send(JSON.stringify(message));
}
