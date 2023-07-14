const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const app = express();
const port = 3001;

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const corsOptions = {
  origin: function (origin, callback) {
    const whitelist = ['https://linusfackler.github.io', 'http://localhost:3000'];
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.send();
  } else {
    next();
  }
});


// Enable JSON body parsing
app.use(express.json());

// Handle root GET request
app.get('/', (req, res) => {
  res.send('Welcome to the chatbot backend!');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  // Make a request to the OpenAI API
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: message },
    ],
  });

  const reply = response.data.choices[0].message.content;

  res.json({ reply });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${process.env.PORT || port}`);
});

