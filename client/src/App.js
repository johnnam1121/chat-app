import "./App.css";
import { io } from "socket.io-client";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/pages/Login";
import Chat from "./components/pages/Chat";

const socket = io('http://localhost:3001')

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