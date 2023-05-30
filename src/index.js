import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { socket } from './socket';
import './style.css';



const App = () => {
  // message state for holding messages from server
  const [messages, setMessages] = useState([
    {
      message: 'Welcome to the Chatter',
      edited: false,
      author: 'system'
    }
  ]);
  // message state for dynamically updating message to be sent in js
  const [message, setMessage] = useState('');
  // functions for connecting/disconnecting from socket
  function connect() {
    socket.connect();
  }
  function disconnect() {
    socket.disconnect();
  }

  // sending message function
  function sendMessage(message) {
    socket.emit('chat message', message);
    console.log(message)
    setMessage('');
  }

  // socket io chat message event receiver
  // socket.on('chat message', function(msg) {
  //   // currently updates state far too many times
  //   setMessages(messages => [...messages, {message: msg}])
  //   console.log(messages)
  // })

  // state for dynamically letting user know if they are connected and for button to keep track of connection
  const [isConnected, setIsConnected] = useState(socket.connected)
  // This useEffect has event listeners and changes the state
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatMessage(msg) {
      setMessages(messages => [...messages, {message: msg}])
      console.log(messages)
    }
   
    socket.on('chat message', function(msg) {
      onChatMessage(msg)
    })
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return (
    <React.Fragment>
      <header>Hello World</header>
      {!isConnected ? <button type="button" className="btn btn-success" onClick={() => connect()}>Connect</button>
        : <button type="button" className="btn btn-danger" onClick={() => disconnect()}>Disconnect</button>
      }
      <div className="container pt-3">
        <div className="row align-items-start">
          <ul id="chatWindow">
            {messages.map((msg, idx) => {

              return (
                <li key={idx}>
                  <p><span>{msg.author}: </span>{msg.message}{msg.edited ? <p>edited</p> : null}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="row align-items-start">
          <form id="chatBox">
            <div className="col-md-5">

              <input
                type='text'
                placeholder="type message here"
                value={message}
                onChange={(ev) => {
                  setMessage(ev.target.value);
                }}
              />

            </div>
            <div className="col-md-2">
              <button 
              type="submit" 
              className="btn btn-primary"
              onClick={(ev) => {
                ev.preventDefault();
                sendMessage(message)
              }}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)