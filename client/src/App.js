import { useState } from "react";
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import { io } from "socket.io-client";
import "./App.css";
import Chat from "./components/pages/ChatPage";
import Login from "./components/pages/LoginPage";

const socket = io('https://chat-app-production-5c4c.up.railway.app/')

export default function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />} />
        <Route path='/chat' element={<Chat socket={socket} name={name} setName={setName} room={room} setRoom={setRoom} />} />
      </Routes>
    </Router>
  );
}