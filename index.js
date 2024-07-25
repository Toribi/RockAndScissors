const express = require('express');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

const server = app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const wss = new WebSocket.Server({ server });

let players = [];

wss.on('connection', (ws) => {
  if (players.length < 2) {
    players.push(ws);

    if (players.length === 2) {
      startGame();
    }

    ws.on('message', (message) => {
      let data = JSON.parse(message);
      handleMove(ws, data.move);
    });

    ws.on('close', () => {
      players = players.filter(player => player !== ws);
    });
  } else {
    ws.send(JSON.stringify({ result: 'Game is full. Please try again later.' }));
    ws.close();
  }
});

let moves = {};

function startGame() {
  moves = {};
  players.forEach(player => {
    player.send(JSON.stringify({ result: 'Make your move!' }));
  });
}

function handleMove(player, move) {
  moves[player] = move;

  if (Object.keys(moves).length === 2) {
    let result = getResult(moves[players[0]], moves[players[1]]);
    players.forEach(player => {
      player.send(JSON.stringify({ result: result }));
    });
    startGame();
  }
}

function getResult(move1, move2) {
  if (move1 === move2) return 'It\'s a tie!';
  if ((move1 === 'rock' && move2 === 'scissors') ||
      (move1 === 'paper' && move2 === 'rock') ||
      (move1 === 'scissors' && move2 === 'paper')) {
    return 'Player 1 wins!';
  }
  return 'Player 2 wins!';
}
