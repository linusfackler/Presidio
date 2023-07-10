import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/chat', { message: userMessage });

      // Add user message and chatbot reply to the chat history
      const newChatEntry = {
        userMessage,
        botMessage: response.data.reply,
      };

      setChatHistory((prevChatHistory) => [...prevChatHistory, newChatEntry]);
    } catch (error) {
      console.error(error);
    }

    setUserMessage('');
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container after chat history updates
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [chatHistory]);

  return (
    <div className="App">
      <h1>ChatGPT from wish.com</h1>
      <div ref={chatContainerRef} className="ChatContainer">
        {chatHistory.map((chatEntry, index) => (
          <div key={index} className="ChatEntry">
            <p>User: {chatEntry.userMessage}</p>
            <p>Bot: {chatEntry.botMessage}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message"
          value={userMessage}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
