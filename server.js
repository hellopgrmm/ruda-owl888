const express = require('express');
const { createServer } = require('http');
const WebSocket = require('ws');

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 10000;
const wss=new WebSocket.Server({ server, path: '/ws' });

wss.on('connection', ws => {
  console.log('客户端连接');
  ws.on('message', msg => {
    console.log(msg.toString());
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg.toString());
      }
    });
  });
});

server.listen(PORT, () => {
  console.log('端口', PORT);
});
