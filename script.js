let socket = new WebSocket('ws://' + window.location.host);

socket.onopen = function(event) {
    console.log('Connected to the server');
};

socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    document.getElementById('result').innerText = data.result;
};

function makeMove(move) {
    let message = {
        move: move
    };
    socket.send(JSON.stringify(message));
}
