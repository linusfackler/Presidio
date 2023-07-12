import React, { createContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactSwitch from "react-switch"
import {MdNightlightRound} from 'react-icons/md'
import {BsSunFill} from 'react-icons/bs'
import './App.css'

export const ThemeContext = createContext(null);

function App() {
  const[theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const [userMessage, setUserMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const chatContainerRef = useRef(null);

  const handleMessageChange = (event) => {
    setUserMessage(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (userMessage.trim() === "") {
      alert("Can't leave the textfield blank.")
      return
    }

    try {
      // const response = await axios.post('/chat', { message: userMessage });
      const response = await axios.post('https://presidio.azurewebsites.net/chat', { message: userMessage }, { withCredentials: true });


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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>

      <div id={theme} className={theme}>
        <h1>WishGPT</h1>
        <h2>ChatGPT, but from wish.com</h2>

        <ReactSwitch className="switch"
            onChange={toggleTheme}
            checked={theme === "dark"}
            onColor="#000e40"
            offColor="#ffd000"
            checkedIcon={<MdNightlightRound className='switch__icon-night' />}
            uncheckedIcon={<BsSunFill className='switch__icon-day' />}
          />

        <div ref={chatContainerRef} className="ChatContainer">
          <p>Welcome to WishGPT! Ask me anything!</p>
          {chatHistory.map((chatEntry, index) => (
            <div key={index} className="ChatEntry">
              <div className="UserEntry">
                <p className="UserLabel">User:&nbsp;</p>
                <p className="UserMessage">{chatEntry.userMessage}</p>
              </div>
              <div className="BotEntry">
                <p className="BotLabel">Bot:&nbsp;</p>
                <p className="BotMessage">{chatEntry.botMessage}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message"
            value={userMessage}
            onChange={handleMessageChange}
            className='textfield'
          />
          <button type="submit" className='btn'>Send</button>
        </form>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;