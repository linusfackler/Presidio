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
  // origin: 'https://linusfackler.github.io',
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus:200
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Origin', 'https://linusfackler.github.io');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
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

