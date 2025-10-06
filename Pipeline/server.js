import express from 'express';
import fetch from 'node-fetch';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const PORT = 3000;
const WS_PORT = 3001;

const THINGSPEAK_CHANNEL_ID = '3090555';
const READ_API_KEY = 'DN48R69056SGLA1L';

const wss = new WebSocketServer({ port: WS_PORT });
wss.on('connection', (ws) => {
  console.log('✅ WebSocket client connected');
});


app.get('/api/motion', async (req, res) => {
  try {
    const url = `https://api.thingspeak.com/channels/${THINGSPEAK_CHANNEL_ID}/fields/1/last.json?api_key=${READ_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    
    if (data.field1 === '1') {
      console.log('Liike havaittu!');
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ motion: 1 }));
        }
      });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () =>
  console.log(` API running at http://localhost:${PORT}`)
);

