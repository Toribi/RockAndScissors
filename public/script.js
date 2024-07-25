let socket;

function setupWebSocket() {
    socket = new WebSocket('ws://' + window.location.host + ':10000');

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

    socket.onclose = function(event) {
        console.log('WebSocket connection closed.');
    };
}

function makeMove(move) {
    if (!socket) {
        console.error('WebSocket is not initialized.');
        return;
    }

    if (socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket is not open. ReadyState: ' + socket.readyState);
        return;
    }

    let message = {
        move: move
    };
    console.log('Sending move: ', message);
    socket.send(JSON.stringify(message));
}

window.onload = function() {
    setupWebSocket();
};
