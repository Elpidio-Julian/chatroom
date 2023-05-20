import React, {useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { socket } from './socket';
import './style.css';



const App = () => {

    function connect() {
        socket.connect();
      }
    // functions for connecting/disconnecting from socket
    function disconnect() {
        socket.disconnect();
      }    

    const [isConnected, setIsConnected] = useState(socket.connected)
    // This useEffect has event listeners and changes the state
    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, []);
      console.log(isConnected)
  return (
    <React.Fragment>
        <header>Hello World</header>
        {!isConnected ? <button type="button" class="btn btn-success" onClick={() =>  connect()}>Connect</button>
: <button type="button" class="btn btn-danger" onClick={() =>  disconnect()}>Disconnect</button>
}
        <div class="container pt-3">
            <div class="row align-items-start">
            </div>
            <div class="row align-items-start">
            <div class="col-md-5"></div>
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