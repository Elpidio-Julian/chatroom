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
      author: 'System'
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
  // socket should not connect automatically so the state should start as false
  const [isConnected, setIsConnected] = useState(false)

  // This useEffect has event listeners and changes the state
  // Use this to send socket events without running them multiple times as state updates
  useEffect(() => {
    // socket helper functions
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onChatMessage(msg) {
      setMessages(messages => [...messages, {message: msg}])
    }
   
    // socket events
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
  console.log(messages)
  
  return (
    <React.Fragment>
      <header>Hello World</header>
      {!isConnected ? <button type="button" className="btn btn-success" onClick={() => connect()}>Connect</button>
        : <button type="button" className="btn btn-danger" onClick={() => disconnect()}>Disconnect</button>
      }
      <div className="container pt-3 align-items-center vh-100">
        <div className="row align-items-start justify-content-center overflow-auto h-75 border border-primary m-1">
          <ul id="chatWindow" className="list-group list-group-flush">
            {messages.map((msg, idx) => {

              return (
                <li className="list-group-item" key={idx}>
                  <p><span>{msg.author}: </span>{msg.message}{msg.edited ? <p>edited</p> : null}</p>
                </li>
              )
            })}
          </ul>
        </div>
          {/* message box below */}
          <form id="chatBox" className="row row-cols-md-auto align-items-center border border-dark m-1">
            <div className="col-md-7 col-7 align-items-center justify-content-center g-2 m-2">

              <input
                type='text'
                className='form-control w-100'
                placeholder="type message here"
                value={message}
                onChange={(ev) => {
                  setMessage(ev.target.value);
                }}
              />

            </div>
            <div className="col-3 col-md-3 g-2 m-3">
              {isConnected ? <button 
              type="submit" 
              className="btn btn-primary w-100"
              onClick={(ev) => {
                ev.preventDefault();
                sendMessage(message)
              }}
              >
                Send
              </button> : <button 
              type="submit" 
              className="btn btn-primary w-100"
              onClick={(ev) => {
                ev.preventDefault();
              }}
              disabled>
                Send
              </button>}
            </div>
          </form>
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