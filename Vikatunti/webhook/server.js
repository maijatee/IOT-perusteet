import express from 'express';
import fetch from 'node-fetch'; // jos käytät Node < 18, asenna: npm install node-fetch

const app = express();
const PORT = 3000;

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1422173095879507969/vQQ_ksXiJe_mSFKglShgpuzaATHC7zKMErb2a8P5h2xIr5-OQ9oLkvYLgMrcHVGzDGtH';

app.use(express.json());

app.post('/notify', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Message is required');
  }

  fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: message })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to send message to Discord');
      }
      return res.json({ status: 'Message sent!' });
    })
    .catch((error) => {
      console.error('Error sending to Discord', error);
      res.status(500).send('Internal Server Error');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
