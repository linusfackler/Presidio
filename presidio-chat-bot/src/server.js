const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const app = express();
const port = 3001;

// Set up your OpenAI API credentials
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${process.env.PORT || 3001}`);
});

