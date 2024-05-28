import * as React from 'react';
import { useState } from 'react'
import './App.css'
import Join from './components/join/join'
import Chat from './components/chat/chat'

function App() {
  const [chatVisibility, setChatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)

  return (
    <div className="app">
      {
        chatVisibility ? <Chat socket={socket} /> : <Join setSocket={setSocket} setChatVisibility={setChatVisibility} />
      }
    </div>
  )
}

export default App
