// Declara e inicializa a variável socket
let socket;

// Função para configurar a conexão WebSocket
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
}

// Função para enviar a jogada
function makeMove(move) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket is not open.');
        return;
    }

    let message = {
        move: move
    };
    console.log('Sending move: ', message);
    socket.send(JSON.stringify(message));
}

// Configura a conexão WebSocket ao carregar a página
window.onload = function() {
    setupWebSocket();
};
