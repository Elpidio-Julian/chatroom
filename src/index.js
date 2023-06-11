import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { socket } from './socket';
import './style.css';

const SidePanel = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      setIsMobile(isMobile);
    };

    // Initial check on component mount
    handleResize();

    // Listen for resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // className="col-2 vw-25" "offcanvas offcanvas-start", "btn btn-primary" "btn btn-primary" "btn-close"
  return (
    <React.Fragment>
      <button className={isMobile ? "btn btn-primary" : "btn btn-primary d-none"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
        Open Contacts
      </button>

      <div className={isMobile ? "offcanvas offcanvas-start" : "col-2 vw-25"} tabIndex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">Contacts</h5>
          <button type="button" className={isMobile ? "btn-close" : "btn-close d-none"} data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

const ChatWindow = ({ messages, isConnected }) => {

  // message state for dynamically updating message to be sent in js
  const [message, setMessage] = useState('');

  // sending message function
  function sendMessage(message) {
    socket.emit('chat message', message);
    console.log(message);
    setMessage('');
  }

  return (
    <React.Fragment>
      <div className="col-8 vh-100">
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
        <form id="chatBox" className="row row-cols-md-auto align-items-center justify-content-between border border-dark m-1">
          <div className="col-md-8 col-8 align-items-center justify-content-center g-1 w-75 m-1">

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
          <div className="col-4 col-md-4 g-1 w-20 m-1">
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




const ChatPage = ({ isConnected, setIsConnected }) => {

  const [messages, setMessages] = useState([
    {
      message: 'Welcome to the Chatter',
      edited: false,
      author: 'System'
    }
  ]);

  // functions for connecting/disconnecting from socket
  function connect() {
    socket.connect();
  };
  function disconnect() {
    socket.disconnect();
  };

  // socket io chat message event receiver
  // socket.on('chat message', function(msg) {
  //   // currently updates state far too many times
  //   setMessages(messages => [...messages, {message: msg}])
  //   console.log(messages)
  // })

  useEffect(() => {
    // socket helper functions
    function onConnect() {
      setIsConnected(true);
    };

    function onDisconnect() {
      setIsConnected(false);
    };

    function onChatMessage(msg) {
      setMessages(messages => [...messages, { message: msg }])
    };

    // socket event handler
    socket.on('chat message', function (msg) {
      onChatMessage(msg)
    });
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <React.Fragment>
      {!isConnected ? <button type="button" className="btn btn-success" onClick={() => connect()}>Connect</button>
        : <button type="button" className="btn btn-danger" onClick={() => disconnect()}>Disconnect</button>
      }
      <div className="container pt-3 vh-100">
        <div className="row justify-content-center">
          <SidePanel />
          <ChatWindow messages={messages} isConnected={isConnected} />
        </div>
      </div>
    </React.Fragment>

  )
}
















const App = () => {

  // state for dynamically letting user know if they are connected and for button to keep track of connection
  // socket should not connect automatically so the state should start as false
  const [isConnected, setIsConnected] = useState(false);


  return (
    <React.Fragment>
      <header>Chatter</header>
      <Routes>
        <Route
          path='/chat'
          element={<ChatPage
            isConnected={isConnected}
            setIsConnected={setIsConnected}
          />}
        />
      </Routes>
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